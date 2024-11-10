import React from 'react';
import Player from "../../Player/Player";
import styles from './Minimap.module.scss';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import { HUDPieceProps } from '../HUDPiece';
import Galaxy from '../../Galaxy/Galaxy';

const MiniMapHUD: React.FC= () => {

    const playerState = useSelector((state: RootState) => state.gameState);
    const { position, zoomedPosition } = playerState;
    const visibleSystems = useSelector((state: RootState) => state.gameState.visibleSystems);

    const galaxyRef = React.useRef<HTMLDivElement>(null);

    const left =  `calc(50% + ${((zoomedPosition.x || position.x) / 10)}px)`;
    const top = `calc(50% + ${((zoomedPosition.y || position.y) / 10)}px)`;

    return (
        <div className={styles['minimap-body']}>
            {/* <div
                ref={galaxyRef}
                id="minimap"
                style={{
                    width: 0,
                    height: 0,
                    position: 'absolute',
                    left,
                    top
                }}>
                {visibleSystems?.map((system) => {
                    const { x, y } = useAuCoordinates({ data: { system }, type: 'system' });
                    if ( Number.isNaN(x) || Number.isNaN(y)) return null;
                    return (<MiniMapStarSystem
                        key={system.name + '-minimap'}
                        system={system}
                        x={x}
                        y={y}
                    />)
                })}
            </div> */}
            <Galaxy mm={true} />
            <Player miniMap={true} />
        </div>
    );
}

export const miniMapProps: HUDPieceProps = {
    name: 'miniMap',
    position: 'right',
    styles: {
        bottom: '1%',
        margin: '0 auto 0 -15px',
        height: '280px',
        minWidth: '19%',
        paddingTop: '15px',
        paddingRight: '15px',
        paddingLeft: '30px',
    },
    className: 'hud',
    children: <MiniMapHUD/>
}
