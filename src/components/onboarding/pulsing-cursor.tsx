import React from 'react';
import { motion } from 'framer-motion';

interface PulsingCursorProps {
  position: {
    top: number;
    left: number;
  };
}

export const PulsingCursor: React.FC<PulsingCursorProps> = ({ position }) => {
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: position.top - 12,
        left: position.left - 12,
        pointerEvents: 'none',
        zIndex: 10001,
      }}
    >
      {/* Основной курсор */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          backgroundColor: '#339af0',
          position: 'relative',
          boxShadow: '0 0 8px rgba(51, 154, 240, 0.4)',
        }}
      />
      
      {/* Пульсирующие кольца - исправленная версия */}
      {[0, 1, 2].map((ring) => (
        <motion.div
          key={ring}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.5, 2.5],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: ring * 0.8,
            ease: 'easeOut',
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 24,
            height: 24,
            borderRadius: '50%',
            border: '2px solid #339af0',
            transformOrigin: 'center',
          }}
        />
      ))}
      
      {/* Эффект клика */}
      <motion.div
        animate={{
          scale: [0, 1.5],
          opacity: [1, 0],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          repeatDelay: 1.4,
          ease: 'easeOut',
        }}
        style={{
          position: 'absolute',
          top: -6,
          left: -6,
          width: 36,
          height: 36,
          borderRadius: '50%',
          backgroundColor: 'rgba(51, 154, 240, 0.3)',
          transformOrigin: 'center',
        }}
      />
    </motion.div>
  );
}; 