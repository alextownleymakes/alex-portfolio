import { RootState } from "@/state/store";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import React from 'react';
import { useSelector } from "react-redux";
import { systems } from '../../utils/systems/systems';
import Body from '../Body/Body';
import { HUDPieceProps } from "../HUD/HUDPiece";


const findBody = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    obj: { [key: string]: any },
    name: string,
    type: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any | undefined => {
    // Base case: if the current object matches, return it
    if (obj.name === name && obj.type === type) {
        return obj;
    }

    // Iterate through each property of the current object
    for (const key in obj) {
        // Ensure the property is an object before diving deeper
        if (typeof obj[key] === "object" && obj[key] !== null) {
            const result = findBody(obj[key], name, type);
            if (result) {
                return result; // Found a match in a nested object
            }
        }
    }

    return undefined; // No match found in this branch
}

const DevDisplayHUD: React.FC = () => {

    const gameState = useSelector((state: RootState) => state.gameState);
    const playerState = useSelector((state: RootState) => state.player);

    const { speed, rotation, lowestOrbit } = gameState;
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
        <Box sx={{ padding: '20px' }}>
            <Grid container spacing={4} columnSpacing={4}>
                <Grid size={12}>
                    <ol>
                        {/* <li>
                        <strong>Position:</strong>&nbsp;{zoomedPosition.x.toFixed(0)},&nbsp;{zoomedPosition.y.toFixed(0)}
                    </li>
                    <li>
                        <strong>Velocity:</strong>&nbsp;{velocity.x.toFixed(0)},&nbsp;{velocity.y.toFixed(0)}
                    </li> */}
                        <li>
                            <strong>Throttle:</strong>&nbsp;{speed.toFixed(0)}
                        </li>
                        <li>
                            <strong>Rotation:</strong>&nbsp;{rotation.toFixed(0)}
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
                    {playerState.currentMission ? playerState.currentMission : 'No Active Mission'}
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