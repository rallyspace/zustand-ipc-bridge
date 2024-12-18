import { ipcMain, BrowserWindow } from "electron";

import { sanitize } from "./common";
import type { IpcMiddleware, IpcMiddlewareImpl } from "./types";

const emit = (state: any) => {
  BrowserWindow.getAllWindows().forEach((window) =>
    window.webContents?.send("ipc.zustand.subscribe", state)
  );
};

export const ipcMiddleware: IpcMiddlewareImpl =
  (storeCreator) => (set, get, api) => {
    ipcMain.handle("ipc.zustand.getState", () => sanitize(get()));
    ipcMain.on("ipc.zustand.setState", (e, state) => {
      set(state);
      emit(state);
    });
    // Don't want to emit the entire state, as that will cause objects that haven't actually changed to be considered new states by the renderers
    // api.subscribe((state: any) => emit(sanitize(state)));

    const ipcSet: typeof set = (val) => {
      const value = val instanceof Function ? val(get()) : val;
      set(value);
      emit(sanitize(value));
    };

    return storeCreator(ipcSet, get, api);
  };
