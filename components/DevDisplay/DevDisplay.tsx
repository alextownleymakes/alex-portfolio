import React from 'react';
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

const DevDisplay: React.FC = () => {
    
    const state = useSelector((state: RootState) => state.gameState);

    const { position, zoomedPosition, velocity, speed, rotation, zoom } = state;
    return(
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
}

export default DevDisplay;