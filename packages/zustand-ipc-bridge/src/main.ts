import { ipcMain, BrowserWindow } from "electron";

import { sanitize } from "./common";

const emit = (state: any) => {
  BrowserWindow.getAllWindows().forEach((window) =>
    window.webContents?.send("ipc.zustand.subscribe", state)
  );
};

export function ipcMiddleware(storeCreator: any) {
  return (set: any, get: any, api: any) => {
    ipcMain.handle("ipc.zustand.getState", () => sanitize(get()));
    ipcMain.on("ipc.zustand.setState", (e, state) => set(state));
    api.subscribe((state: any) => emit(sanitize(state)));
    return storeCreator(set, get, api);
  };
}
