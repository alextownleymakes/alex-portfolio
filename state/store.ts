import { configureStore } from '@reduxjs/toolkit';
import keyStateReducer from './keyStateSlice';
import gameStateReducer from './gameStateSlice';
import drawerStateReducer from './drawersStateSlice';
import playerStateReducer from './playerSlice';
import galaxyStateReducer from './galaxyStateSlice';

const store = configureStore({
  reducer: {
    keyState: keyStateReducer,
    gameState: gameStateReducer,
    drawers: drawerStateReducer,
    player: playerStateReducer,
    galaxy: galaxyStateReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // Typing is automatically inferred here
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
