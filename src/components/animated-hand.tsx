import { motion } from "framer-motion";
import { Hand } from "lucide-react";

interface AnimatedHandProps {
  position: { 
    top: number; 
    left: number; 
  };
  action?: 'click' | 'point' | 'swipe';
}

export const AnimatedHand = ({ position, action = 'click' }: AnimatedHandProps) => {
  const getAnimation = () => {
    switch (action) {
      case 'click':
        return {
          animate: {
            scale: [1, 1.2, 1],
            rotate: [0, -10, 0],
            y: [0, -5, 0],
          },
          transition: {
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 0.5,
            ease: 'easeInOut',
          }
        };
      case 'point':
        return {
          animate: {
            x: [0, 10, 0],
            y: [0, -10, 0],
          },
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }
        };
      case 'swipe':
        return {
          animate: {
            x: [0, 30, 0],
            opacity: [1, 0.7, 1],
          },
          transition: {
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }
        };
      default:
        return {};
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        ...getAnimation().animate 
      }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
        ...getAnimation().transition
      }}
      style={{
        position: 'absolute',
        top: position.top - 24,
        left: position.left - 24,
        zIndex: 10002,
        pointerEvents: 'none',
        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
      }}
    >
      <Hand size={48} color="#339af0" />
    </motion.div>
  );
};