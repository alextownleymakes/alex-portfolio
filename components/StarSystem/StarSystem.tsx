// StarSystem.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Star from '../Star/Star';
import Planet from '../Planet/Planet';
import { StarSystem as StarSystemType } from '../../utils/types/stellarBodies';
import { ratios, scales } from '../../utils/functions/zoom';
import { RootState } from '../../state/store';
import useApproach from '@/hooks/useApproach';
import Moon from '../Moon/Moon';


interface StarSystemProps {
  system: StarSystemType;
  key: string;
  onFlyNearStar?: (starId: number) => void; // Callback when flying near a star
}

const StarSystem: React.FC<StarSystemProps> = ({ system, onFlyNearStar }) => {

  const systemSize = 500;

  // const { position } = system;

  // const zoom = useSelector((state: RootState) => state.gameState.zoom);
  // const universeSize = useSelector((state: RootState) => state.gameState.universeSize);
  // const galaxySize = useSelector((state: RootState) => state.gameState.galaxySize);

  // const [systemSize, setSystemSize] = React.useState(galaxySize * ratios[zoom]);
  // const [systemPosition, setSystemPosition] = React.useState({
  //   x: (position.x * ratios[zoom]) + ((universeSize * ratios[zoom]) / 2) - (systemSize / 2),
  //   y: (position.y * ratios[zoom]) + ((universeSize * ratios[zoom]) / 2) - (systemSize / 2),
  // });


  // const systemRef = useRef<HTMLDivElement>(null);

  // const dist = distanceToPlayer();

  // useEffect(() => {
  //   setSystemSize(galaxySize * ratios[zoom]);
  //   setSystemPosition({
  //     x: (position.x * ratios[zoom]) + ((universeSize * ratios[zoom]) / 2) - ((galaxySize * ratios[zoom]) / 2),
  //     y: (position.y * ratios[zoom]) + ((universeSize * ratios[zoom]) / 2) - ((galaxySize * ratios[zoom]) / 2),
  //   });
  // }, [zoom]);

  const zoom = useSelector((state: RootState) => state.gameState.zoom);
  const ratio = ratios[zoom];

  const starSysRef = React.useRef<HTMLDivElement>(null);
  const { distanceToPlayer, activeSystem } = useApproach(starSysRef, { x: system.position.x * ratio, y: system.position.y * ratio }, scales.Star);

  const starSysPosX = (system.position.x * ratio);
  const starSysPosY = (system.position.y * ratio);
  const starSysLeft = `calc(${system.position.x * ratio}px + 50% - ${(systemSize * ratio) / 2}px)`;
  const starSysTop = `calc(${system.position.y * ratio}px + 50% - ${(systemSize * ratio) / 2}px)`;
  const starSysSize = (systemSize * ratio);

  return (
    <div
      id={system.id + ''}
      ref={starSysRef}
      style={{
        top: starSysTop,
        left: starSysLeft,
        width: starSysSize + 'px',
        height: starSysSize + 'px',
        // border: '1px solid white',
        position: 'absolute',
        // overflow: 'hidden',
        // visibility: systemPosition ? 'visible' : 'hidden',
        // transition: 'all .2s ease-in-out'
      }}>
                    <div style={{ position: 'relative', left: starSysSize + 5, color: 'white', top: '50%' }}>{system.name} System - DTP: {distanceToPlayer().toFixed(0)}; x: {starSysPosX}; y: {starSysPosY}</div>

      {system.stars.map((star) => (
        <>
          <Star
            key={star.name} // Using name as the key since ID isn't in the interface
            star={star} // Pass the entire Star object
            active={activeSystem} // Pass active state to the star
            onFlyNear={() => onFlyNearStar?.(star.id)} // Trigger view change when flying near a star
            system={system} // Pass the entire StarSystem object
          />
          {zoom > scales.StarSystem && activeSystem && star.planets && star.planets.map((planet) => {
            return (
              <>
                <Planet key={planet.name} system={system} star={star} planet={planet} radius={planet.radius} color={planet.color || 'brown'} label={planet.name} />
                {zoom > scales.Star && planet.moons && planet.moons.map((moon) => (
                  <Moon key={moon.name} system={system} star={star} planet={planet} moon={moon} radius={moon.radius} color={moon.color || 'gray'} label={moon.name} />
                ))}
              </>
            )
          })}
        </>
      ))}
    </div>
  );
};

export default StarSystem;
