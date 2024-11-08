import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import MiniMapSystem from '../MiniMapSystem/MiniMapSystem';
import Player from '../Player/Player';
import styles from './Minimap.module.scss';

const MiniMapBody: React.FC = () => {
  const playerState = useSelector((state: RootState) => state.gameState);
  const { position, zoomedPosition } = playerState;
  const visibleSystems = useSelector((state: RootState) => state.gameState.visibleSystems);
  const galaxyRef = React.useRef<HTMLDivElement>(null);

  const left =  `calc(50% + ${((zoomedPosition.x || position.x) / 10)}px)`;
  const top = `calc(50% + ${((zoomedPosition.y || position.y) / 10)}px)`;

  return (
    <div className={styles['minimap-body']}>
      <div
        ref={galaxyRef}
        id="minimap"
        style={{
          width: 0,
          height: 0,
          position: 'absolute',
          left,
          top
        }}
      >
        {visibleSystems?.map((system) => (
          <MiniMapSystem key={system.name} system={system} />
        ))}
      </div>
      <Player miniMap={true} />
    </div>
  );
};

export default MiniMapBody;
