import React from 'react';
import { motion } from 'framer-motion';

interface BreathingHighlightProps {
  position: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  color?: string;
}

export const BreathingHighlight: React.FC<BreathingHighlightProps> = ({ 
  position, 
  color = '#339af0' 
}) => {
  return (
    <motion.div
      initial={{
        top: position.top - 10,
        left: position.left - 10,
        width: position.width + 20,
        height: position.height + 20,
        opacity: 0,
      }}
      animate={{
        top: position.top - 10,
        left: position.left - 10,
        width: position.width + 20,
        height: position.height + 20,
        opacity: 1,
      }}
      transition={{ 
        duration: 0.6, 
        ease: 'easeInOut',
        type: 'spring',
        stiffness: 100,
        damping: 20
      }}
      style={{
        position: 'absolute',
        borderRadius: '12px',
        pointerEvents: 'none',
        zIndex: 9998,
      }}
    >
      {/* Основная подсветка */}
      <motion.div
        animate={{
          boxShadow: [
            `0 0 15px ${color}30`,
            `0 0 25px ${color}50`,
            `0 0 15px ${color}30`,
          ],
          scale: [1, 1.01, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          width: '100%',
          height: '100%',
          border: `2px solid ${color}`,
          borderRadius: '12px',
          backgroundColor: 'transparent',
        }}
      />
      
      {/* Внешнее свечение */}
      <motion.div
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: -8,
          left: -8,
          right: -8,
          bottom: -8,
          borderRadius: '16px',
          background: `radial-gradient(ellipse at center, ${color}15, transparent 70%)`,
          filter: 'blur(6px)',
        }}
      />
    </motion.div>
  );
}; 