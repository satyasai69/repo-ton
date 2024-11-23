import { Toaster } from 'react-hot-toast'
import RainbowKitProvider from './providers/RainbowKitProvider'
import TonConnectProvider from './providers/TonConnectProvider'
import { Route, Routes } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import AppPage from './pages/App'
import { WalletProvider } from './context/WalletContext'

const themeData = {
    primary: {
        500: 'rgb(123, 63, 228)',
        text: 'rgb(255, 255, 255)'
    },
    secondary: {
        800: 'rgb(30, 30, 30)',
        900: 'rgb(23, 23, 23)'
    }
}

function App() {
    return (
        <TonConnectProvider
            themeData={themeData}
        >
            <RainbowKitProvider>
                <WalletProvider>
                    <Routes>  
                        <Route path="/" element={<Home />} />
                        <Route path="/app" element={<AppPage />} />
                    </Routes>
                    <Toaster position="bottom-right" />
                </WalletProvider>
            </RainbowKitProvider>
        </TonConnectProvider>
    )
}

export default App
