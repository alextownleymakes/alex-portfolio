import { RootState } from "@/state/store";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import React from 'react';
import { useSelector } from "react-redux";
import Body from '../Body/Body';
import { HUDPieceProps } from "../HUD/HUDPiece";
import { findBody } from '../../utils/functions/calculations';
import { PlayerMission } from "@/state/playerSlice";

const DevDisplayHUD: React.FC = () => {

    const gameState = useSelector((state: RootState) => state.gameState);
    const playerState = useSelector((state: RootState) => state.player);
    const systems = useSelector((state: RootState) => state.galaxy.systems);

    const currentMission: PlayerMission | undefined = playerState?.missions?.find((mission) => mission.id === (playerState?.currentMission || 0)+1) || undefined;

    const { speed, rotation, lowestOrbit, position } = gameState;
    const credits = playerState.resources[1].amount;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [currentSystem, setCurrentSystem] = React.useState<any>(null);
    React.useEffect(() => {
        if (lowestOrbit.name && lowestOrbit.type) {
            const system = findBody(systems, lowestOrbit.name, lowestOrbit.type);
            if (system) {
                setCurrentSystem(system);
            }
        } else {
            setCurrentSystem(null);
        }

    }, [lowestOrbit]);


    return (
        <Box sx={{ padding: '20px', margin: '20px 0' }}>
            <Grid container spacing={4} columnSpacing={4}>
                <Grid size={12}>
                    <ol>
                        <li>
                        <strong>Position:</strong>&nbsp;{position.x.toFixed(0)},&nbsp;{position.y.toFixed(0)}
                    </li>
                        {/* 
                    <li>
                        <strong>Velocity:</strong>&nbsp;{velocity.x.toFixed(0)},&nbsp;{velocity.y.toFixed(0)}
                    </li> */}
                        <li>
                            <strong>Throttle:</strong>&nbsp;{speed.toFixed(0)}
                        </li>
                        <li>
                            <strong>Rotation:</strong>&nbsp;{rotation.toFixed(0)}
                        </li>
                        <li>
                            <strong>Zoom:</strong>&nbsp;{gameState.zoom}
                        </li>
                    </ol>
                </Grid>
                {/* </Grid> */}
                {/* <Grid container columnSpacing={4}> */}
                <Grid size={12}>
                    <h1><strong>ORBITAL&nbsp;LOCK</strong>: {currentSystem?.name?.toUpperCase() ?? 'NONE'}</h1>
                    <span>{currentSystem?.variant?.toUpperCase()} {currentSystem?.type?.toUpperCase()}</span>
                    {currentSystem &&
                        (
                            <div style={{
                                border: `3px solid ${currentSystem.color}`,
                                borderRadius: '50%',
                                margin: '30px',
                                width: '150px',
                                height: '150px',
                                boxShadow: `0 0 200px 5px ${currentSystem.color}`,
                            }}
                            >
                                <Body
                                    type={currentSystem.type}
                                    style={{ height: '144px', width: '144px', position: 'relative', filter: 'grayscale(1)', WebkitFilter: 'grayscale(1)', opacity: '.6' }}
                                    variant={currentSystem.variant}
                                />
                            </div>
                        )
                    }
                </Grid>
                <Grid size={12}>
                    <h1><strong>ACTIVE&nbsp;MISSION</strong></h1>
                    {currentMission ? currentMission.name : 'No Active Mission'}
                </Grid>
                <Grid size={12}>
                    <h1><strong>CURRENT&nbsp;OBJECTIVE</strong></h1>
                    {currentMission?.description}
                    {/* {(currentMission && playerState?.currentMissionStage) ? currentMission.stage[playerState?.currentMissionStage].description : 'No Active Mission'} */}
                </Grid>
                <Grid size={12}>
                    <h1><strong>CREDITS</strong>: ‡{credits}</h1>
                </Grid>
            </Grid>
        </Box>
    );
}

export const devDisplayProps: HUDPieceProps = {
    name: "miniMap",
    position: "right",
    styles: {
        bottom: '300px',
        width: '18%',
    },
    className: 'hud',
    children: <DevDisplayHUD />,
}