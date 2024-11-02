import React from 'react';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import { ratios } from '../../utils/functions/zoom';
import { useCursor } from '@/hooks/useCursor';
import Drawer from '../Drawer/Drawer';
import { systems } from '../../utils/systems/systems';
import { StarSystem } from '../../utils/types/stellarBodies';
import MiniMapBody from './MiniMapBody';

const MiniMapHUD: React.FC = () => {

    const playerState = useSelector((state: RootState) => state.gameState);
    const { position, zoomedPosition, universeSize, zoom } = playerState;

    const ratio = ratios[zoom] / 10;
    const galaxyRef = React.useRef<HTMLDivElement>(null);
    const visibleSystems: StarSystem[] = systems.filter(system => {
        const distance = Math.sqrt(Math.pow(playerState.position.x - system.position.x, 2) + Math.pow(playerState.position.y - system.position.y, 2));
        return distance < 3000;
    });

    const cursorCoords = useCursor(galaxyRef);

    const galaxyPosX = `calc(-${(universeSize * ratio) / 2}px + 50% - ${((zoomedPosition.x !== 0 ? zoomedPosition.x : position.x) / 10)}px)`;
    const galaxyPosY = `calc(-${(universeSize * ratio) / 2}px + 50% - ${((zoomedPosition.y !== 0 ? zoomedPosition.y : position.y) / 10)}px)`;
    const galaxySize = universeSize * ratio;

    const miniMapBodyProps = {
        galaxyRef,
        galaxySize,
        galaxyPosX,
        galaxyPosY,
        visibleSystems,
    };

    return (
        <Drawer
            name="miniMap"
            position="bottom"
            styles={{
                right: '1%',
                margin: '0 auto',
                width: 'auto',
                padding: '60px',
                // border: '1px solid #fff',
            }}
            className='hud'
        >
            <MiniMapBody {...miniMapBodyProps}/>
        </Drawer>
    );
}

export default MiniMapHUD;