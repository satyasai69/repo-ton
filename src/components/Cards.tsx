'use client'

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import OctopusBackground from './OctopusBackground'
import { useNavigate } from "react-router-dom"

const FloatingBubbles = () => {
  const bubbles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * -20,
    x: Math.random() * 100,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-blue-500/10"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}%`,
          }}
          animate={{
            y: [0, -1000],
            x: [0, Math.sin(bubble.id) * 50],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

export default function Component() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-white/90 text-gray-900 p-8">
      <OctopusBackground />
      <div className="relative z-20">
        {/* Background Grid */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(255,255,255,0)_40%,rgba(59,130,246,0.1)_50%,rgba(255,255,255,0)_60%)]"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
        
        <FloatingBubbles />

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {/* Main Card */}
          <motion.div 
            className="col-span-full lg:col-span-2 rounded-3xl bg-gradient-to-br from-blue-500/10 to-white p-8 relative overflow-hidden backdrop-blur-sm border border-blue-100"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="max-w-sm">
              <div className="mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h1 className="text-4xl font-bold text-blue-900 mb-2">Tonify Bridge</h1>
                <p className="text-sm text-gray-600">First-ever zkSync integration for TON blockchain - enabling secure, fast, and scalable token transfers</p>
              </div>
            </div>
          </motion.div>

          {/* zkSync Integration Card */}
          <motion.div 
            className="rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 backdrop-blur-sm"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-2xl font-bold mb-4">zkSync Integration</h2>
            <p className="text-sm text-blue-100 mb-8">
              Experience the power of zero-knowledge proofs with our pioneering zkSync integration on TON
            </p>
            <div className="w-32 h-32 mx-auto">
              <div className="w-full h-full bg-gradient-to-br from-blue-400/30 to-blue-300/30 rounded-xl" />
            </div>
          </motion.div>

          {/* Innovation Card */}
          <motion.div 
            className="rounded-3xl bg-white/80 p-8 backdrop-blur-sm border border-blue-100"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-4xl font-bold text-blue-900 mb-8">
              First Ever
              <br />
              zkSync + TON
              <br />
              Bridge!
            </h2>
            <div className="flex flex-col gap-2">
              <Button onClick={() => navigate('/app')} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700">
                Start Bridging
              </Button>
              <div className="flex gap-2">
                <Button onClick={() => window.open('https://tonify.gitbook.io', '_blank')} variant="outline" className="flex-1">
                  Docs
                </Button>
                <Button onClick={() => window.open('https://tonify.gitbook.io', '_blank')} variant="outline" className="flex-1">
                  Learn More
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Features Card */}
          <motion.div 
            className="rounded-3xl bg-white/80 p-8 backdrop-blur-sm border border-blue-100"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">Zero-Knowledge Proofs</h3>
            <p className="text-sm text-gray-600">
              Enhanced security and scalability with zkSync's cutting-edge technology
            </p>
          </motion.div>

          {/* Benefits Card */}
          <motion.div 
            className="rounded-3xl bg-white/80 p-8 backdrop-blur-sm border border-blue-100"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">Lightning Fast</h3>
            <p className="text-sm text-gray-600">
              Experience near-instant transfers with minimal fees using zkSync technology
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}