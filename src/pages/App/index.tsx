"use client"

import { useState, useEffect } from "react"
import { ArrowUpDown, Edit2, RefreshCw, Settings, Wallet, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import * as SimpleIcons from 'simple-icons'
import Navigation from "../../components/Navigation"

import { useWallet } from '../../context/WalletContext'

const networks = {
 
  ethereum: {
    name: 'Ethereum',
    icon: SimpleIcons.siEthereum,
    color: '#627EEA',
    bgColor: 'from-blue-500',
  },
 
  ton: {
    name: 'TON',
    icon: SimpleIcons.siTon,
    color: '#0098EA',
    bgColor: 'from-blue-400',
  },
} as const

const tokens = {
  usdt: {
    name: 'USDT',
    icon: SimpleIcons.siTether,
    color: '#26A17B',
    bgColor: 'from-emerald-500',
  },
  eth: {
    name: 'ETH',
    icon: SimpleIcons.siEthereum,
    color: '#627EEA',
    bgColor: 'from-blue-500',
  },
} as const

type NetworkType = keyof typeof networks
type TokenType = keyof typeof tokens

export default function AppPage() {
  const { isConnected, walletType, evmAddress, tonAddress, tonAddressFormatted, evmBalance, tonBalance } = useWallet()
  
  const [enableRefuel, setEnableRefuel] = useState(false)
  const [bridgeAndTransfer, setBridgeAndTransfer] = useState(false)
  const [sourceNetwork, setSourceNetwork] = useState<NetworkType>('ton')
  const [targetNetwork, setTargetNetwork] = useState<NetworkType>('ethereum')
  const [sourceToken, setSourceToken] = useState<TokenType>('usdt')
  const [targetToken, setTargetToken] = useState<TokenType>('usdt')
  const [isEditingRecipient, setIsEditingRecipient] = useState(false)
  const [recipientAddress, setRecipientAddress] = useState('')

  useEffect(() => {
    if (isConnected) {
      if (walletType === 'evm') {
        setSourceNetwork('ethereum');
      } else if (walletType === 'ton') {
        setSourceNetwork('ton');
      }
    }
  }, [isConnected, walletType]);

  const getDefaultRecipientAddress = () => {
    if (!isConnected) return '';
    if (walletType === 'evm' && evmAddress) {
      return evmAddress;
    }
    if (walletType === 'ton' && tonAddressFormatted) {
      return tonAddressFormatted;
    }
    return '';
  };

  useEffect(() => {
    if (isConnected && !isEditingRecipient) {
      const defaultAddress = getDefaultRecipientAddress();
      setRecipientAddress(defaultAddress);
    }
  }, [isConnected, walletType, evmAddress, tonAddressFormatted, isEditingRecipient]);

  const NetworkIcon = ({ network, size = "md" }: { network: keyof typeof networks, size?: "sm" | "md" | "lg" }) => {
    const sizes = {
      sm: "w-4 h-4",
      md: "w-8 h-8",
      lg: "w-16 h-16"
    }
    
    return (
      <div
        dangerouslySetInnerHTML={{ 
          __html: networks[network].icon.svg 
        }}
        style={{ color: networks[network].color }}
        className={`${sizes[size]} p-1`}
      />
    )
  }

  const TokenIcon = ({ token, size = "md" }: { token: keyof typeof tokens, size?: "sm" | "md" | "lg" }) => {
    const sizes = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6"
    }
    
    return (
      <div
        dangerouslySetInnerHTML={{ 
          __html: tokens[token].icon.svg 
        }}
        style={{ color: tokens[token].color }}
        className={sizes[size]}
      />
    )
  }

  const getDisplayAddress = () => {
    if (walletType === 'ton') {
      return tonAddressFormatted || tonAddress?.slice(0, 6) + '...' + tonAddress?.slice(-4) || ''
    }
    return evmAddress ? `${evmAddress.slice(0, 6)}...${evmAddress.slice(-4)}` : ''
  }

  const getDisplayBalance = () => {
    if (sourceNetwork === 'ton') return tonBalance
    return evmBalance
  }

  return (
    <>
      <Navigation />
      <div className="relative min-h-screen bg-white">
        {/* Background Grid */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(255,255,255,0)_40%,rgba(99,102,241,0.05)_50%,rgba(255,255,255,0)_60%)]"
          style={{
            backgroundImage: `linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Animated Waves */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[500px] h-[500px] opacity-30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: 'translate(-50%, -50%)',
                background: `radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(99,102,241,0) 70%)`,
                animation: `float-${i} ${20 + i * 5}s infinite linear`
              }}
            />
          ))}
        </div>

        <div className="mt-8 relative z-10 flex flex-col items-center justify-center gap-4">
          {isConnected && (
            <Card className="w-full max-w-xl bg-white/80 backdrop-blur-sm border border-indigo-100/20 shadow-xl">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-purple-600" />
                    <div>
                      <div className="font-medium">Connected Wallet</div>
                      <div className="text-sm text-gray-500">
                        {walletType === 'evm' ? 'Ethereum' : 'TON'} Wallet
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm">
                      {getDisplayAddress()}
                    </div>
                    <div className="text-sm text-gray-500">
                      Balance: {getDisplayBalance() || '0.00'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="w-full max-w-xl bg-white/80 backdrop-blur-sm border border-indigo-100/20 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-bold">Bridge</CardTitle>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Network Icons */}
              <div className="relative flex justify-center items-center py-8">
                <div className="flex items-center gap-8 justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${networks[sourceNetwork].bgColor} to-white/50 shadow-lg flex items-center justify-center`}>
                      <NetworkIcon network={sourceNetwork as keyof typeof networks} size="lg" />
                    </div>
                    <div className="relative w-32 h-12 flex items-center justify-center">
                      <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                        <path
                          d="M0,20 Q25,5 50,20 T100,20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-purple-500"
                        >
                          <animate
                            attributeName="d"
                            dur="3s"
                            repeatCount="indefinite"
                            values="M0,20 Q25,5 50,20 T100,20;
                                   M0,20 Q25,35 50,20 T100,20;
                                   M0,20 Q25,5 50,20 T100,20"
                          />
                        </path>
                      </svg>
                    </div>
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${networks[targetNetwork].bgColor} to-white/50 shadow-lg flex items-center justify-center`}>
                      <NetworkIcon network={targetNetwork as keyof typeof networks} size="lg" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Network Selection */}
              <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
                <Select 
                  value={sourceNetwork} 
                  onValueChange={(value: NetworkType) => setSourceNetwork(value)}
                >
                  <SelectTrigger className="h-14">
                    <div className="flex items-center gap-2">
                
                      <SelectValue placeholder={networks[sourceNetwork].name} />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(networks).map(([key, network]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 bg-gradient-to-br ${network.bgColor} to-white rounded-lg flex items-center justify-center`}>
                            <NetworkIcon network={key as keyof typeof networks} size="sm" />
                          </div>
                          {network.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowUpDown className="h-5 w-5" />
                </Button>

                <Select 
                  value={targetNetwork} 
                  onValueChange={(value: NetworkType) => setTargetNetwork(value)}
                >
                  <SelectTrigger className="h-14">
                    <div className="flex items-center gap-2">
                
                      <SelectValue placeholder={networks[targetNetwork].name} />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(networks).map(([key, network]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 bg-gradient-to-br ${network.bgColor} to-white rounded-lg flex items-center justify-center`}>
                            <NetworkIcon network={key as keyof typeof networks} size="sm" />
                          </div>
                          {network.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Amount Input - Send */}
              <div className="space-y-2">
                <Label>You send</Label>
                <div className="flex gap-2">
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    className="h-14"
                  />
                  <Select 
                    value={sourceToken} 
                    onValueChange={(value: TokenType) => setSourceToken(value)}
                  >
                    <SelectTrigger className="w-[120px] h-14 bg-white">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 bg-gradient-to-br ${tokens[sourceToken].bgColor} to-white rounded-lg flex items-center justify-center`}>
                          <TokenIcon token={sourceToken} size="md" />
                        </div>
                        <span className="text-sm font-medium">{tokens[sourceToken].name}</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg">
                      {Object.entries(tokens).map(([key, token]) => (
                        <SelectItem 
                          key={key} 
                          value={key}
                          className="hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 bg-gradient-to-br ${token.bgColor} to-white rounded-lg flex items-center justify-center`}>
                              <TokenIcon token={key as keyof typeof tokens} size="sm" />
                            </div>
                            <span className="text-sm font-medium">{token.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
           
              </div>

              {/* Amount Input - Receive */}
              <div className="space-y-2">
                <Label>You receive</Label>
                <div className="flex gap-2">
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    className="h-14"
                  />
                  <Select 
                    value={targetToken} 
                    onValueChange={(value: TokenType) => setTargetToken(value)}
                  >
                    <SelectTrigger className="w-[120px] h-14 bg-white">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 bg-gradient-to-br ${tokens[targetToken].bgColor} to-white rounded-lg flex items-center justify-center`}>
                          <TokenIcon token={targetToken} size="md" />
                        </div>
                        <span className="text-sm font-medium">{tokens[targetToken].name}</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg">
                      {Object.entries(tokens).map(([key, token]) => (
                        <SelectItem 
                          key={key} 
                          value={key}
                          className="hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 bg-gradient-to-br ${token.bgColor} to-white rounded-lg flex items-center justify-center`}>
                              <TokenIcon token={key as keyof typeof tokens} size="sm" />
                            </div>
                            <span className="text-sm font-medium">{token.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Recipient Address */}
              <div className="space-y-2">
                <Label>Recipient Address</Label>
                <div className="relative">
                  <Input
                    value={recipientAddress}
                    onChange={(e) => isEditingRecipient && setRecipientAddress(e.target.value)}
                    className={`h-14 font-mono text-sm ${!isEditingRecipient ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                    disabled={!isEditingRecipient}
                    placeholder="Enter recipient address"
                  />
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10"
                    onClick={() => {
                      if (isEditingRecipient) {
                        // If we're ending edit mode, reset to default address
                        setRecipientAddress(getDefaultRecipientAddress());
                      }
                      setIsEditingRecipient(!isEditingRecipient);
                    }}
                  >
                    {isEditingRecipient ? (
                      <X className="h-4 w-4" />
                    ) : (
                      <Edit2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Enable Refuel */}
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-medium">Enable Refuel</div>
                    <div className="text-sm text-gray-500">Refuel isn't supported on Ethereum</div>
                  </div>
                </div>
                <Switch
                  checked={enableRefuel}
                  onCheckedChange={setEnableRefuel}
                />
              </div>

              {/* Bridge and Transfer Toggle */}
              <div className="flex items-center justify-between py-2 border-t">
                <div className="font-medium">Bridge and transfer</div>
                <Switch
                  checked={bridgeAndTransfer}
                  onCheckedChange={setBridgeAndTransfer}
                />
              </div>

           

              {/* Approve Button */}
              <Button className="w-full h-12 text-lg bg-purple-600 hover:bg-purple-700">
                Approve
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}