import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StellarBodyType } from '../utils/types/stellarTypes';

export interface Coords {
    x: number;
    y: number;
}

export type OrbitTypes = 'system' | 'star' | 'planet' | 'moon' | 'comet' | 'asteroidBelt' | 'asteroid';
export interface Target {
    name: string | undefined;
    type: OrbitTypes | undefined;
}

export const orbits: { [key in OrbitTypes]: OrbitTypes } = {
    system: 'system',
    star: 'star',
    planet: 'planet',
    moon: 'moon',
    comet: 'comet',
    asteroidBelt: 'asteroidBelt',
    asteroid: 'asteroid',
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
    comet: string;
    asteroidBelt: string;
    asteroid: string;
}

export interface GameState {
    zoom: number;
    scale: number;
    miniMapRatio: number;
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
    visibleSystems: StellarBodyType[] | undefined;
}

const initialState: GameState = {
    zoom: 0,
    scale: Math.pow(10, -2),
    miniMapRatio: Math.pow(10, -3),
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
        comet: '',
        asteroidBelt: '',
        asteroid: '',
    },
    orbits: {
        system: '',
        star: '',
        planet: '',
        moon: '',
        comet: '',
        asteroidBelt: '',
        asteroid: '',
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
        zoomIn: (state) => {
            state.zoom = state.zoom + 1;
            state.scale = Math.pow(10, state.zoom);
            state.zoomedPosition = {
                x: state.position.x * state.scale,
                y: state.position.y * state.scale,
            };
        },
        zoomOut: (state) => {
            if (state.zoom !== 0) {
                state.zoom = state.zoom - 1;
                state.scale = Math.pow(10, state.zoom);
                state.zoomedPosition = {
                    x: state.position.x * state.scale,
                    y: state.position.y * state.scale,
                };
            }
        },
        updatePosition: (state, action: PayloadAction<{ x: number; y: number }>) => {
            const zoomedPos = {
                x: action.payload.x * state.scale,
                y: action.payload.y * state.scale,
            };

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
        setVisibleSystems: (state, action: PayloadAction<StellarBodyType[] | undefined>) => {
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
