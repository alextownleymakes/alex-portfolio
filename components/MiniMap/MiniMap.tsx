"use client";

import React from 'react';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import MiniMapStarSystem from '../MiniMapStarSystem/MiniMapStarSystem';
import { ratios } from '../../utils/functions/zoom';
import { useCursor } from '@/hooks/useCursor';
import DisplayContainer from '../DisplayContainer/DisplayContainer';
import Drawer from '../Drawer/Drawer';
import Player from '../Player/Player';
import { systems } from '../../utils/systems/systems';

const MiniMap: React.FC = () => {

    const playerState = useSelector((state: RootState) => state.gameState);
    const { position, zoomedPosition, universeSize, zoom } = playerState;

    const ratio = ratios[zoom] / 10;
    const galaxyRef = React.useRef<HTMLDivElement>(null);
    const visibleSystems = systems.filter(system => {
        const distance = Math.sqrt(Math.pow(playerState.position.x - system.position.x, 2) + Math.pow(playerState.position.y - system.position.y, 2));
        return distance < 3000;
    });

    const cursorCoords = useCursor(galaxyRef);

    const galaxyPosX = `calc(-${(universeSize * ratio) / 2}px + 50% - ${((zoomedPosition.x !== 0 ? zoomedPosition.x : position.x) / 10)}px)`;
    const galaxyPosY = `calc(-${(universeSize * ratio) / 2}px + 50% - ${((zoomedPosition.y !== 0 ? zoomedPosition.y : position.y) / 10)}px)`;
    const galaxySize = universeSize * ratio;

    return (
        <Drawer 
            name="miniMap" 
            position="bottom" 
            className={'minimap-display-container'}
        >
            <div
                ref={galaxyRef}
                id="minimap"
                style={{
                    width: galaxySize,
                    height: galaxySize,
                    position: 'absolute',
                    left: galaxyPosX,
                    top: galaxyPosY,
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
                top={0}
                left={0}
                height={45}
                width={280}
                id={'cursor-coords'}
            >
                x: {cursorCoords?.x}, y: {cursorCoords?.y}
            </DisplayContainer>
            <Player miniMap={true} />
        </Drawer>
    );
}

export default MiniMap;