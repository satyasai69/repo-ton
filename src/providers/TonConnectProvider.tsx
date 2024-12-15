import { THEME, TonConnectUIProvider } from '@tonconnect/ui-react'

import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  themeData?: any
}

const TonConnectProvider = ({ children }: Props) => {
  const manifestUrl = 'http://localhost:5173/tonconnect-manifest.json';
  
  const uiPreferences = {
    theme: THEME.DARK,
    modalWidth: 400,
    collapseButtonEnabled: true,
    actionsConfiguration: {
      modals: {
        connection: {
          closeOnOverlayClick: true,
          closeOnEsc: true,
        },
      },
    },
  };

  return (
    <TonConnectUIProvider
      manifestUrl={manifestUrl}
      uiPreferences={uiPreferences}
    >
      {children}
    </TonConnectUIProvider>
  )
}

export default TonConnectProvider
