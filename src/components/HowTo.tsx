'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import OctopusBackground from './OctopusBackground'
import FloatingElements from "./FloatingElement"

const Component = () => {
  return (
    <div className="relative min-h-screen bg-white/90 text-gray-900 p-6">
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
        
        <FloatingElements/>

        <section className="relative py-16 overflow-hidden bg-gradient-to-b from-white to-blue-50/30">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:32px_32px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80" />
          </div>
          
          <div className="container relative z-10 mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-4">
                How Tonify Bridge Works
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                First-ever zkSync integration for TON blockchain - Bridge your tokens securely with zero-knowledge proofs
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative group">
                <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative">
                  <img
                    src="/images/image-1.png"
                    alt="Cross-chain bridge illustration"
                    width={600}
                    height={600}
                    className="rounded-2xl w-full shadow-xl hover:shadow-2xl transition-shadow duration-300"
                  />
                  <Card className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-6 rounded-xl border border-blue-100/50 shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-blue-100">
                        <AvatarImage src="/ton-logo.svg" alt="TON" />
                        <AvatarFallback>TON</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-blue-900">Tonify Bridge</h3>
                        <p className="text-blue-600">Powered by zkSync</p>
                      </div>
                      <div className="text-right">
                        <div className="text-blue-900 font-semibold">Multi-Chain</div>
                        <div className="text-blue-600">Zero-Knowledge</div>
                      </div>
                    </div>
                    <Button  onClick={() => window.location.href = '/app'}  className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-300">
                      Start Bridging
                    </Button>
                  </Card>
                </div>
              </div>

              <div className="space-y-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="connect" className="border-b border-blue-100">
                    <AccordionTrigger className="hover:no-underline group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-200 transition-colors">
                          1
                        </div>
                        <span className="text-xl font-semibold text-blue-900 group-hover:text-blue-700">Connect Your Wallet</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-blue-700 pl-[52px]">
                      Connect your TON wallet and choose your destination chain to start using our zkSync-powered bridge.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="select" className="border-b border-blue-100">
                    <AccordionTrigger className="hover:no-underline group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-200 transition-colors">
                          2
                        </div>
                        <span className="text-xl font-semibold text-blue-900 group-hover:text-blue-700">Select Token & Amount</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-blue-700 pl-[52px]">
                      Choose the token and amount you want to bridge. Our zkSync integration ensures secure and efficient transfers.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="bridge" className="border-b border-blue-100">
                    <AccordionTrigger className="hover:no-underline group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-200 transition-colors">
                          3
                        </div>
                        <span className="text-xl font-semibold text-blue-900 group-hover:text-blue-700">Confirm & Bridge</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-blue-700 pl-[52px]">
                      Review the transaction details and confirm. zkSync's zero-knowledge proofs ensure your transfer is secure and fast.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="track" className="border-b border-blue-100">
                    <AccordionTrigger className="hover:no-underline group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-200 transition-colors">
                          4
                        </div>
                        <span className="text-xl font-semibold text-blue-900 group-hover:text-blue-700">Track Progress</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-blue-700 pl-[52px]">
                      Monitor your bridge transaction in real-time. Thanks to zkSync, transfers are processed quickly with minimal fees.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </section>

       
      </div>
    </div>
  )
}

export default Component