import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StellarBodyType, StarSystem as SystemType } from '../utils/types/stellarBodies';

export interface Target {
    name: string | undefined;
    type: StellarBodyType | undefined;
}

export interface PlayerMissionReward {
    id: number;
    type: string;
    description?: string;
    item?: number;
    amount: number;
}

export interface PlayerMissionStage {
    id: number;
    description: string;
    target: Target;
    started: boolean;
    completed: boolean;
    failed: boolean;
    reward: PlayerMissionReward[];
    firstStage?: boolean;
    lastStage?: boolean;
}

export interface PlayerMission {
    id: number;
    name: string;
    description: string;
    started: boolean;
    completed: boolean;
    failed: boolean;
    origin: Target;
    reward: PlayerMissionReward[];
    stage: PlayerMissionStage[];
}

export interface PlayerSpecialResource {
    id: number;
    description: string;
    itemId: number;
}

export interface PlayerResource {
    id: number;
    type: string;
    amount: number;
    special?: PlayerSpecialResource[];
}

export interface PlayerState {
    name: string;
    shipName: string;
    missions: PlayerMission[];
    currentMission: number | undefined;
    currentMissionStage: number | undefined;
    resources: PlayerResource[];
}

const mission_1: PlayerMission = {
    id: 1,
    name: `Alex's Resume`,
    description: 'Collect the resume from Venus.',
    started: false,
    completed: false,
    failed: false,
    reward: [{
        id: 1,
        type: 'credits',
        amount: 1000
    }, {
        id: 0,
        type: 'special',
        amount: 1,
        description: 'Alex\'s Resume',
        item: 0
    }],
    origin: {
        name: 'Moon',
        type: 'moon'
    },
    stage: [{
        id: 0,
        description: 'Collect the resume from Venus.',
        target: {
            name: 'Venus',
            type: 'planet'
        },
        started: false,
        completed: false,
        failed: false,
        reward: [{
            id: 1,
            type: 'credits',
            amount: 1000
        }, {
            id: 0,
            type: 'special',
            amount: 1,
            description: 'Alex\'s Resume',
            item: 0
        }],
        firstStage: true
    },
    {
        id: 0,
        description: 'Deliver the resume to Earth.',
        target: {
            name: 'Earth',
            type: 'planet'
        },
        started: false,
        completed: false,
        failed: false,
        reward: [{
            id: 1,
            type: 'credits',
            amount: 1000
        }, {
            id: 0,
            type: 'special',
            amount: 1,
            description: 'Alex\'s Contact',
            item: 1
        }],
        lastStage: true
    }]
};

const missions: PlayerMission[] = [
    mission_1
]

const initialState: PlayerState = {
    name: 'Player',
    shipName: 'Ship',
    missions,
    resources: [
        {
            id: 0,
            type: 'special',
            amount: 0,
            special: [],
        },
        {
            id: 1,
            type: 'credits',
            amount: 0
        }
    ],
    currentMission: undefined,
    currentMissionStage: undefined
};

interface MissionProgressPayload {
    mission: number;
    currentStage: number;
    nextStage: number;
}

const playerStateSlice = createSlice({
    name: 'gameState',
    initialState,
    reducers: {
        missionStart: (state, action: PayloadAction<number>) => {
            state.currentMission = action.payload;
            state.currentMissionStage = 0;
            state.missions[action.payload].started = true;
            state.missions[action.payload].stage[0].started = true;
        },
        missionProgress: (state, action: PayloadAction<MissionProgressPayload>) => {
            const { mission, currentStage, nextStage } = action.payload;
            const reward = state.missions[mission].stage[currentStage].reward;
            state.missions[mission].stage[currentStage].completed = true;
            if (state.missions[mission].stage[nextStage].lastStage) {
                state.missions[mission].completed = true;
                state.missions[mission].stage[nextStage].completed = true;
                state.currentMission = undefined;
                state.currentMissionStage = undefined;
                reward.forEach(r => {
                    state.resources[0].special?.push({
                        id: r.id,
                        description: r.description || '',
                        itemId: r.item || 0
                    });
                    state.resources[r.id].amount += r.amount;
                });
            } else {
                state.missions[mission].stage[nextStage].started = true;
                state.currentMissionStage = nextStage;
            }
        },
        missionComplete: (state, action: PayloadAction<number>) => {
            state.missions[action.payload].completed = true;
        },
        // missionReward: (state, action: PayloadAction<number>) => {
        //     state.missions[action.payload].reward.amount;
        // },
        missionFail: (state, action: PayloadAction<number>) => {
            state.missions[action.payload].failed = true;
        }

    },
});

export const { 
    missionStart,
    // missionProgress,
    missionComplete,
    // missionReward,
    missionFail
} = playerStateSlice.actions;
export default playerStateSlice.reducer;
