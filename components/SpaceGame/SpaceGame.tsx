"use client";

import React from 'react';
import StarField from "../StarField/StarField";
import Universe from '../Universe/Universe';
import Galaxy from '../Galaxy/Galaxy';
import Player from "../Player/Player";
import PlayerController from '../PlayerController/PlayerController';
import HUD from '../HUD/HUD';

const SpaceGame = () => {

  return (
    <Universe>
      <PlayerController>
        <Galaxy/>
        <StarField/>
        <HUD />
        <Player/>
      </PlayerController>
    </Universe>
  );
};

export default SpaceGame;
