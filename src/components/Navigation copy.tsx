/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-ignore
import { useState } from 'react'
import { useTonConnectUI } from '@tonconnect/ui-react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { motion, AnimatePresence } from 'framer-motion'
import * as SimpleIcons from 'simple-icons'
import { useWallet } from '../context/WalletContext'
import { LogOut, Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const wallets = {
  ethereum: {
    name: "Ethereum",
    icon: SimpleIcons.siEthereum,
    color: "#3C3C3D",
  },
  ton: {
    name: "TON",
    icon: SimpleIcons.siTon,
    color: "#0098EA",
  }
}

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Bridge', path: '/app' },
  { name: 'Roadmap', path: '/#roadmap' },
  { name: 'Docs', path: 'https://tonify.gitbook.io/' },
]

export default function Navigation() {
  const { isConnected, evmAddress, tonAddressFormatted, walletType, disconnect } = useWallet()
  const [tonConnectUI] = useTonConnectUI()
  const [isOpen, setIsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isAppPage = location.pathname === '/app'

  const handleDisconnect = () => {
    disconnect?.()
    setIsOpen(false)
  }

  const handleTonConnect = () => {
    tonConnectUI.openModal()
    setIsOpen(false)
  }

  const getDisplayAddress = () => {
    if (walletType === 'ton') {
      return tonAddressFormatted ? `${tonAddressFormatted.slice(0, 6)}...${tonAddressFormatted.slice(-4)}` : ''
    }
    return evmAddress ? `${evmAddress.slice(0, 6)}...${evmAddress.slice(-4)}` : ''
  }

  const scrollToRoadmap = () => {
    const roadmapSection = document.getElementById('roadmap')
    if (roadmapSection) {
      roadmapSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <img src="/images/logo.png" alt="Logo" className='w-20' />
             
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={item.path === '/#roadmap' ? scrollToRoadmap : undefined}
                  className={`text-sm font-medium transition-colors hover:text-purple-500 ${
                    location.pathname === item.path ? 'text-purple-500' : 'text-gray-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Wallet Connection - Only show on /app page */}
            {isAppPage && (
              <div className="relative">
                {!isConnected ? (
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-all hover:scale-105"
                  >
                    Connect Wallet
                  </button>
                ) : (
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200 transition-all hover:scale-105 border border-gray-200"
                  >
                    {getDisplayAddress()}
                  </button>
                )}

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <div className="py-1">
                        {!isConnected ? (
                          <>
                            <ConnectButton.Custom>
                              {({
                                openConnectModal,
                              }) => {
                                return (
                                  <button
                                    onClick={openConnectModal}
                                    className="flex items-center gap-2 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                                  >
                                    <div
                                      dangerouslySetInnerHTML={{ 
                                        __html: wallets.ethereum.icon.svg 
                                      }}
                                      style={{ color: wallets.ethereum.color }}
                                      className="w-5 h-5"
                                    />
                                    <span>EVM</span>
                                  </button>
                                )
                              }}
                            </ConnectButton.Custom>

                            <button
                              onClick={handleTonConnect}
                              className="flex items-center gap-2 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <div
                                dangerouslySetInnerHTML={{ 
                                  __html: wallets.ton.icon.svg 
                                }}
                                style={{ color: wallets.ton.color }}
                                className="w-5 h-5"
                              />
                              <span>TON</span>
                            </button>
                          </>
                        ) : (
                          <>
                            <a
                              href={`${walletType === 'ton' ? 'https://tonscan.org/address/' : 'https://etherscan.io/address/'}${
                                walletType === 'ton' ? tonAddressFormatted : evmAddress
                              }`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              onClick={() => setIsOpen(false)}
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              View on Explorer
                            </a>

                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(walletType === 'ton' ? tonAddressFormatted || '' : evmAddress || '')
                                setIsOpen(false)
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                              </svg>
                              Copy Address
                            </button>

                            <button
                              onClick={handleDisconnect}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <LogOut className="w-4 h-4" />
                              <span>Disconnect</span>
                            </button>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4"
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={(e) => {
                      if (item.path === '/#roadmap') {
                        e.preventDefault()
                        scrollToRoadmap()
                      }
                      setIsMobileMenuOpen(false)
                    }}
                    className={`text-sm font-medium transition-colors hover:text-purple-500 ${
                      location.pathname === item.path ? 'text-purple-500' : 'text-gray-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}