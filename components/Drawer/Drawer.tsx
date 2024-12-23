import React from 'react';
import DisplayContainer from '../DisplayContainer/DisplayContainer';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import { DrawerList } from '@/state/drawersStateSlice';
import styles from './Drawer.module.scss';

export interface DrawerProps {
    children: React.ReactNode;
    name: DrawerList;
    styles?: React.CSSProperties;
    className?: string;
    position: "top" | "bottom" | "left" | "right";
}

const Drawer: React.FC<DrawerProps> = ({ children, name, styles: extraStyles, className = '', position }) => {
    const drawerState = useSelector((state: RootState) => state.drawers);
    const thisDrawer = drawerState[name];

    const positionClass = styles[`drawer-${position}`];
    const openClass = thisDrawer ? styles.drawerOpen : '';

    const propClass = className !== 'hud' && styles[className] || '';

    return (
        <DisplayContainer styles={extraStyles} className={`${styles.drawer} ${positionClass} ${openClass} ${propClass}`}>
            {className==='hud' && <div className={`${styles['hud']} ${styles['hud-' + position]}`}>{' '}</div>}
            <div 
                style={{
                    height: 'auto',
                    width: 'auto',
                    position: className === 'hud' ? 'relative' : 'static',
                    // padding: className === 'hud' ? '5%' : '',
                }}
            >
                {children}
            </div>
        </DisplayContainer>
    );
}

export default Drawer;
