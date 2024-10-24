import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the interface for the state

export interface Key {
  key: string;
  pressed: boolean;
  action: string;
  drawerName?: string;
  toggle?: boolean;
}
export interface KeyState {
  isThrusting: Key;
  isRefacing: Key;
  isTurningLeft: Key;
  isTurningRight: Key;
  isBraking: Key;
  devDisplay: Key;
  flightData: Key;
  controls: Key;
  minimap: Key;
  bodySelector: Key;
}

const initialState: KeyState = {
  isThrusting: {
    key: 'w',
    pressed: false,
    action: 'thrust',
  },
  isRefacing: {
    key: 's',
    pressed: false,
    action: 'reverse orientation',
  },
  isTurningLeft: {
    key: 'a',
    pressed: false,
    action: 'rotate left',
  },
  isTurningRight: {
    key: 'd',
    pressed: false,
    action: 'rotate right',
  },
  isBraking: {
    key: 'x',
    pressed: false,
    action: 'stop',
  },
  devDisplay: {
    key: 'z',
    pressed: false,
    action: 'DEV  MODE',
    drawerName: 'devDisplay',
    toggle: true,
  },
  flightData: {
    key: 'f',
    pressed: false,
    action: 'HUD: flight data',
    drawerName: 'flightData',
    toggle: true,
  },
  controls: {
    key: 'k',
    pressed: false,
    action: 'HUD: controls',
    drawerName: 'controls',
    toggle: true,
  },
  minimap: {
    key: 'm',
    pressed: true,
    action: 'HUD: minimap',
    drawerName: 'miniMap',
    toggle: true,
  },
  bodySelector: {
    key: 'tab',
    pressed: false,
    action: 'HUD: body selector',
    drawerName: 'bodySelector',
  },
};

export const keyMap = {
  w: 'isThrusting',
  s: 'isRefacing',
  a: 'isTurningLeft',
  d: 'isTurningRight',
  x: 'isBraking',
  z: 'devDisplay',
  f: 'flightData',
  k: 'controls',
  m: 'minimap',
} as const;

export type KeyMapType = keyof typeof keyMap;
type KeyStateKeys = keyof KeyState;

const keyStateSlice = createSlice({
  name: 'keyState',
  initialState,
  reducers: {
    pressKey: (state, action: PayloadAction<{ key: KeyMapType }>) => {
      if (!keyMap[action.payload.key]) return;
      const stateKey = keyMap[action.payload.key] as KeyStateKeys;
      state[stateKey].pressed = true;
    },
    releaseKey: (state, action: PayloadAction<{ key: KeyMapType }>) => {
      if (!keyMap[action.payload.key]) return;
      const stateKey = keyMap[action.payload.key] as KeyStateKeys;
      state[stateKey].pressed = false;
    },
  },
});

export type KeyStateType = ReturnType<typeof keyStateSlice['reducer']>;
export type KeyofKeyStateType = keyof KeyStateType;

export const { pressKey, releaseKey } = keyStateSlice.actions;
export default keyStateSlice.reducer;
