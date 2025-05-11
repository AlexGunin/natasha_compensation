import { PropsWithChildren, ReactElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CSSProperties } from "@mantine/core";

type SwapAnimation = "fade" | "slide" | "scale";

interface SwapProps extends PropsWithChildren {
  first: ReactElement;
  second: ReactElement;
  isActiveFirst: boolean;
  // value: string | number;
  animation?: SwapAnimation;
  duration?: number;
  styles?: { first?: CSSProperties; second?: CSSProperties };
}

const animations = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
};

interface SwapItemProps extends PropsWithChildren {
  value: string | number;
  style?: CSSProperties;
  className?: string;
  animation?: SwapAnimation;
  duration?: number;
}

const SwapItem = (props: SwapItemProps) => {
  const animation = props.animation ?? "fade";
  const duration = props.duration ?? 400;

  return (
    <motion.div
      key={props.value}
      initial={animations[animation].initial}
      animate={animations[animation].animate}
      exit={animations[animation].exit}
      transition={{ duration }}
      style={{ position: "relative", ...props?.style }}
      className={props.className}
    >
      {props.children}
    </motion.div>
  );
};

export const Swap = ({
  // value,
  // children,
  isActiveFirst,
  first,
  second,
  animation = "fade",
  duration = 0.3,
  styles = {},
}: SwapProps) => {
  return (
    <AnimatePresence mode="popLayout">
      {/* {Children.map(children, (child) => {
        // Проверяем, что это валидный React-элемент и у него есть value
        console.log("CHILD", child);
        if (
          isValidElement(child) &&
          child.type === SwapItem &&
          child.props.value === value
        ) {
          return child;
        }
        return null;
      })} */}
      {isActiveFirst ? (
        <motion.div
          key="first"
          initial={animations[animation].initial}
          animate={animations[animation].animate}
          exit={animations[animation].exit}
          transition={{ duration: duration }}
          style={{ position: "relative", ...styles.first }}
        >
          {first}
        </motion.div>
      ) : (
        <motion.div
          key="second"
          initial={animations[animation].initial}
          animate={animations[animation].animate}
          exit={animations[animation].exit}
          transition={{ duration: duration }}
          style={{ position: "relative", ...styles.second }}
        >
          {second}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Swap.Item = SwapItem;
