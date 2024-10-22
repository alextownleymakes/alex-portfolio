import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ratios, ScalesType } from '../utils/functions/zoom';

export interface Coords {
    x: number;
    y: number;
}

export interface GameState {
    zoom: number;
    universeSize: number;
    galaxySize: number;
    approachDistance: number;
    position: Coords;
    zoomedPosition: Coords;
    velocity: Coords;
    speed: number;
    rotation: number;
    dev: boolean;
}

const initialState: GameState = {
    zoom: 0,
    position: { x: 0, y: 0 },
    universeSize: 100000,
    galaxySize: 500,
    approachDistance: 200,
    zoomedPosition: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    speed: 0,
    rotation: 0,
    dev: true,
};

const gameStateSlice = createSlice({
    name: 'gameState',
    initialState,
    reducers: {
        zoomIn: (state, action: PayloadAction<{ scale: number}>) => {
            state.zoom = action.payload.scale;
            state.zoomedPosition = {
                x: state.position.x * ratios[state.zoom],
                y: state.position.y * ratios[state.zoom],
            };
        },
        zoomOut: (state, action: PayloadAction<{ scale: number}>) => {
            state.zoom = action.payload.scale;
            state.zoomedPosition = {
                x: state.position.x * ratios[state.zoom],
                y: state.position.y * ratios[state.zoom],
            };
        },
        updatePosition: (state, action: PayloadAction<{ x: number; y: number }>) => {
            const zoomedPos = {
                x: action.payload.x * ratios[state.zoom],
                y: action.payload.y * ratios[state.zoom],
            }
            state.position = action.payload;
            state.zoomedPosition = zoomedPos;
        },
        updateVelocity: (state, action: PayloadAction<{ x: number; y: number }>) => {
            state.velocity = action.payload;
        },
        updateSpeed: (state, action: PayloadAction<number>) => {
            state.speed = action.payload;
        },
        updateRotation: (state, action: PayloadAction<number>) => {
            state.rotation = action.payload;
        },
        updateAll: (state, action: PayloadAction<Partial<GameState>>) => {
            Object.assign(state, action.payload); // This is fine if you are updating multiple fields.
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
