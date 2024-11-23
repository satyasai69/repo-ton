import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider as Provider, darkTheme } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

const WALLETCONNECT_PROJECT_ID = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || "28168903b2d30c75e5f7f2d71902581b"

const { chains, publicClient } = configureChains(
  [mainnet, sepolia],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'Tonify Bridge',
  projectId: WALLETCONNECT_PROJECT_ID,
  chains
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

const queryClient = new QueryClient()

type Props = {
  children: ReactNode
}

function RainbowKitComponent({ children }: Props) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Provider chains={chains} theme={darkTheme({
          accentColor: '#7b3fe4',
          accentColorForeground: 'white',
          borderRadius: 'small',
          fontStack: 'system',
        })}>
          {children}
        </Provider>
      </QueryClientProvider>
    </WagmiConfig>
  )
}

export default RainbowKitComponent
