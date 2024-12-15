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
    ipcMain.on("ipc.zustand.setState", (e, state) => {
      set(state);
      emit(state);
    });
    // Don't want to emit the entire state, as that will cause objects that haven't actually changed to be considered new states by the renderers
    // api.subscribe((state: any) => emit(sanitize(state)));

    const ipcSet = (val: any) => {
      const value = typeof val === "function" ? val(get()) : val;
      set(value);
      emit(sanitize(value));
    };

    return storeCreator(ipcSet, get, api);
  };
}
