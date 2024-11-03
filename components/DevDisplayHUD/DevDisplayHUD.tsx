import React from 'react';
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { HUDPieceProps } from "../HUD/HUDPiece";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { systems } from '../../utils/systems/systems';
import Body from '../Body/Body';


const findBody = (
    obj: { [key: string]: any },
    name: string,
    type: string
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

    const { position, zoomedPosition, velocity, speed, rotation, zoom, lowestOrbit } = gameState;

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


    return (<Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4}>
            <Grid size={4}>
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
            <Grid size={4}>
                <h1><strong>ORBITAL LOCK</strong></h1>
                {lowestOrbit.name?.toUpperCase() ?? 'No Orbit'}{' '}{lowestOrbit.type ? `(${lowestOrbit.type})` : ''}
                {currentSystem && lowestOrbit.type &&
                    (
                        <Body
                            type={lowestOrbit.type}
                            style={{ height: '150px', width: '150px', position: 'relative', margin: '30px' }}
                        />
                    )
                }
            </Grid>
            <Grid size={4}>
                <h1><strong>ACTIVE MISSION</strong></h1>
                {playerState.currentMission ? playerState.currentMission : 'No Active Mission'}
            </Grid>
        </Grid>
    </Box>);
}

export const devDisplayProps: HUDPieceProps = {
    name: "miniMap",
    position: "bottom",
    styles: {
        right: '32%',
        width: 'auto',
    },
    className: 'hud',
    children: <DevDisplayHUD />,
}