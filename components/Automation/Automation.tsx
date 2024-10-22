"use client";

import { RootState } from "@/state/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ratios } from "../../utils/functions/zoom";
import { GameState, updatePosition } from "@/state/gameStateSlice";
import DevDisplay from "../DevDisplay/DevDisplay";
import DisplayContainer from "../DisplayContainer/DisplayContainer";
import KeyboardHUD from "../KeyboardHUD/KeyboardHUD";
import MiniMap from "../MiniMap/MiniMap";
import { systems } from '../../utils/systems/systems';


interface AutomationProps {
    children: React.ReactNode,
}
const Automation: React.FC<AutomationProps> = ({
    children
}) => {

    const dispatch = useDispatch();

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
            <DisplayContainer>
                <DevDisplay />
            </DisplayContainer>
            <DisplayContainer
                right={0}
            >
                <KeyboardHUD />
            </DisplayContainer>
            <DisplayContainer
                right={0}
                bottom={0}
            >
                <MiniMap 
                    systems={systems}
                />
            </DisplayContainer>
            {children}
        </div >
    );
}

export default Automation;