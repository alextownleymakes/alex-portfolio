import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GameState {
    zoom: number;
    position: {
        x: number;
        y: number;
    };
    velocity: { x: number; y: number };
    speed: number;
    rotation: number;
}

const initialState: GameState = {
    zoom: 0,
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    speed: 0,
    rotation: 0,
};

const gameStateSlice = createSlice({
    name: 'gameState',
    initialState,
    reducers: {
        zoomIn: (state) => {
            state.zoom = Math.min(state.zoom + 1, 10);
        },
        zoomOut: (state) => {
            state.zoom = Math.max(state.zoom - 1, 0);
        },
        updatePosition: (state, action: PayloadAction<{ x: number; y: number }>) => {
            state.position.x = action.payload.x;
            state.position.y = action.payload.y;
        },
        updateVelocity: (state, action: PayloadAction<{ x: number; y: number }>) => {
            state.velocity.x = action.payload.x;
            state.velocity.y = action.payload.y;
        },
        updateSpeed: (state, action: PayloadAction<number>) => {
            state.speed = action.payload;
        },
        updateRotation: (state, action: PayloadAction<number>) => {
            state.rotation = action.payload;
        },
        updateAll: (state, action: PayloadAction<GameState>) => {
            return action.payload;
        }
    },
});

export const { 
    zoomIn, 
    zoomOut, 
    updatePosition,
    updateVelocity,
    updateSpeed,
    updateRotation,
    updateAll
} = gameStateSlice.actions;
export default gameStateSlice.reducer;
