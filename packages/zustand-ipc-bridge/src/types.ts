import type { StateCreator, StoreMutatorIdentifier } from "zustand";

// https://zustand.docs.pmnd.rs/guides/typescript#middleware-that-doesn't-change-the-store-type
export type IpcMiddleware = <
  T extends object,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  stateCreator: StateCreator<T, Mps, Mcs>
) => StateCreator<T, Mps, Mcs>;

export type IpcMiddlewareImpl = <T>(
  f: StateCreator<T, [], []>
) => StateCreator<T, [], []>;

export type IpcBridge<T> = {
  setState(state: Partial<T>): void;
  getState(): Promise<T>;
  subscribe(cb: (state: Partial<T>) => void): () => void;
};

export type IpcMiddlewareBridge = <T>(
  f: StateCreator<T, [], []>,
  bridge: IpcBridge<T>
) => StateCreator<T, [], []>;
