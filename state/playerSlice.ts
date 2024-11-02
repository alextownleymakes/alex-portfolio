import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StellarBodyType, StarSystem as SystemType } from '../utils/types/stellarBodies';

export interface Target {
    name: string | undefined;
    type: StellarBodyType | undefined;
}

export interface PlayerMissionReward {
    type: string;
    amount: number;
}

export interface PlayerMission {
    id: number;
    name: string;
    description: string;
    reward: PlayerMissionReward;
    started: boolean;
    stage: number;
    completed: boolean;
    origin: Target;
    failed: boolean;
    target: Target;
}

export interface PlayerState {
    name: string;
    shipName: string;
    missions: PlayerMission[];
    currentMission: number | undefined;
}

const initialState: PlayerState = {
    name: 'Player',
    shipName: 'Ship',
    missions: [
        {
            id: 1,
            name: `Alex's Portfolio`,
            description: 'Collect the portfolio from the Earth.',
            reward: {
                type: 'credits',
                amount: 1000
            },
            completed: false,
            origin: {
                name: 'Moon',
                type: 'moon'
            },
            target: {
                name: 'Earth',
                type: 'planet'
            },
            started: false,
            stage: 0,
            failed: false
        },
    ],
    currentMission: undefined
};

const playerStateSlice = createSlice({
    name: 'gameState',
    initialState,
    reducers: {
        missionAppear: (state, action: PayloadAction<number>) => {
            state.currentMission = action.payload;
        },
        missionStart: (state, action: PayloadAction<number>) => {
            state.missions[action.payload].started = true;
        },
        missionProgress: (state, action: PayloadAction<number>) => {
            state.missions[action.payload].stage += 1;
        },
        missionComplete: (state, action: PayloadAction<number>) => {
            state.missions[action.payload].completed = true;
        },
        missionReward: (state, action: PayloadAction<number>) => {
            state.missions[action.payload].reward.amount;
        },
        missionFail: (state, action: PayloadAction<number>) => {
            state.missions[action.payload].failed = true;
        }

    },
});

export const { 
    missionAppear,
    missionStart,
    missionProgress,
    missionComplete,
    missionReward,
    missionFail
} = playerStateSlice.actions;
export default playerStateSlice.reducer;
