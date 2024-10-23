import { configureStore } from '@reduxjs/toolkit';
import keyStateReducer from './keyStateSlice';
import gameStateReducer from './gameStateSlice';
import drawerStateReducer from './drawersStateSlice';

const store = configureStore({
  reducer: {
    keyState: keyStateReducer,
    gameState: gameStateReducer,
    drawers: drawerStateReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // Typing is automatically inferred here
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
