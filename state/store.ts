import { configureStore } from '@reduxjs/toolkit';
import keyStateReducer from './keyStateSlice';
import gameStateReducer from './gameStateSlice';

const store = configureStore({
  reducer: {
    keyState: keyStateReducer,
    gameState: gameStateReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // Typing is automatically inferred here
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
