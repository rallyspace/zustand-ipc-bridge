import { create } from 'zustand'
import { ipcMiddleware } from 'zustand-ipc-bridge/renderer'

import { storeCreator } from './store'

export const createRendererStore = (bridge) => create(ipcMiddleware(storeCreator, bridge))
