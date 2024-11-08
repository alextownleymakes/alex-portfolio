import React from 'react';
import { useSelector } from 'react-redux';
import { ratios } from '../../utils/functions/zoom';
import { RootState } from '@/state/store';
import MiniMapSystem from '../MiniMapSystem/MiniMapSystem';
import Player from '../Player/Player';
import styles from './Minimap.module.scss';

const MiniMapBody: React.FC = () => {
  const playerState = useSelector((state: RootState) => state.gameState);
  const { position, zoomedPosition, universeSize, zoom } = playerState;
  const visibleSystems = useSelector((state: RootState) => state.gameState.visibleSystems);
  const ratioBase = useSelector((state: RootState) => state.gameState.ratio);

  const ratio = ratioBase/ 10;
  const galaxyRef = React.useRef<HTMLDivElement>(null);

  const galaxyPosX = `calc(-${(universeSize * ratio) / 2}px + 50% - ${(zoomedPosition.x || position.x) / 10}px)`;
  const galaxyPosY = `calc(-${(universeSize * ratio) / 2}px + 50% - ${(zoomedPosition.y || position.y) / 10}px)`;
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
        }}
      >
        {visibleSystems?.map((system) => (
          <MiniMapSystem key={system.name} system={system} ratio={ratio} />
        ))}
      </div>
      <Player miniMap={true} />
    </div>
  );
};

export default MiniMapBody;
