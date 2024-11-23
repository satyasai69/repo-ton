import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const roadmapSteps = [
  {
    title: "Phase 1: Current",
    description: "USDT and zk Integration",
    emoji: "💎",
    icon: "/images/usdt-icon.png",
    details: "Currently live with USDT support across networks",
    isCompleted: true,
    isCurrent: true,
  },
  {
    title: "Phase 2: Multi-Chain",
    description: "Solana & Token Swaps",
    emoji: "🌐",
    icon: "/images/multi-chain.png",
    details: "Expanding to Solana and enabling cross-chain ANIMA token swaps",
    isCompleted: false,
    isCurrent: false,
  },
  
];

export default function Roadmap() {
  const [waves, setWaves] = useState<Array<{top: number, left: number}>>([]);

  useEffect(() => {
    setWaves(
      [...Array(6)].map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100
      }))
    );
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Our Journey
          </h2>
          <p className="text-gray-600 text-lg">Building the future of cross-chain interactions</p>
        </motion.div>

        <div className="max-w-2xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-[24px] top-0 h-full w-1 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 rounded-full" />

          {roadmapSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative flex mb-16 last:mb-0"
            >
              {/* Timeline dot */}
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center z-10 shadow-lg ${
                  step.isCompleted
                    ? "bg-blue-500"
                    : step.isCurrent
                    ? "bg-blue-400"
                    : "bg-white border-2 border-blue-200"
                }`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="text-2xl">{step.emoji}</span>
              </motion.div>

              {/* Content */}
              <div className="ml-8 flex-1">
                <motion.div
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-blue-100"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-blue-900">
                    {step.title}
                    {step.isCompleted && (
                      <span className="text-green-500 text-sm bg-green-50 px-2 py-1 rounded-full">
                        Completed
                      </span>
                    )}
                    {step.isCurrent && (
                      <span className="text-blue-500 text-sm bg-blue-50 px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-700 mb-3">{step.description}</p>
                  <p className="text-sm text-gray-600">{step.details}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
