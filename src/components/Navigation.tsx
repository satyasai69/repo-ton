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
      return tonAddressFormatted || ''
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center">
              <img src="/images/logo.png" alt="Akira Bridge Logo" className="h-8 w-auto" />
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
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90 transition-all hover:scale-105 shadow-lg hover:shadow-indigo-500/25"
                  >
                    Connect Wallet
                  </button>
                ) : (
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 text-indigo-600 hover:from-indigo-500/20 hover:via-purple-500/20 hover:to-pink-500/20 transition-all hover:scale-105 border border-indigo-200/50"
                  >
                    {getDisplayAddress()}
                  </button>
                )}

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg ring-1 ring-black/5 overflow-hidden"
                    >
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
                        <button
                          onClick={handleDisconnect}
                          className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Disconnect</span>
                        </button>
                      )}
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