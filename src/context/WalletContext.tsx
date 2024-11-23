'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useTonConnectUI, useTonAddress } from '@tonconnect/ui-react'
import { useAccount, useBalance, useDisconnect } from 'wagmi'

interface WalletContextType {
  evmAddress?: string
  tonAddress?: string
  tonAddressFormatted?: string
  evmBalance?: string
  tonBalance?: string
  isConnected: boolean
  walletType?: 'ton' | 'evm'
  disconnect?: () => Promise<void>
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false
})

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [tonConnectUI] = useTonConnectUI()
  const { address: evmAddress, isConnected: isEvmConnected } = useAccount()
  const { disconnectAsync: evmDisconnect } = useDisconnect()
  const { data: evmBalanceData } = useBalance({
    address: evmAddress,
  })
  const tonAddressFormatted = useTonAddress()
  const tonAddress = useTonAddress(false)
  const [tonBalance, setTonBalance] = useState<string>()
  const [isTonConnected, setIsTonConnected] = useState(false)

  // Debug logs for connection state
  useEffect(() => {
    console.log('WalletContext Connection State:', {
      isEvmConnected,
      isTonConnected,
      evmAddress,
      tonAddress,
      tonAddressFormatted
    });
  }, [isEvmConnected, isTonConnected, evmAddress, tonAddress, tonAddressFormatted])

  useEffect(() => {
    const unsubscribe = tonConnectUI.onStatusChange(wallet => {
      console.log('TON wallet status changed:', wallet)
      if (wallet) {
        setIsTonConnected(true)
      } else {
        setTonBalance(undefined)
        setIsTonConnected(false)
      }
    })

    // Check initial TON connection
    const checkTonConnection = async () => {
      try {
        const walletConnectionRestored = await tonConnectUI.connectionRestored
        setIsTonConnected(!!walletConnectionRestored)
      } catch (error) {
        console.error('Error checking TON connection:', error)
        setIsTonConnected(false)
      }
    }
    
    checkTonConnection()
    return () => unsubscribe()
  }, [tonConnectUI])

  const disconnect = async () => {
    if (isEvmConnected) {
      await evmDisconnect()
    }
    if (isTonConnected) {
      await tonConnectUI.disconnect()
      setTonBalance(undefined)
      setIsTonConnected(false)
    }
  }

  // Determine wallet type based on active connections
  const walletType = isEvmConnected ? 'evm' : isTonConnected ? 'ton' : undefined
  const isConnected = isEvmConnected || isTonConnected

  const value: WalletContextType = {
    evmAddress,
    tonAddress,
    tonAddressFormatted,
    evmBalance: evmBalanceData?.formatted,
    tonBalance,
    isConnected,
    walletType,
    disconnect
  }

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => useContext(WalletContext)