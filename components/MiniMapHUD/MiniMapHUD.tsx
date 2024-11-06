import React from 'react';
import { StarSystem } from "@/utils/types/stellarBodies";
import MiniMapStarSystem from "../MiniMapStarSystem/MiniMapStarSystem";
import Player from "../Player/Player";
import styles from './Minimap.module.scss';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import { ratios } from '../../utils/functions/zoom';
// import { systems } from '../../utils/systems/systems';
import { HUDPieceProps } from '../HUD/HUDPiece';

const MiniMapBody: React.FC= () => {

    const playerState = useSelector((state: RootState) => state.gameState);
    const { position, zoomedPosition, universeSize, zoom } = playerState;
    const visibleSystems = useSelector((state: RootState) => state.gameState.visibleSystems);

    const ratio = ratios[zoom] / 10;
    const galaxyRef = React.useRef<HTMLDivElement>(null);

    const galaxyPosX = `calc(-${(universeSize * ratio) / 2}px + 50% - ${((zoomedPosition.x !== 0 ? zoomedPosition.x : position.x) / 10)}px)`;
    const galaxyPosY = `calc(-${(universeSize * ratio) / 2}px + 50% - ${((zoomedPosition.y !== 0 ? zoomedPosition.y : position.y) / 10)}px)`;
    const galaxySize = universeSize * ratio;

    return (
        <div className={styles['minimap-body']}>
            <div
                ref={galaxyRef}
                id="minimap"
                style={{
                    width: galaxySize,
                    height: galaxySize,
                    position: 'absolute',
                    left: galaxyPosX,
                    top: galaxyPosY,
                }}>
                {visibleSystems?.map((system) => (
                    <MiniMapStarSystem
                        key={system.name + '-minimap'}
                        system={system}
                    />
                ))}
            </div>
            <Player miniMap={true} />
        </div>
    );
}

export const miniMapProps: HUDPieceProps = {
    name: 'miniMap',
    position: 'right',
    styles: {
        bottom: '1%',
        margin: '0 auto',
        height: '280px',
        width: '18%',
    },
    className: 'hud',
    children: <MiniMapBody/>
}
