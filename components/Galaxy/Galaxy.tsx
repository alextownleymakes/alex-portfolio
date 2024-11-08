"use client";

import React from 'react';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import GalaxySystem from '../GalaxySystem/GalaxySystem';
import { useCursor } from '@/hooks/useCursor';
import DisplayContainer from '../DisplayContainer/DisplayContainer';
import { useGalaxyGeneration } from '@/hooks/useGalaxyGeneration';
import { StarSystemType } from '@/utils/types/stellarTypes';
import GalacticCenter from '../GalacticCenter/GalacticCenter';

interface GalaxyProps {
    miniMap?: boolean;
}

const Galaxy: React.FC<GalaxyProps> = ({
    miniMap = false
}) => {
    const playerState = useSelector((state: RootState) => state.gameState);
    const { position, universeSize, zoomedPosition, dev } = playerState;

    const windowSize = useSelector((state: RootState) => state.gameState.windowSize);
    const systems = useSelector((state: RootState) => state.galaxy.systems);
    const ratioBase = useSelector((state: RootState) => state.gameState.ratio);
    const ratioMiniMap = useSelector((state: RootState) => state.gameState.miniMapRatio);
    const ratio = miniMap ? ratioBase : ratioMiniMap;

    useGalaxyGeneration(1);

    React.useEffect(() => {
        // console.log('systems', systems);
    }, [systems]);

    const galaxyRef = React.useRef<HTMLDivElement>(null);
    const cursorCoords = useCursor(galaxyRef);

    if (!windowSize.x || !windowSize.y) return null;

    const left = -((universeSize * ratio) / 2) + (windowSize.x / 2) - (zoomedPosition.x !== 0 ? zoomedPosition.x : position.x);
    const top = -((universeSize * ratio) / 2) + (windowSize.y / 2) - (zoomedPosition.y !== 0 ? zoomedPosition.y : position.y);
    const width = universeSize * ratio;
    const height = universeSize * ratio;

    const galaxyProps: React.HTMLAttributes<HTMLDivElement> = {
        id: 'galaxy',
        style: {
            position: 'absolute',
            left,
            top,
            width,
            height,
        },
    }

    return (
        <>
            <div ref={galaxyRef} {...galaxyProps} >
                <GalacticCenter />
                {systems?.map((system: StarSystemType) => (
                    <GalaxySystem key={system.name} system={system} position={position} />
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