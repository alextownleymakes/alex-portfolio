import React from 'react';
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import Drawer, { DrawerProps } from '../Drawer/Drawer';

const DevDisplay: React.FC = () => {

    const state = useSelector((state: RootState) => state.gameState);

    const { position, zoomedPosition, velocity, speed, rotation, zoom } = state;

    const DevList: React.FC = () => (
        <ol>
            <li>
                Player Position: {position.x.toFixed(0)}, {position.y.toFixed(0)}
            </li>
            <li>
                Zoomed Position: {zoomedPosition.x.toFixed(0)}, {zoomedPosition.y.toFixed(0)}
            </li>
            <li>
                Player Velocity: {velocity.x.toFixed(0)}, {velocity.y.toFixed(0)}
            </li>
            <li>
                Player Speed: {speed.toFixed(0)}
            </li>
            <li>
                Player Rotation: {rotation.toFixed(0)}
            </li>
            <li>
                Player Zoom: {zoom.toFixed(0)}
            </li>
        </ol>
    );

    const drawerProps: DrawerProps = {
        name: "devDisplay",
        position: "top",
        styles: {
            left: 10,
            top: 10,
            width: '300px',
        },          
        className: "dev-display-container",
        children: <DevList/>,
    }

    return (
        <Drawer {...drawerProps}/>
    );
}

export default DevDisplay;