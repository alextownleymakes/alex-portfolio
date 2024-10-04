import { createSlice } from '@reduxjs/toolkit';

export interface KeyState {
  isThrusting: boolean;
  isBraking: boolean;
  isTurningLeft: boolean;
  isTurningRight: boolean;
}

const initialState: KeyState = {
  isThrusting: false,
  isBraking: false,
  isTurningLeft: false,
  isTurningRight: false,
};

const keyStateSlice = createSlice({
  name: 'keyState',
  initialState,
  reducers: {
    pressKey: (state, action) => {
      const { key } = action.payload;
      if (key === 'w') state.isThrusting = true;
      if (key === 's') state.isBraking = true;
      if (key === 'a') state.isTurningLeft = true;
      if (key === 'd') state.isTurningRight = true;
    },
    releaseKey: (state, action) => {
      const { key } = action.payload;
      if (key === 'w') state.isThrusting = false;
      if (key === 's') state.isBraking = false;
      if (key === 'a') state.isTurningLeft = false;
      if (key === 'd') state.isTurningRight = false;
    },
  },
});

export type KeyStateType = ReturnType<typeof keyStateSlice['reducer']>;

export const { pressKey, releaseKey } = keyStateSlice.actions;
export default keyStateSlice.reducer;
