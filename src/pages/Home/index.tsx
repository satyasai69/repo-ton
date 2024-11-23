'use client'

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useWallet } from "../../context/WalletContext"
import { Card } from "@/components/ui/card"
import { Shield, Zap, Coins } from "lucide-react"

import Roadmap from "../../components/Roadmap"
import HowTo from "../../components/HowTo"
import Cards from "../../components/Cards"
import CallToAction from "../../components/CallToAction"
import Navigation from "@/components/Navigation"

export default function Component() {

  const { isConnected, evmAddress, tonAddress, evmBalance, tonBalance, walletType } = useWallet();
  const [waves, setWaves] = useState<Array<{top: number, left: number}>>([]);

  useEffect(() => {
    console.log('Home component mounted');
    setWaves(
      [...Array(8)].map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100
      }))
    );
  }, []);

  return (
    <>
    <Navigation />
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {isConnected && (
        <Card className="mx-auto max-w-2xl mt-4 p-6">
          <div className="flex flex-col items-center space-y-2">
            <h2 className="text-xl font-semibold">Connected Wallet</h2>
            <p className="text-sm text-gray-500">{walletType === 'evm' ? 'Ethereum' : 'TON'} Wallet</p>
            <p className="font-mono bg-gray-100 rounded-lg px-4 py-2">
              {walletType === 'evm' ? evmAddress : tonAddress}
            </p>
            <p className="text-sm">
              Balance: <span className="font-semibold">{walletType === 'evm' ? evmBalance : tonBalance}</span>
            </p>
          </div>
        </Card>
      )}


      <main className="relative pt-32 pb-16">
        {/* Background Grid */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(255,255,255,0)_40%,rgba(59,130,246,0.1)_50%,rgba(255,255,255,0)_60%)]"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Animated Waves */}
        {waves.map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-24 h-24"
            style={{
              top: `${position.top}%`,
              left: `${position.left}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.4, 0.8, 0.4],
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          >
            <div className="w-full h-full bg-blue-500/20 rounded-full blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-30" />
          </motion.div>
        ))}

        <div className="container mx-auto px-4 relative z-10">
          {/* Contribute Banner */}
          <div className="flex justify-center mb-4">
            <Link 
            to="/app"
              className="group flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full text-sm transition-colors"
            >
              <span className="text-blue-900">Take me to Bridge</span>
              <motion.span 
                className="text-blue-500"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </div>
         
        
        </div>
        <div className="max-w-5xl mx-auto pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
          <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
            <span className="relative whitespace-nowrap text-blue-600">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute left-0 top-2/3 h-[0.58em] w-full fill-blue-300/70"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
              </svg>
              <span className="relative">Tonify Bridge</span>
            </span>{" "}
            for TON Blockchain
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
            First-ever zkSync integration for TON blockchain. Bridge your tokens securely and instantly with zero-knowledge proofs.
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
           
          </div>
        </div>
      </div>
      </main>

    

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="mt-20">
              <div className="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="relative group">
                  <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.blue.50)),var(--quick-links-hover-bg,theme(colors.blue.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.blue.500))_border-box] group-hover:opacity-100 [--quick-links-hover-bg:theme(colors.white)]" />
                  <div className="relative overflow-hidden rounded-xl p-6">
                    <h2 className="font-display text-base text-slate-900">
                      <div className="absolute top-6 right-6 text-slate-600">
                        <Shield className="h-6 w-6" />
                      </div>
                      <div className="font-bold text-lg mb-2">Secure Bridging</div>
                      <span className="absolute -inset-px rounded-xl" />
                    </h2>
                    <p className="mt-1 text-sm text-slate-700">
                      Leverage zkSync's zero-knowledge proofs for secure and private cross-chain transfers
                    </p>
                  </div>
                </Card>
                <Card className="relative group">
                  <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.blue.50)),var(--quick-links-hover-bg,theme(colors.blue.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.blue.500))_border-box] group-hover:opacity-100 [--quick-links-hover-bg:theme(colors.white)]" />
                  <div className="relative overflow-hidden rounded-xl p-6">
                    <h2 className="font-display text-base text-slate-900">
                      <div className="absolute top-6 right-6 text-slate-600">
                        <Zap className="h-6 w-6" />
                      </div>
                      <div className="font-bold text-lg mb-2">Lightning Fast</div>
                      <span className="absolute -inset-px rounded-xl" />
                    </h2>
                    <p className="mt-1 text-sm text-slate-700">
                      Experience near-instant transfers with zkSync's advanced rollup technology
                    </p>
                  </div>
                </Card>
                <Card className="relative group">
                  <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.blue.50)),var(--quick-links-hover-bg,theme(colors.blue.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.blue.500))_border-box] group-hover:opacity-100 [--quick-links-hover-bg:theme(colors.white)]" />
                  <div className="relative overflow-hidden rounded-xl p-6">
                    <h2 className="font-display text-base text-slate-900">
                      <div className="absolute top-6 right-6 text-slate-600">
                        <Coins className="h-6 w-6" />
                      </div>
                      <div className="font-bold text-lg mb-2">Low Fees</div>
                      <span className="absolute -inset-px rounded-xl" />
                    </h2>
                    <p className="mt-1 text-sm text-slate-700">
                      Minimize transaction costs with efficient zkSync scaling solution
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="roadmap">
        <Roadmap />
      </div>
      <Cards />
      <HowTo />
      <CallToAction />
    </div>
    
 
    </>
  )
}