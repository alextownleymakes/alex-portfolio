import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ratios } from '../utils/functions/zoom';
import { StellarBodyType } from '../utils/types/stellarBodies';

export interface Coords {
    x: number;
    y: number;
}

export interface Target {
    id: number | undefined;
    type: StellarBodyType | undefined;
}

export interface GameState {
    zoom: number;
    windowSize: Coords;
    universeSize: number;
    galaxySize: number;
    approachDistance: number;
    position: Coords;
    zoomedPosition: Coords;
    velocity: Coords;
    speed: number;
    rotation: number;
    dev: boolean;
    target: Target;
    orbiting: Target;
}

const initialState: GameState = {
    zoom: 0,
    position: { x: 0, y: 0 },
    windowSize: { x: 0, y: 0 },
    universeSize: 100000,
    galaxySize: 500,
    approachDistance: 200,
    zoomedPosition: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    speed: 0,
    rotation: 0,
    dev: false,
    target: { id: undefined, type: undefined },
    orbiting: { id: undefined, type: undefined }
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
        },
        setOrbit: (state, action: PayloadAction<Target>) => {
            state.orbiting = action.payload;
        },
        setWindowSize: (state, action: PayloadAction<Coords>) => {
            state.windowSize.x = action.payload.x;
            state.windowSize.y = action.payload.y;
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
    updateAll,
    setOrbit,
    setWindowSize
} = gameStateSlice.actions;
export default gameStateSlice.reducer;
