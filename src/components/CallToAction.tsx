"use client";
import { Button } from "@/components/ui/button";
import StarsImage from '../assets/stars.png' 
import GridLines from '../assets/grid-lines.png'
import OctopusBackground from './OctopusBackground'
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import useRelativeMousePosition from "@/hooks/useRelativeMousePosition";


export default function CallToAction() {
  const sectionRef = useRef<HTMLElement>(null);
  const borderedDivRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundPositionY = useTransform(
    scrollYProgress,
    [0, 1],
    [-300, 300],
  );

  const [mouseX, mouseY] = useRelativeMousePosition(borderedDivRef);
  const maskImage = useMotionTemplate`radial-gradient(50% 50% at ${mouseX}px ${mouseY}px, black, transparent)`;

  const style = {
    starsContainer: {
      backgroundImage: `url(${StarsImage})`,
      backgroundPositionX: 0,
    },
    gridContainer: {
      backgroundImage: `url(${GridLines})`,
    }
  }

  return (
    <section ref={sectionRef}  className="relative py-20 md:py-24 overflow-hidden">
      <OctopusBackground />
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(255,255,255,0)_40%,rgba(59,130,246,0.1)_50%,rgba(255,255,255,0)_60%)]"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container relative z-10">
        <motion.div
          ref={borderedDivRef}
          animate={{
            backgroundPositionX: StarsImage.width,
          }}
          transition={{
            repeat: Infinity,
            duration: 60,
            ease: "linear",
          }}
          style={{
            backgroundPositionY,
            backgroundImage: `url(${StarsImage.src})`,
          }}
          className="relative py-24 border border-white/10 rounded-xl overflow-hidden group bg-black/80 backdrop-blur-sm"
        >
          <div
            className="absolute inset-0 bg-[rgb(124,58,237)] bg-blend-overlay [mask-image:radial-gradient(50%_50%_at_50%_35%,black,transparent)] group-hover:opacity-0 transition duration-700"
            style={{
              backgroundImage: `url(${GridLines.src})`,
            }}
          ></div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500 bg-blend-overlay opacity-0 group-hover:opacity-100 transition duration-700"
            style={{
              maskImage,
              backgroundImage: `url(${GridLines.src})`,
            }}
          ></motion.div>
          <div className="relative">
            <h2 className="text-5xl md:text-6xl text-center font-medium tracking-tighter max-w-sm mx-auto bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
              Bridge with Zero-Knowledge Power.
            </h2>
            <p className="text-lg md:text-xl text-center text-purple-100/70 tracking-tight px-5 mt-5 max-w-xs mx-auto">
              First-ever zkSync integration for TON blockchain. Experience secure, instant transfers.
            </p>
            <div className="flex justify-center mt-8">
              <Button  onClick={() => window.location.href = '/app'}  className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600">
                Try Tonify Bridge
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};