import { useTonConnectUI } from '@tonconnect/ui-react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import styles from '../styles/walletconnect.module.css'

export default function WalletConnect() {
    const [tonConnectUI] = useTonConnectUI()

    const handleTonConnect = () => {
        tonConnectUI.openModal()
    }

    return (
        <div className={styles.buttonContainer}>
            <button onClick={handleTonConnect} className={styles.customTonButton}>
                Connect BRo
            </button>
            <ConnectButton.Custom>
                {({
                    account,
                    openAccountModal,
                    openConnectModal,
                }) => {
                    return (
                        <>
                        <div className={styles.rainbowButton}>
                            {!account && (
                                <button onClick={openConnectModal} className={styles.customConnectButton}>
                                    Connect Eth
                                </button>
                            )}
                            {account && (
                                <button onClick={openAccountModal} className={styles.customConnectButton}>
                                    {account.displayName}
                                </button>
                            )}
                        </div>

                        <h1 className="text-3xl font-bold text-red-500">
                            Hello World

                        </h1>
                        </>
                    );
                }}
            </ConnectButton.Custom>
        </div>
    )
}
