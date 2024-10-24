import React from 'react';
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { Key } from '@/state/keyStateSlice';
import { drawerList as d } from '@/state/drawersStateSlice';
import Drawer, { DrawerProps } from '../Drawer/Drawer';
import KeyboardHUDBody from './KeyboardHUDBody/KeyboardHUDBody';


const KeyboardHUD: React.FC = () => {

    const keyState = useSelector((state: RootState) => state.keyState);

    const keysArray: Key[] = Object.values(keyState);

    const drawerProps: DrawerProps = {
        name: d.controls,
        position: "right",
        styles: {
            height: 'auto',
            width: 'auto',
            paddingRight: '2rem',
            top: 10
        },
        children: <KeyboardHUDBody keys={keysArray}/>
    }
    
    return (
        <Drawer { ...drawerProps } />
    );
}

export default KeyboardHUD;