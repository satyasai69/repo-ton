import { Shield, Zap, Lock, Coins } from "lucide-react"
import { Card } from "./ui/card"

export function ZkFeatures() {
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "Zero-Knowledge Security",
      description: "Advanced cryptographic proofs ensure your transactions are private and secure"
    },
    {
      icon: <Zap className="w-8 h-8 text-purple-500" />,
      title: "Lightning Fast",
      description: "zkSync's rollup technology enables near-instant cross-chain transfers"
    },
    {
      icon: <Lock className="w-8 h-8 text-indigo-500" />,
      title: "Privacy First",
      description: "Your transaction details are protected by zero-knowledge proofs"
    },
    {
      icon: <Coins className="w-8 h-8 text-blue-400" />,
      title: "Low Fees",
      description: "Benefit from zkSync's efficient scaling solution with minimal gas fees"
    }
  ]

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Powered by zkSync Technology
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Experience the next generation of cross-chain bridging
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
