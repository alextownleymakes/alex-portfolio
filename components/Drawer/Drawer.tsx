import React, { useState } from 'react';
import DisplayContainer from '../DisplayContainer/DisplayContainer';
import { StylesType } from '@/utils/types/components';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import { DrawerList } from '@/state/drawersStateSlice';

interface DrawerProps {
    children: React.ReactNode;
    name: DrawerList;
    position: "top" | "bottom" | "left" | "right";
}

const Drawer: React.FC<DrawerProps> = ({children, name, position}) => {

    const drawerState = useSelector((state: RootState) => state.drawers);

    const thisDrawer = drawerState[name];

    const perc = '35%';
    const percString = {closed: `calc(0 - ${perc})`, open: '0'}[thisDrawer ? 'open' : 'closed'];
    const percDimensions = {
        width: position === 'left' || position === 'right' ? perc : "100%",
        height: position === 'top' || position === 'bottom' ? perc : "100%"
    };

    const styles: StylesType = {
        [position]: percString,
        ...percDimensions,
    }

    return (
        <DisplayContainer styles={{...styles}}>
            {children}
        </DisplayContainer>
    );

}

export default Drawer;