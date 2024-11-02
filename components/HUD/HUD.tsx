"use client";

import DevDisplay from "../DevDisplay/DevDisplay";
import KeyboardHUD from "../KeyboardHUD/KeyboardHUD";
import MiniMapHUD from "../MiniMapHUD/MiniMapHUD";
import FlightDataHUD from "../FlightDataHUD/FlightDataHUD";
import MissionCenter from "../MissionCenter/MissionCenter";

interface AutomationProps {
    children?: React.ReactNode,
}
const HUD: React.FC<AutomationProps> = ({
    children = null
}) => {
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
            <MiniMapHUD />
            <KeyboardHUD />
            <FlightDataHUD />
            <MissionCenter />
            {children}
        </div >
    );
}

export default HUD;