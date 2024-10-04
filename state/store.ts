// store.ts
import { configureStore } from '@reduxjs/toolkit';
import keyStateReducer from './keyStateSlice';
import gameStateReducer from './gameStateSlice';

const store = configureStore({
  reducer: {
    keyState: keyStateReducer, // Add your slice here
    gameState: gameStateReducer, // Add your slice here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
