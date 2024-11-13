"use client";

import React from 'react';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import SystemComponent from '../StellarComponents/SystemComponent/SystemComponent';
import { useCursor } from '@/hooks/useCursor';
import DisplayContainer from '../common/DisplayContainer/DisplayContainer';
import GalacticCenter from '../GalacticCenter/GalacticCenter';
import { StellarBodyType } from '@/utils/types/stellarTypes';

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
            left: ((-((universeSize * scale) / 2)) + (!mm && windowSize.x/2 || 125) - (position.x * (mm ? scaleMini : 1))),
            top: ((-((universeSize * scale) / 2)) + (!mm && windowSize.y/2 || 125) - (position.y * (mm ? scaleMini : 1))),
            width: universeSize * scale,
            height: universeSize * scale,
            border: '1px solid red',
            // transition: `transform 1s ease` /* 1s transition for scaling */
        },
    }

    return (
        <>
            <div ref={galaxyRef} {...galaxyProps} >
                <GalacticCenter />
                {systems?.map((system: StellarBodyType) => (
                    <SystemComponent key={system.name} system={system} mm={mm} />
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