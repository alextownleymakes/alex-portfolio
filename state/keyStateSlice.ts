import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the interface for the state

export interface Key {
  key: string;
  pressed: boolean;
  action: string;
}
export interface KeyState {
  isThrusting: Key;
  isRefacing: Key;
  isTurningLeft: Key;
  isTurningRight: Key;
  isBraking: Key;
  devToggle: Key;
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
  devToggle: {
    key: 'z',
    pressed: false,
    action: 'dev toggle',
  }
};

const keyMap = {
  w: 'isThrusting',
  s: 'isRefacing',
  a: 'isTurningLeft',
  d: 'isTurningRight',
  x: 'isBraking',
  z: 'devToggle',
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

export const { pressKey, releaseKey } = keyStateSlice.actions;
export default keyStateSlice.reducer;
