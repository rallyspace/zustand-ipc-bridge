export const ipcMiddleware = (storeCreator: any, bridge: any) => {
  return (set: any, get: any, api: any) => {
    const ipcSet = (val: any, ...args: any[]) => {
      const value = typeof val === "function" ? val(get()) : val;
      bridge.setState(value);
    };

    bridge.subscribe(set);
    bridge.getState().then(set);

    return storeCreator(ipcSet, get, api);
  };
};
