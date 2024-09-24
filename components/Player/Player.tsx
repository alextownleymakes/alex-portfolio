import React, { FC } from 'react';
import styles from './Player.module.scss'; // Import SCSS module

interface PlayerProps { rotation: number; }

const Player: FC<PlayerProps> = ({ rotation }) => {

  return (
    <div
      className={styles.ship}
      style={{ transform: `translate(-50%, -50%) rotate(${(rotation - 90)}deg)` }}
    >
      <div className={styles['outer-triangle']}>
        <div className={styles['inner-triangle']} />
      </div>
    </div>
  );
};

export default Player;
