'use client'

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

const OctopusBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    controls.start({
      x: mousePosition.x - 50, // Center the octopus on cursor
      y: mousePosition.y - 60,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 200
      }
    });
  }, [mousePosition, controls]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 50 }}>
      <motion.div
        className="octopus"
        animate={controls}
        initial={{ x: 0, y: 0 }}
      >
        <div className="head">
          {/* Eyes */}
          <div className="eyes">
            <div className="eye left"></div>
            <div className="eye right"></div>
          </div>
          {/* TON Logo */}
          <div className="ton-logo">TON</div>
        </div>
        {[...Array(8)].map((_, tentacleIndex) => (
          <div
            key={tentacleIndex}
            className="tentacle"
            style={{
              transform: `rotate(${tentacleIndex * 45}deg)`,
              animationDelay: `${tentacleIndex * 0.1}s`,
            }}
          />
        ))}
      </motion.div>

      <style>{`
        .octopus {
          position: absolute;
          width: 100px;
          height: 120px;
          will-change: transform;
        }

        .head {
          width: 100px;
          height: 100px;
          background: #3b82f6;
          border-radius: 50% 50% 45% 45%;
          position: relative;
          box-shadow: 0 0 30px #3b82f6;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .eyes {
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 70px;
          display: flex;
          justify-content: space-between;
          z-index: 2;
        }

        .eye {
          width: 18px;
          height: 18px;
          background: white;
          border-radius: 50%;
          position: relative;
        }

        .eye::after {
          content: '';
          position: absolute;
          width: 8px;
          height: 8px;
          background: black;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: blink 3s infinite;
        }

        .ton-logo {
          position: absolute;
          top: 60%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-weight: bold;
          font-size: 18px;
          text-shadow: 0 0 10px rgba(255,255,255,0.5);
          z-index: 1;
        }

        .tentacle {
          position: absolute;
          top: 75px;
          left: 50%;
          width: 15px;
          height: 60px;
          background: #3b82f6;
          border-radius: 50px;
          transform-origin: top center;
          animation: wiggle 2s ease-in-out infinite;
          box-shadow: 0 0 15px #3b82f6;
        }

        @keyframes wiggle {
          0%, 100% {
            transform: rotate(0deg) scaleY(1);
          }
          50% {
            transform: rotate(15deg) scaleY(0.9);
          }
        }

        @keyframes blink {
          0%, 90%, 100% {
            transform: translate(-50%, -50%) scale(1);
          }
          95% {
            transform: translate(-50%, -50%) scale(0.1);
          }
        }

        .tentacle:nth-child(odd) {
          animation-delay: 0.5s;
        }

        .tentacle:before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: inherit;
          border-radius: inherit;
          transform-origin: top center;
          animation: suction 1.5s ease-in-out infinite;
          box-shadow: inherit;
        }

        @keyframes suction {
          0%, 100% {
            transform: scaleX(1);
          }
          50% {
            transform: scaleX(1.2);
          }
        }
      `}</style>
    </div>
  );
};

export default OctopusBackground;
