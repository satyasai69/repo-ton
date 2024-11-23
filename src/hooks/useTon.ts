import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react"
import { Address } from "@ton/core"
import { useState, useEffect } from "react"
import type { WalletProvider } from "../types/wallet"

export default function useTON(): WalletProvider {
    const withdrawalSupportedNetworks = ["TONMainnet"]
    const name = 'ton'
    const wallet = useTonWallet()
    const [tonConnectUI] = useTonConnectUI()
    const [shouldConnect, setShouldConnect] = useState(false)

    useEffect(() => {
        if (shouldConnect) {
            connectWallet()
            setShouldConnect(false)
        }
    }, [shouldConnect])

    const getWallet = () => {
        if (wallet) {
            const address = Address.parse(wallet.account.address).toString({ bounceable: false })
            return {
                address,
                connector: (wallet as any)?.name || 'TON',
                providerName: name,
                icon: null // Add icon implementation
            }
        }
    }

    const connectWallet = async () => {
        return await tonConnectUI.openModal()
    }

    const disconnectWallet = async () => {
        try {
            await tonConnectUI.disconnect()
        }
        catch (e) {
            console.error(e)
        }
    }

    const reconnectWallet = async () => {
        try {
            await disconnectWallet()
            setShouldConnect(true)
        }
        catch (e) {
            console.error(e)
        }
    }

    return {
        getConnectedWallet: getWallet,
        connectWallet,
        disconnectWallet,
        reconnectWallet,
        withdrawalSupportedNetworks,
        name
    }
}
