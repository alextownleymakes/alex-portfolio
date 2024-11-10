import { devDisplayProps } from "./DevDisplayHUD/DevDisplayHUD";
import { keyboardProps } from "./KeyboardHUD/KeyboardHUD";
import { miniMapProps } from "./MiniMapHUD/MiniMapHUD";
import { missionCenterProps } from "./MissionCenterHUD/MissionCenterHUD";
import HUDPiece, { HUDPieceProps } from "../HUD/HUDPiece";


const HUD: React.FC = () => {

    const hudPieces: HUDPieceProps[] = [
        miniMapProps,
        keyboardProps,
        missionCenterProps,
        devDisplayProps,
    ];

    const hud = hudPieces.map((piece, i) => <HUDPiece {...piece} key={piece.name + '-' + i} />);

    return (
        <div
            style={{
                position: "relative",
                overflow: "hidden",
                width: "100vw",
                height: "100vh",
            }}
        >
            {hud}
        </div >
    );
}

export default HUD;