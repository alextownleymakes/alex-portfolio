"use client";

import React from 'react';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import StarSystem from '../StarSystem/StarSystem';
import { ratios } from '../../utils/functions/zoom';
import { useCursor } from '@/hooks/useCursor';
import DisplayContainer from '../DisplayContainer/DisplayContainer';
import { useVisibleSystems } from '@/hooks/useVisibleSystems';
import { useDispatch } from 'react-redux';
import { useGalaxyGeneration } from '@/hooks/useGalaxyGeneration';
import { StarSystemType } from '@/utils/types/stellarTypes';

const Galaxy: React.FC = ({}) => {
    const playerState = useSelector((state: RootState) => state.gameState);
    const windowSize = useSelector((state: RootState) => state.gameState.windowSize);
    const visibleSystems = useSelector((state: RootState) => state.gameState.visibleSystems);
    const systems = useSelector((state: RootState) => state.galaxy.systems);

    useGalaxyGeneration(100);
    useVisibleSystems(systems);

    const { position, universeSize, zoomedPosition, zoom, dev } = playerState;

    const ratio = ratios[zoom];
    const galaxyRef = React.useRef<HTMLDivElement>(null);
    const cursorCoords = useCursor(galaxyRef);

    if (!windowSize.x || !windowSize.y) return null;

    return (
        <>
            <div
                ref={galaxyRef}
                id="galaxy"
                style={{
                    width: universeSize * ratio,
                    height: universeSize * ratio,
                    position: 'absolute',
                    left: -((universeSize * ratio) / 2) + (windowSize.x / 2) - (zoomedPosition.x !== 0 ? zoomedPosition.x : position.x),
                    top: -((universeSize * ratio) / 2) + (windowSize.y / 2) - (zoomedPosition.y !== 0 ? zoomedPosition.y : position.y),
                    // transition: 'all .1s ease-in-out',
                }}>
                {visibleSystems?.map((system: StarSystemType) => (
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