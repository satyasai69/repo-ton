'use client'

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function FloatingElements() {
  const [mounted, setMounted] = useState(false)
  const [elements, setElements] = useState<Array<{top: number, left: number, size: number}>>([])

  useEffect(() => {
    setElements(
      [...Array(20)].map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 100 + Math.random() * 200
      }))
    )
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.02) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59,130,246,0.02) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
      
      {elements.map((position, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${position.top}%`,
            left: `${position.left}%`,
            width: position.size,
            height: position.size,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.01, 0.03, 0.01],
            scale: [1, 1.1, 1],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl" />
        </motion.div>
      ))}
    </div>
  )
}