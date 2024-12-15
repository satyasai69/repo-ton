import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { THEME } from '@tonconnect/ui-react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  themeData?: any
}

const TonConnectProvider = ({ children, themeData }: Props) => {
  return (
    <TonConnectUIProvider
      manifestUrl="http://localhost:5173/tonconnect-manifest.json"
      uiPreferences={{
        theme: THEME.DARK,
        borderRadius: "s",
        colorsSet: {
          DARK: {
            constant: {
              black: "#000000",
              white: "#f1f1f1",
            },
            connectButton: {
              background: "#1570ef",
              foreground: "#ffffff",
            },
            accent: themeData?.accent,
          },
        },
      }}
    >
      {children}
    </TonConnectUIProvider>
  )
}

export default TonConnectProvider
