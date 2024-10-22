import React, { FC } from 'react';
import styles from './Player.module.scss'; // Import SCSS module
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

interface PlayerProps {
  miniMap?: boolean;
}

const Player: FC<PlayerProps> = ({ miniMap = false }) => {

  const rotation = useSelector((state: RootState) => state.gameState.rotation);

  const innerStyle = `${miniMap ? 'mm-' : ''}inner-triangle`;
  const outerStyle = `${miniMap ? 'mm-' : ''}outer-triangle`;

  return (
    <div
      className={styles.ship}
      style={{ position: 'absolute', transform: `translate(-50%, -50%) rotate(${(rotation - 90)}deg)` }}
    >
          <div className={styles[outerStyle]}>
            <div className={styles[innerStyle]} />
          </div>
    </div>
  );
};

export default Player;
