import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DrawerList = 'miniMap' | 'systemMap' | 'systemInfo' | 'playerInfo' | 'gameMenu' | 'shipStats' | 'missonBoard' | 'market' | 'shipyard' | 'inventory' | 'log' | 'chat' | 'settings' | 'controls';

export type DrawerListObject = {[key: string]: DrawerList};

const drawerList: DrawerListObject = {
    miniMap: 'miniMap',
    systemMap: 'systemMap',
    systemInfo: 'systemInfo',
    playerInfo: 'playerInfo',
    gameMenu: 'gameMenu',
    shipStats: 'shipStats',
    missonBoard: 'missonBoard',
    market: 'market',
    shipyard: 'shipyard',
    inventory: 'inventory',
    log: 'log',
    chat: 'chat',
    settings: 'settings',
    controls: 'controls',
}

export interface DrawerState {
    miniMap: boolean;
    systemMap: boolean;
    systemInfo: boolean;
    playerInfo: boolean;
    gameMenu: boolean;
    shipStats: boolean;
    missonBoard: boolean;
    market: boolean;
    shipyard: boolean;
    inventory: boolean;
    log: boolean;
    chat: boolean;
    settings: boolean;
    controls: boolean;
}

const initialState: DrawerState = {
    miniMap: true,
    systemMap: false,
    systemInfo: false,
    playerInfo: false,
    gameMenu: false,
    shipStats: false,
    missonBoard: false,
    market: false,
    shipyard: false,
    inventory: false,
    log: false,
    chat: false,
    settings: false,
    controls: false,
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
