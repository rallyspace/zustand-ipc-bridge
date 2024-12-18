export const sanitize = (state: any) => {
  return JSON.parse(JSON.stringify(state));
  // TODO: recursive
  // const safeState: Record<string, unknown> = {};

  // for (const statePropName in state) {
  //   const stateProp = state[statePropName];
  //   if (typeof stateProp !== "function") {
  //     safeState[statePropName] = stateProp;
  //   }
  // }

  // return safeState;
};
