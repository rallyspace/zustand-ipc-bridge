export const sanitize = (state: any) => {
  // TODO: recursive function removal
  const safeState: Record<string, unknown> = {};

  for (const statePropName in state) {
    const stateProp = state[statePropName];
    if (typeof stateProp !== "function") {
      safeState[statePropName] = stateProp;
    }
  }

  return safeState;
};
