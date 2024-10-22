"use client";

import React from 'react';
import StarField from "../StarField/StarField";
import Universe from '../Universe/Universe';
import Galaxy from '../Galaxy/Galaxy';
import Player from "../Player/Player";
import { systems } from '../../utils/systems/systems';
import PlayerController from '../PlayerController/PlayerController';
import HUD from '../HUD/HUD';

const SpaceGame = () => {

  return (
    <Universe>
      <PlayerController>
        <HUD />
        <StarField
          width={window.innerWidth}
          height={window.innerHeight}
        />
        <Galaxy
          systems={systems}
        />
        <Player />
      </PlayerController>
    </Universe>
  );
};

export default SpaceGame;
