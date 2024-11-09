"use client";

import React from 'react';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import GalaxySystem from '../GalaxySystem/GalaxySystem';
import { useCursor } from '@/hooks/useCursor';
import DisplayContainer from '../DisplayContainer/DisplayContainer';
import { StarSystemType } from '@/utils/types/stellarTypes';
import GalacticCenter from '../GalacticCenter/GalacticCenter';

interface GalaxyProps {
    mm?: boolean;
}

const Galaxy: React.FC<GalaxyProps> = ({
    mm = false
}) => {
    const game = useSelector((state: RootState) => state.gameState);
    const { position, dev, universeSize } = game;

    const windowSize = useSelector((state: RootState) => state.gameState.windowSize);
    // if (!windowSize.x || !windowSize.y) return null;
    const systems = useSelector((state: RootState) => state.galaxy.systems);
    const scale = useSelector((state: RootState) => state.gameState.scale);
    const scaleMini = useSelector((state: RootState) => state.gameState.miniMapRatio);

    React.useEffect(() => {
        console.log('systems', (mm ? '(minimap)': ''), systems);
    }, [systems]);

    React.useEffect(() => {
        console.log('miniMap', mm);
    }, [mm]);

    const galaxyRef = React.useRef<HTMLDivElement>(null);
    const cursorCoords = useCursor(galaxyRef);


    const galaxyProps: React.HTMLAttributes<HTMLDivElement> = {
        id: 'galaxy',
        style: {
            position: 'absolute',
            left: ((-(universeSize / 2)) + (windowSize.x/2) - position.x),
            top: ((-(universeSize / 2)) + (windowSize.y/2) - position.y),
            width: universeSize,
            height: universeSize,
            transform: `scale(${!mm ? scale : scaleMini})`,
            // transition: `transform 1s ease` /* 1s transition for scaling */
        },
    }

    return (
        <>
            <div ref={galaxyRef} {...galaxyProps} >
                <GalacticCenter />
                {systems?.map((system: StarSystemType) => (
                    <GalaxySystem key={system.name} system={system} mm={mm} />
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