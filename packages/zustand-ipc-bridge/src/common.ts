export const sanitize = <T>(state: T): Partial<T> => {
  // TODO: recursive function removal
  const safeState: Partial<T> = {};

  for (const statePropName in state) {
    const stateProp = state[statePropName];
    if (typeof stateProp !== "function") {
      safeState[statePropName] = stateProp;
    }
  }

  return safeState;
};
