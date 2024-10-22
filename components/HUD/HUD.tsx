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
import Player from "../Player/Player";


interface AutomationProps {
    children?: React.ReactNode,
}
const HUD: React.FC<AutomationProps> = ({
    children = null
}) => {

    const dev = useSelector((state: RootState) => state.gameState.dev);

    return (
        <div
            style={{
                position: "relative",
                overflow: "hidden",
                width: "100vw",
                height: "100vh",
            }}
        >
            {dev && <DisplayContainer>
                <DevDisplay />
            </DisplayContainer>}
            <DisplayContainer
                right={0}
            >
                <KeyboardHUD />
            </DisplayContainer>
            <DisplayContainer
                right={0}
                bottom={0}
                backgroundColor="#101d02"
                border="1px solid #44ab10"
                borderRadius={'50%'}
            >
                <MiniMap
                    systems={systems}
                />
                <Player miniMap={true} />
            </DisplayContainer>
            {children}
        </div >
    );
}

export default HUD;