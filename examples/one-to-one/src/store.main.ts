import { create } from 'zustand'
import { ipcMiddleware } from 'zustand-ipc-bridge/main'

import { storeCreator } from './store'

export const createMainStore = () => create(ipcMiddleware(storeCreator))
export const mainStore = createMainStore()
