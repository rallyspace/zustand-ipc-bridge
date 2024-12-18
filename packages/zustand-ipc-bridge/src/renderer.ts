import { sanitize } from "./common";
import type { IpcMiddlewareBridge } from "./types";

export const ipcMiddleware: IpcMiddlewareBridge = (storeCreator, bridge) => {
  return (set: any, get: any, api: any) => {
    const ipcSet = (val: any, ...args: any[]) => {
      const value = typeof val === "function" ? val(get()) : val;
      bridge.setState(sanitize(value));
    };

    bridge.subscribe(set);
    bridge.getState().then(set);

    return storeCreator(ipcSet, get, api);
  };
};
