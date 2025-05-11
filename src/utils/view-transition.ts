import { flushSync } from "react-dom";

export const viewTransition = (cb: VoidFunction) => {
  if (!document.startViewTransition) {
    return cb();
  }

  document.startViewTransition(() => {
    flushSync(() => {
      cb();
    });
  });
};
