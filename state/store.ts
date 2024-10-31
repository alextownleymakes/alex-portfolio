import { configureStore } from '@reduxjs/toolkit';
import keyStateReducer from './keyStateSlice';
import gameStateReducer from './gameStateSlice';
import drawerStateReducer from './drawersStateSlice';
import playerStateReducer from './playerSlice';

const store = configureStore({
  reducer: {
    keyState: keyStateReducer,
    gameState: gameStateReducer,
    drawers: drawerStateReducer,
    player: playerStateReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // Typing is automatically inferred here
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
