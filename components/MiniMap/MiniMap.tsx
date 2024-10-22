"use client";

import React from 'react';
import { StarSystem as StarSystemType } from '../../utils/types/stellarBodies';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import MiniMapStarSystem from '../MiniMapStarSystem/MiniMapStarSystem';
import { ratios } from '../../utils/functions/zoom';
import { useCursor } from '@/hooks/useCursor';
import DisplayContainer from '../DisplayContainer/DisplayContainer';

interface MiniMapProps {
    systems: StarSystemType[]
}

const MiniMap: React.FC<MiniMapProps> = ({
    systems,
}) => {

    const playerState = useSelector((state: RootState) => state.gameState);
    const { position, zoomedPosition, universeSize, velocity, speed, rotation, zoom } = playerState;

    const ratio = ratios[zoom] / 10;
    const galaxyRef = React.useRef<HTMLDivElement>(null);
    const visibleSystems = systems.filter(system => {
        const distance = Math.sqrt(Math.pow(playerState.position.x - system.position.x, 2) + Math.pow(playerState.position.y - system.position.y, 2));
        return distance < 3000;
    });

    const cursorCoords = useCursor(galaxyRef);

    React.useEffect(() => {
        console.log('cursorCoords - x: ', cursorCoords?.x, ', y:  ', cursorCoords?.y);
        console.log('position - x: ', position.x, ', y:  ', position.y);
        console.log('zoomedPosition - x: ', zoomedPosition.x, ', y:  ', zoomedPosition.y);
    }, [cursorCoords]);

    const galaxyPosX = -((universeSize * ratio) / 2) + (window.innerWidth / 2) - ((zoomedPosition.x !== 0 ? zoomedPosition.x : position.x) / 10);
    const galaxyPosX2 = `calc(-${(universeSize * ratio) / 2}px + 50% - ${((zoomedPosition.x !== 0 ? zoomedPosition.x : position.x) / 10)}px)`;
    const galaxyPosY = -((universeSize * ratio) / 2) + (window.innerHeight / 2) - ((zoomedPosition.y !== 0 ? zoomedPosition.y : position.y) / 10);
    const galaxyPosY2 = `calc(-${(universeSize * ratio) / 2}px + 50% - ${((zoomedPosition.y !== 0 ? zoomedPosition.y : position.y) / 10)}px)`;
    const galaxySize = universeSize * ratio;
    return (
        <>
            <div
                ref={galaxyRef}
                id="minimap"
                style={{
                    width: galaxySize,
                    height: galaxySize,
                    position: 'absolute',
                    left: galaxyPosX2,
                    top: galaxyPosY2,
                    transform: "scale(0.5)", // 90% of the original size
                    // transition: 'all .1s ease-in-out',
                }}>
                {visibleSystems.map((system) => (
                    <MiniMapStarSystem
                        key={system.name + '-minimap'}
                        system={system}
                    />
                ))}
            </div>
            <DisplayContainer
                top={310}
                left={0}
                height={45}
            >
                x: {cursorCoords?.x}, y: {cursorCoords?.y}
            </DisplayContainer>
        </>
    );
}

export default MiniMap;