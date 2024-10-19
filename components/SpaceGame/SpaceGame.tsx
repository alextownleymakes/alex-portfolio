"use client";

import React from 'react';
import StarField from "../StarField/StarField";
import Universe from '../Universe/Universe';
import Galaxy from '../Galaxy/Galaxy';
import Player from "../Player/Player";
import Planet from "../Planet/Planet";
import { systems } from '../../utils/systems/systems';
import PlayerController from '../PlayerController/PlayerController';
import Automation from '../Automation/Automation';

export enum ViewMode {
  Galaxy = 'Galaxy',
  StarSystem = 'StarSystem',
  SolarSystem = 'SolarSystem',
}

export interface PlayerStateType {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  speed: number;
  rotation: number;
}

const SpaceGame = () => {

  // Planets data
  const planets = [
    { position: { x: 9980, y: 10020 }, size: 40, color: "red", label: "Welcome" },
    { position: { x: 10200, y: 9750 }, size: 60, color: "blue", label: "Resume" },
    { position: { x: 10100, y: 10200 }, size: 50, color: "green", label: "Projects" },
    { position: { x: 9500, y: 10200 }, size: 70, color: "orange", label: "About" },
    { position: { x: 9600, y: 9750 }, size: 80, color: "purple", label: "Missions" },
    { position: { x: 10450, y: 9900 }, size: 90, color: "yellow", label: "Contact" },
  ];

  const planetElements = planets.map((planet, index) => (
    <Planet
      key={index}
      location={planet.position}
      size={planet.size}
      color={planet.color}
      label={planet.label}
    />
  ));

  return (
    <PlayerController>
      <Automation>
      <Universe>
        <StarField
          width={window.innerWidth}
          height={window.innerHeight}
        />
        <Galaxy
          systems={systems}
        />
        <Player/>
        {planetElements}
      </Universe>
      </Automation>
    </PlayerController>
  );
};

export default SpaceGame;
