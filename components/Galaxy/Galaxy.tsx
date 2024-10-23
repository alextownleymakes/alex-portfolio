"use client";

import React from 'react';
import { StarSystem as StarSystemType } from '../../utils/types/stellarBodies';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import StarSystem from '../StarSystem/StarSystem';
import { ratios } from '../../utils/functions/zoom';
import { useCursor } from '@/hooks/useCursor';
import DisplayContainer from '../DisplayContainer/DisplayContainer';

interface GalaxyProps {
    systems: StarSystemType[]
}

const Galaxy: React.FC<GalaxyProps> = ({
    systems,
}) => {
    const playerState = useSelector((state: RootState) => state.gameState);

    const { position, universeSize, zoomedPosition, zoom, dev} = playerState;

    const ratio = ratios[zoom];
    const galaxyRef = React.useRef<HTMLDivElement>(null);
    const cursorCoords = useCursor(galaxyRef);

    const visibleSystems = systems.filter(system => {
        const distance = Math.sqrt(Math.pow(playerState.position.x - system.position.x, 2) + Math.pow(playerState.position.y - system.position.y, 2));
        return distance < 3000;
    });

    return (
        <>
            <div
                ref={galaxyRef}
                id="galaxy"
                style={{
                    width: universeSize * ratio,
                    height: universeSize * ratio,
                    position: 'absolute',
                    left: -((universeSize * ratio) / 2) + (window.innerWidth / 2) - (zoomedPosition.x !== 0 ? zoomedPosition.x : position.x),
                    top: -((universeSize * ratio) / 2) + (window.innerHeight / 2) - (zoomedPosition.y !== 0 ? zoomedPosition.y : position.y),
                    // transition: 'all .1s ease-in-out',
                }}>
                {visibleSystems.map((system) => (
                    <StarSystem
                        key={system.name}
                        system={system}
                    />
                ))}
            </div>
            {dev && <DisplayContainer
                top={310}
                left={0}
                height={45}
            >
                x: {cursorCoords?.x}, y: {cursorCoords?.y}
            </DisplayContainer>}
        </>
    );
}

export default Galaxy;