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
import axios from 'axios';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ConnectButton } from '@rainbow-me/rainbowkit'

import { useWallet } from '../../context/WalletContext'

const networks = {
 
  ethereum: {
    name: 'Ethereum',
    icon: SimpleIcons.siEthereum,
    color: '#627EEA',
    bgColor: 'from-blue-500',
  },
 
  Ton: {
    name: 'TON',
    icon: SimpleIcons.siTon,
    color: '#0098EA',
    bgColor: 'from-blue-400',
  },
} as const

const tokens = {
  ton: {
    name: 'TON',
    icon: SimpleIcons.siTon,
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
  const [sourceNetwork, setSourceNetwork] = useState<NetworkType>('Ton')
  const [targetNetwork, setTargetNetwork] = useState<NetworkType>('ethereum')
  const [sourceToken, setSourceToken] = useState<TokenType>('ton')
  const [targetToken, setTargetToken] = useState<TokenType>('eth')
  const [isEditingRecipient, setIsEditingRecipient] = useState(false)
  const [recipientAddress, setRecipientAddress] = useState('')
  const [sendAmount, setSendAmount] = useState<string>('');
  const [receiveAmount, setReceiveAmount] = useState<string>('');
  const [conversionRate, setConversionRate] = useState<number>(0);
  const [isLoadingRate, setIsLoadingRate] = useState(false);
  const [sourceAmount, setSourceAmount] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [ethGasPrice, setEthGasPrice] = useState<string>('0');
  const [tonGasPrice, setTonGasPrice] = useState<string>('0');
  const [selectedNetwork, setSelectedNetwork] = useState<'mainnet' | 'testnet'>('mainnet');

  useEffect(() => {
    if (isConnected) {
      if (walletType === 'evm') {
        setSourceNetwork('ethereum');
        setTargetNetwork('Ton');
        setSourceToken('eth');
        setTargetToken('ton');
      } else if (walletType === 'ton') {
        setSourceNetwork('Ton');
        setTargetNetwork('ethereum');
        setSourceToken('ton');
        setTargetToken('eth');
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

  const fetchTokenPrice = async () => {
    setIsLoadingRate(true);
    try {
      // Using CoinGecko API for price data
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=the-open-network,ethereum&vs_currencies=usd'
      );
      
      const tonUsdPrice = response.data['the-open-network']?.usd || 0;
      const ethUsdPrice = response.data['ethereum']?.usd || 0;
      
      // Calculate rate based on source and target tokens
      let rate = 0;
      if (sourceToken === 'ton' && targetToken === 'eth') {
        rate = tonUsdPrice / ethUsdPrice;
      } else if (sourceToken === 'eth' && targetToken === 'ton') {
        rate = ethUsdPrice / tonUsdPrice;
      }
      
      setConversionRate(rate);
      setExchangeRate(rate);
      
      // Update receive amount if send amount exists
      if (sendAmount) {
        const newReceiveAmount = (parseFloat(sendAmount) * rate).toFixed(6);
        setReceiveAmount(newReceiveAmount);
      }
    } catch (error) {
      console.error('Error fetching price:', error);
    } finally {
      setIsLoadingRate(false);
    }
  };

  useEffect(() => {
    fetchTokenPrice();
  }, [sourceToken, targetToken]);

  const handleNetworkChange = (network: NetworkType, isSource: boolean) => {
    if (isSource) {
      setSourceNetwork(network);
      if (network === 'Ton') {
        setTargetNetwork('ethereum');
        setSourceToken('ton');
        setTargetToken('eth');
      } else {
        setTargetNetwork('Ton');
        setSourceToken('eth');
        setTargetToken('ton');
      }
    } else {
      setTargetNetwork(network);
      if (network === 'Ton') {
        setSourceNetwork('ethereum');
        setSourceToken('eth');
        setTargetToken('ton');
      } else {
        setSourceNetwork('Ton');
        setSourceToken('ton');
        setTargetToken('eth');
      }
    }
    // Reset amounts
    setSendAmount('');
    setReceiveAmount('');
    setSourceAmount('');
    setTargetAmount('');
  };

  const handleSendAmountChange = (value: string) => {
    setSendAmount(value);
    if (value && conversionRate) {
      const converted = (parseFloat(value) * conversionRate).toFixed(6);
      setReceiveAmount(converted);
    } else {
      setReceiveAmount('');
    }
  };

  const handleReceiveAmountChange = (value: string) => {
    setReceiveAmount(value);
    if (value && conversionRate) {
      const converted = (parseFloat(value) / conversionRate).toFixed(6);
      setSendAmount(converted);
    } else {
      setSendAmount('');
    }
  };

  const handleSourceAmountChange = (value: string) => {
    setSourceAmount(value);
    if (value && conversionRate) {
      const converted = (parseFloat(value) * conversionRate).toFixed(6);
      setTargetAmount(converted);
    } else {
      setTargetAmount('');
    }
  };

  const handleTargetAmountChange = (value: string) => {
    setTargetAmount(value);
    if (value && conversionRate) {
      const converted = (parseFloat(value) / conversionRate).toFixed(6);
      setSourceAmount(converted);
    } else {
      setSourceAmount('');
    }
  };

  const fetchEthGasPrice = async () => {
    try {
      // For mainnet use Etherscan, for testnet (Goerli) use different endpoint
      const baseUrl = selectedNetwork === 'mainnet' 
        ? 'https://api.etherscan.io/api'
        : 'https://api-goerli.etherscan.io/api';
        
      const response = await axios.get(baseUrl, {
        params: {
          module: 'gastracker',
          action: 'gasoracle',
          apikey: process.env.REACT_APP_ETHERSCAN_API_KEY
        }
      });
      
      if (response.data.status === '1') {
        const proposeGasPrice = response.data.result.ProposeGasPrice;
        setEthGasPrice(proposeGasPrice);
      }
    } catch (error) {
      console.error('Error fetching ETH gas price:', error);
    }
  };

  const fetchTonGasPrice = async () => {
    try {
      // Use different endpoints for mainnet and testnet
      const baseUrl = selectedNetwork === 'mainnet'
        ? 'https://toncenter.com/api/v2/estimateFee'
        : 'https://testnet.toncenter.com/api/v2/estimateFee';

      const response = await axios.get(baseUrl, {
        params: {
          address: tonAddress,
          amount: '1000000000' // 1 TON in nanotons
        },
        headers: {
          'X-API-Key': process.env.REACT_APP_TONCENTER_API_KEY
        }
      });
      
      if (response.data && response.data.ok) {
        const fee = response.data.result.source_fees.in_fwd_fee;
        const feeInTon = (parseInt(fee) / 1e9).toFixed(3);
        setTonGasPrice(feeInTon);
      }
    } catch (error) {
      console.error('Error fetching TON gas price:', error);
    }
  };

  useEffect(() => {
    const fetchGasPrices = async () => {
      if (sourceNetwork === 'ethereum') {
        await fetchEthGasPrice();
      } else {
        await fetchTonGasPrice();
      }
    };

    fetchGasPrices();
    const interval = setInterval(fetchGasPrices, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, [sourceNetwork, tonAddress, selectedNetwork]);

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
      

          <Card className="w-full max-w-xl bg-white/80 backdrop-blur-sm border border-indigo-100/20 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-bold">Bridge</CardTitle>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </CardHeader>

            {isConnected && (
            <Card className="w-full relative">
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
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">Network</span>
                <Select value={selectedNetwork} onValueChange={(value: 'mainnet' | 'testnet') => setSelectedNetwork(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select network" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mainnet">Mainnet</SelectItem>
                    <SelectItem value="testnet">Testnet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
                <Select 
                  value={sourceNetwork} 
                  onValueChange={(value: NetworkType) => handleNetworkChange(value, true)}
                >
                  <SelectTrigger className="h-14 bg-white border border-gray-200">
                    <div className="flex items-center gap-2">
                   
                      <SelectValue placeholder={networks[sourceNetwork].name} />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 shadow-lg rounded-lg">
                    {Object.entries(networks).map(([key, network]) => (
                      <SelectItem key={key} value={key} className="hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <NetworkIcon network={key as keyof typeof networks} size="md" />
                          <span className="font-medium">{network.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full"
                  onClick={() => {
                    handleNetworkChange(targetNetwork, true);
                  }}
                >
                  <ArrowUpDown className="h-5 w-5" />
                </Button>

                <Select 
                  value={targetNetwork} 
                  onValueChange={(value: NetworkType) => handleNetworkChange(value, false)}
                >
                  <SelectTrigger className="h-14 bg-white border border-gray-200">
                    <div className="flex items-center gap-2">
                   
                      <SelectValue placeholder={networks[targetNetwork].name} />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 shadow-lg rounded-lg">
                    {Object.entries(networks).map(([key, network]) => (
                      <SelectItem key={key} value={key} className="hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <NetworkIcon network={key as keyof typeof networks} size="md" />
                          <span className="font-medium">{network.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Amount Inputs */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>You send</Label>
                  <div className="flex gap-4">
                    <Input
                      type="number"
                      placeholder={`Enter amount in ${networks[sourceNetwork].name}`}
                      className="flex-1 h-14"
                      value={sourceAmount}
                      onChange={(e) => handleSourceAmountChange(e.target.value)}
                    />
                    <div className="w-[120px] h-14 bg-white rounded-md border border-input flex items-center px-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 bg-gradient-to-br ${tokens[sourceToken].bgColor} to-white rounded-lg flex items-center justify-center`}>
                          <TokenIcon token={sourceToken} size="md" />
                        </div>
                        <span className="text-sm font-medium">{tokens[sourceToken].name}</span>
                      </div>
                    </div>
                  </div>
                  {isConnected && (
                    <div className="text-sm text-gray-500">
                      Balance: {walletType === 'ton' ? `${tonBalance} TON` : `${evmBalance} ETH`}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Recipient Address</Label>
                  <Input
                    placeholder={
                      isConnected
                        ? walletType === 'ton'
                          ? 'Enter Ethereum Address (0x...)'
                          : 'Enter TON Address (EQ...)'
                        : 'Connect wallet first'
                    }
                    className="h-14"
                  />
                  {isConnected && (
                    <div className="text-sm text-gray-500">
                      Connected as: {walletType === 'ton' ? tonAddressFormatted : evmAddress}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>You receive</Label>
                  <div className="flex gap-4">
                    <Input
                      type="number"
                      placeholder={`Enter amount in ${networks[targetNetwork].name}`}
                      className="flex-1 h-14"
                      value={targetAmount}
                      onChange={(e) => handleTargetAmountChange(e.target.value)}
                    />
                    <div className="w-[120px] h-14 bg-white rounded-md border border-input flex items-center px-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 bg-gradient-to-br ${tokens[targetToken].bgColor} to-white rounded-lg flex items-center justify-center`}>
                          <TokenIcon token={targetToken} size="md" />
                        </div>
                        <span className="text-sm font-medium">{tokens[targetToken].name}</span>
                      </div>
                    </div>
                  </div>
                  {isConnected && targetNetwork === 'ethereum' && (
                    <div className="text-sm text-gray-500">
                      Gas Fee: ~0.001 ETH
                    </div>
                  )}
                </div>
              </div>

              {/* Bridge Info */}
              <div className="space-y-4 py-4 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Exchange Rate</span>
                  <span className="font-medium">
                    1 {tokens[sourceToken].name} ≈ {exchangeRate.toFixed(6)} {tokens[targetToken].name}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Network Fee</span>
                  <span className="font-medium">
                    {sourceNetwork === 'ethereum' 
                      ? `~${ethGasPrice} ETH (${selectedNetwork})` 
                      : `~${tonGasPrice} TON (${selectedNetwork})`}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Network</span>
                  <span className="font-medium capitalize">{selectedNetwork}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Estimated Time</span>
                  <span className="font-medium">2-5 minutes</span>
                </div>
              </div>

              {/* Approve Button */}
              <Button className="w-full h-12 text-lg bg-purple-600 hover:bg-purple-700">
                Approve
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <span id="wallet-modal" className="hidden" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-white rounded-xl p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">Connect Wallet</DialogTitle>
            <DialogDescription className="text-gray-500">
              Choose your preferred wallet to connect
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <button
              onClick={() => {
                tonConnectUI.connectWallet();
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-[#0098EA]/10 flex items-center justify-center">
                <div
                  dangerouslySetInnerHTML={{ 
                    __html: SimpleIcons.siTon.svg 
                  }}
                  className="w-5 h-5"
                  style={{ color: '#0098EA' }}
                />
              </div>
              <div>
                Connect TON Wallet
              </div>
            </button>

            <ConnectButton.Custom>
              {({
                openConnectModal,
              }) => (
                <button
                  onClick={openConnectModal}
                  className="w-full h-16 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl transition-all hover:shadow-lg flex items-center px-4 group"
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-10 h-10 rounded-full bg-[#627EEA]/10 flex items-center justify-center">
                      <img src="/ethereum.svg" alt="Ethereum" className="w-6 h-6" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-semibold text-gray-900 group-hover:text-[#627EEA]">Ethereum Wallet</div>
                      <div className="text-sm text-gray-500">MetaMask, WalletConnect, etc.</div>
                    </div>
                  </div>
                </button>
              )}
            </ConnectButton.Custom>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}