"use client";

import React from 'react';
import StarField from "../StarField/StarField";
import Universe from '../Universe/Universe';
import Galaxy from '../Galaxy/Galaxy';
import Player from "../Player/Player";
import PlayerController from '../PlayerController/PlayerController';
import HUD from '../HUD/HUD';
import MissionCenter from '../MissionCenter/MissionCenter';

const SpaceGame = () => {

  return (
    <Universe>
      <PlayerController>
        <HUD />
        <Galaxy/>
        <MissionCenter />
        <StarField/>
        <Player/>
      </PlayerController>
    </Universe>
  );
};

export default SpaceGame;
