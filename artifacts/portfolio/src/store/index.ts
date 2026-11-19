import { useSyncExternalStore } from "react";

export type Tier = "full" | "lite" | "static";
export type Preset = "vermilion" | "lime" | "ultraviolet";

export type SubsystemId =
  | "pcb"
  | "power"
  | "tower"
  | "chassis"
  | "wheels"
  | "imu"
  | "antenna"
  | "ir"
  | "screen"
  | "pendulum"
  | null;

export type SkillGroupId =
  | "embedded"
  | "protocols"
  | "control"
  | "robotics"
  | "software"
  | "cad"
  | null;

export interface AppState {
  scroll: number; // 0 to 1 overall scroll progress
  activeSubsystem: SubsystemId;
  hoveredSkillGroup: SkillGroupId;
  tier: Tier;
  preset: Preset;
  isDark: boolean;
  debug: boolean;
  robotAssemblyProgress: number; // 0 to 1
  robotBalanceImpulse: number; // For push / recover in contact section
  formSuccessCount: number; // Trigger robot nod
}

const defaultState: AppState = {
  scroll: 0,
  activeSubsystem: null,
  hoveredSkillGroup: null,
  tier: "full",
  preset: "vermilion",
  isDark: true,
  debug: false,
  robotAssemblyProgress: 0,
  robotBalanceImpulse: 0,
  formSuccessCount: 0,
};

let currentState: AppState = { ...defaultState };
const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

export const store = {
  getSnapshot(): AppState {
    return currentState;
  },

  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  setState(partial: Partial<AppState>) {
    currentState = { ...currentState, ...partial };
    emitChange();
  },

  getState(): AppState {
    return currentState;
  },
};

export function useAppState<T>(selector: (state: AppState) => T): T {
  return useSyncExternalStore(
    store.subscribe,
    () => selector(store.getSnapshot()),
    () => selector(defaultState)
  );
}
