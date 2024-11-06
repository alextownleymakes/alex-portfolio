import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StellarBodyType, StarSystem as SystemType } from '../utils/types/stellarBodies';
import { StarSystemType } from '../utils/types/stellarTypes';

interface GalaxyState {
    systems: StarSystemType[];
}

const initialState: GalaxyState = {
    systems: []
};

const galaxyStateSlice = createSlice({
    name: 'galaxyState',
    initialState,
    reducers: {
        setGalaxy(state, action: PayloadAction<StarSystemType[]>) {
            state.systems = action.payload;
        }
    },
});

export const { 
    setGalaxy
} = galaxyStateSlice.actions;

export default galaxyStateSlice.reducer;