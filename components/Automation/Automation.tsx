"use client";

import { RootState } from "@/state/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ratios } from "../../utils/functions/zoom";
import { GameState, updatePosition } from "@/state/gameStateSlice";

interface AutomationProps {
    children: React.ReactNode,
}
const Automation: React.FC<AutomationProps> = ({
    children
}) => {

    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state.gameState);

    const { position, zoomedPosition, velocity, speed, rotation, zoom } = state;

    // useEffect(() => {
    //     const newPosition = {
    //         x: position.x * ratios[zoom],
    //         y: position.y * ratios[zoom]
    //     };
    //     dispatch(updatePosition(newPosition));

    // }, [zoom]);

    return (
        <div
            style={{
                position: "relative",
                overflow: "hidden",
                width: "100vw",
                height: "100vh",
            }}
        >
            <div>
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
            </div>
            {children}
        </div>
    );
}

export default Automation;