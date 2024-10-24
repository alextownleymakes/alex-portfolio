"use client";

import DevDisplay from "../DevDisplay/DevDisplay";
import KeyboardHUD from "../KeyboardHUD/KeyboardHUD";
import MiniMap from "../MiniMap/MiniMap";
import FlightDataHUD from "../FlightDataHUD/FlightDataHUD";

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
            <MiniMap />
            <KeyboardHUD />
            <FlightDataHUD />
            {children}
        </div >
    );
}

export default HUD;