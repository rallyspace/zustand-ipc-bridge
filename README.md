# zustand-ipc-bridge

Middleware to bridge zustand stores between isolated Electron contexts.

## Demo

[![Fiddle Button]][Fiddle Link]

[Fiddle Link]: https://fiddle.electronjs.org/launch?target=gist/c5405a425ae4050cfd0f3e2e5cf7b5ad
[Fiddle Button]: https://img.shields.io/badge/Open%20Electron%20Fiddle-ffb662?style=for-the-badge&color=ffb662

## Usage

```bash
npm install zustand-ipc-bridge
```

### Main

```ts
import { create } from "zustand";
import { ipcMiddleware } from "zustand-ipc-bridge/main";

const mainStore = createStore(ipcMiddleware(storeCreator));
```

### Preload

```ts
import { contextBridge } from "electron";
import { createZustandBridge } from "zustand-ipc-bridge/preload";

contextBridge.exposeInMainWorld("zustandBridge", createZustandBridge());
```

### Renderer

```ts
import { create } from "zustand";
import { ipcMiddleware } from "zustand-ipc-bridge/renderer";

const store = create(ipcMiddleware(storeCreator, zustandBridge));
```

## Roadmap

- [ ] Support more than 1 store. Bridged events are not scoped to a specific store, so only 1 store can be bridged right now.
- [ ] Typing. Everything is typed as `any` right now.
