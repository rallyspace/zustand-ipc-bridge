import { create } from 'zustand'

import { ipcMainMiddleware, ipcPreloadMiddleware } from 'zustand-ipc-bridge'

const storeCreator = (set) => ({
  value: 0,
  setValue: (value) => set({ value })
})

export const createMainStore = () => create(ipcMainMiddleware(storeCreator))
export const createPreloadStore = (bridge) => create(ipcPreloadMiddleware(storeCreator, bridge))
