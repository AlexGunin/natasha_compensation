export const deduplication = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Args extends any[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Callback extends (...args: Args) => Promise<any>,
>(
  callback: Callback,
) => {
  let promise: ReturnType<Callback> | null = null;

  return (...args: Args): ReturnType<Callback> => {
    if (promise) {
      return promise;
    }

    const internalPromise = callback(...args);

    // @ts-expect-error: Todo
    promise = internalPromise;

    // @ts-expect-error: Todo
    return internalPromise;
  };
};
