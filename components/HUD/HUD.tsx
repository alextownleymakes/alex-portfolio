import { devDisplayProps } from "../DevDisplayHUD/DevDisplayHUD";
import { keyboardProps } from "../KeyboardHUD/KeyboardHUD";
import { miniMapProps } from "../MiniMapHUD/MiniMapHUD";
import { missionCenterProps } from "../MissionCenterHUD/MissionCenterHUD";
import FlightDataHUD from "../FlightDataHUD/FlightDataHUD";
import HUDPiece, { HUDPieceProps } from "../HUD/HUDPiece";


const HUD: React.FC = () => {

    const hudPieces: HUDPieceProps[] = [
        miniMapProps,
        keyboardProps,
        missionCenterProps,
        devDisplayProps,
        // {...miniMapProps,
        //     styles: {
        //         ...miniMapProps.styles,
        //         left: '1%',
        //         width: '30%',
        //         padding: '60px',
        //         margin: '0 auto 0 0',
        //     },
        // }
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
            {hud}
        </div >
    );
}

export default HUD;