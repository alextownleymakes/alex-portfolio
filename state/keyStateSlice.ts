import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the interface for the state
export interface KeyState {
  isThrusting: boolean;
  isRefacing: boolean;
  isTurningLeft: boolean;
  isTurningRight: boolean;
  isBraking: boolean;
  devToggle: boolean;
}

const initialState: KeyState = {
  isThrusting: false,
  isRefacing: false,
  isTurningLeft: false,
  isTurningRight: false,
  isBraking: false,
  devToggle: false,
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
      const stateKey = keyMap[action.payload.key] as KeyStateKeys;
      state[stateKey] = true;
    },
    releaseKey: (state, action: PayloadAction<{ key: KeyMapType }>) => {
      const stateKey = keyMap[action.payload.key] as KeyStateKeys;
      state[stateKey] = false;
    },
  },
});

export type KeyStateType = ReturnType<typeof keyStateSlice['reducer']>;

export const { pressKey, releaseKey } = keyStateSlice.actions;
export default keyStateSlice.reducer;
