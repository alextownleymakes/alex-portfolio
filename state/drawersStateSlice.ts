import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DrawerList = 'miniMap' | 'flightData' | 'systemMap' | 'systemInfo' | 'playerInfo' | 'gameMenu' | 'shipStats' | 'missionControl' | 'market' | 'shipyard' | 'inventory' | 'log' | 'chat' | 'settings' | 'controls' | 'devDisplay';

export type DrawerListObject = {[key: string]: DrawerList};

export const drawerList: DrawerListObject = {
    miniMap: 'miniMap',
    flightData: 'flightData',
    systemMap: 'systemMap',
    systemInfo: 'systemInfo',
    playerInfo: 'playerInfo',
    gameMenu: 'gameMenu',
    shipStats: 'shipStats',
    missionControl: 'missionControl',
    market: 'market',
    shipyard: 'shipyard',
    inventory: 'inventory',
    log: 'log',
    chat: 'chat',
    settings: 'settings',
    controls: 'controls',
    devDisplay: 'devDisplay',

}

export interface DrawerState {
    miniMap: boolean;
    flightData: boolean;
    systemMap: boolean;
    systemInfo: boolean;
    playerInfo: boolean;
    gameMenu: boolean;
    shipStats: boolean;
    missionControl: boolean;
    market: boolean;
    shipyard: boolean;
    inventory: boolean;
    log: boolean;
    chat: boolean;
    settings: boolean;
    controls: boolean;
    devDisplay: boolean;
};

const initialState: DrawerState = {
    miniMap: true,
    flightData: true,
    systemMap: false,
    systemInfo: false,
    playerInfo: false,
    gameMenu: false,
    shipStats: false,
    missionControl: false,
    market: false,
    shipyard: false,
    inventory: false,
    log: false,
    chat: false,
    settings: false,
    controls: false,
    devDisplay: false,
}

const drawerStateSlice = createSlice({
    name: 'drawerState',
    initialState,
    reducers: {
        open: (state, action: PayloadAction<{ drawer: DrawerList}>) => {
            const drawer = drawerList[action.payload.drawer];
            state[drawer] = true;
        },
        close: (state, action: PayloadAction<{ drawer: DrawerList}>) => {
            const drawer = drawerList[action.payload.drawer];
            state[drawer] = false;
        }
    }
});

export const { 
    open,
    close
} = drawerStateSlice.actions;
export default drawerStateSlice.reducer;
