"use client";

import DevDisplay from "../DevDisplay/DevDisplay";
import { keyboardProps } from "../KeyboardHUD/KeyboardHUD";
import { miniMapProps } from "../MiniMapHUD/MiniMapHUD";
import { missionCenterProps } from "../MissionCenterHUD/MissionCenterHUD";
import FlightDataHUD from "../FlightDataHUD/FlightDataHUD";
import HUDPiece, { HUDPieceProps } from "../HUD/HUDPiece";

interface AutomationProps {
    children?: React.ReactNode,
}

const HUD: React.FC<AutomationProps> = ({
    children = null
}) => {

    const hudPieces: HUDPieceProps[] = [
        miniMapProps,
        keyboardProps,
        missionCenterProps,
    ];

    const hud = hudPieces.map((piece) => <HUDPiece {...piece} key={piece.name} />);

    return (
        <div
            style={{
                position: "relative",
                overflow: "hidden",
                width: "100vw",
                height: "100vh",
            }}
        >
            <DevDisplay />
            <FlightDataHUD />
            {hud}
            {children}
        </div >
    );
}

export default HUD;