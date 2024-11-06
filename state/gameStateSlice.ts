import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ratios } from '../utils/functions/zoom';
import { StellarBodyType, StarSystem as SystemType } from '../utils/types/stellarBodies';
import { StarSystemType } from '../utils/types/stellarTypes';

export interface Coords {
    x: number;
    y: number;
}

export interface Target {
    name: string | undefined;
    type: StellarBodyType | undefined;
}
export type OrbitTypes = 'system' | 'star' | 'planet' | 'moon';

export const orbits: { [key in OrbitTypes]: OrbitTypes } = {
    system: 'system',
    star: 'star',
    planet: 'planet',
    moon: 'moon',
};

export interface Orbit {
    name: string;
    type: OrbitTypes;
}

export interface Orbits {
    system: string;
    star: string;
    planet: string;
    moon: string;
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
    target: Orbits;
    orbits: Orbits;
    lowestOrbit: Target;
    visibleSystems: StarSystemType[] | undefined;
}

const initialState: GameState = {
    zoom: 0,
    position: { x: 0, y: 0 },
    windowSize: { x: 0, y: 0 },
    universeSize: 1000000,
    galaxySize: 500,
    approachDistance: 200,
    zoomedPosition: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    speed: 0,
    rotation: 0,
    dev: false,
    target: {
        system: '',
        star: '',
        planet: '',
        moon: '',
    },
    orbits: {
        system: '',
        star: '',
        planet: '',
        moon: '',
    },
    lowestOrbit: {
        name: undefined,
        type: undefined,
    },
    visibleSystems: undefined,
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
        setOrbit: (state, action: PayloadAction<Orbit>) => {
            const { name, type } = action.payload;
            state.orbits[type] = name;
        },
        setLowestOrbit: (state, action: PayloadAction<Target>) => {
            state.lowestOrbit = action.payload;
        },
        setTarget: (state, action: PayloadAction<Orbits>) => {
            state.target = action.payload;
        },
        setVisibleSystems: (state, action: PayloadAction<StarSystemType[] | undefined>) => {
            state.visibleSystems = action.payload;
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
    setLowestOrbit,
    setVisibleSystems,
    setWindowSize
} = gameStateSlice.actions;
export default gameStateSlice.reducer;
