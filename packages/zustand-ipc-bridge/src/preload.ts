import { ipcRenderer } from "electron";

export const createZustandBridge = () => ({
  setState: (state: any) => ipcRenderer.send("ipc.zustand.setState", state),
  getState: () => ipcRenderer.invoke("ipc.zustand.getState"),
  subscribe: (cb: any) => {
    const callback = (_: any, state: any) => cb(state);
    ipcRenderer.on("ipc.zustand.subscribe", callback);
    return () => ipcRenderer.off("ipc.zustand.subscribe", callback);
  },
});
