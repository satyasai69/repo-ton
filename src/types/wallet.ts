export type Wallet = {
    address: string
    connector: string
    providerName: string
    icon: any
}

export type WalletProvider = {
    connectWallet: (props?: { chain?: string | number | undefined | null }) => Promise<void> | undefined | void
    disconnectWallet: () => Promise<void> | undefined | void
    reconnectWallet: (props?: { chain?: string | number | undefined | null }) => Promise<void> | undefined | void
    getConnectedWallet: () => Wallet | undefined
    withdrawalSupportedNetworks?: string[]
    name: string
}
