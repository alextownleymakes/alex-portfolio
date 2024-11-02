import React from 'react';
import { drawerList as d } from '@/state/drawersStateSlice';
import Drawer, { DrawerProps } from '../Drawer/Drawer';
import KeyboardHUDBody from './KeyboardHUDBody';


const KeyboardHUD: React.FC = () => {



    const drawerProps: DrawerProps = {
        name: d.controls,
        position: "right",
        styles: {
            height: 'auto',
            width: 'auto',
            top: 10
        },
        className: 'hud',
        children: <KeyboardHUDBody/>
    }
    
    return (
        <Drawer { ...drawerProps } />
    );
}

export default KeyboardHUD;