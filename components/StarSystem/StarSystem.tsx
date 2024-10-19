// StarSystem.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Star from '../Star/Star';
import { StarSystem as StarSystemType } from '../../utils/types/stellarBodies';
import { ratios } from '../../utils/functions/zoom';
import { RootState } from '../../state/store';
import useApproach from '@/hooks/useApproach';


interface StarSystemProps {
  system: StarSystemType;
  key: string;
  onFlyNearStar?: (starId: number) => void; // Callback when flying near a star
}

const StarSystem: React.FC<StarSystemProps> = ({ system, onFlyNearStar }) => {

  const { position } = system;

  const zoom = useSelector((state: RootState) => state.gameState.zoom);
  const universeSize = useSelector((state: RootState) => state.gameState.universeSize);
  const galaxySize = useSelector((state: RootState) => state.gameState.galaxySize);
  
  const [systemSize, setSystemSize] = React.useState(galaxySize * ratios[zoom]);
  const [systemPosition, setSystemPosition] = React.useState({
    x: (position.x * ratios[zoom]) + ((universeSize * ratios[zoom]) / 2) - (systemSize / 2),
    y: (position.y * ratios[zoom]) + ((universeSize * ratios[zoom]) / 2) - (systemSize / 2),
  });

  const systemRef = useRef<HTMLDivElement>(null);
  const { distanceToPlayer } =  useApproach(systemRef, { x: (position.x * ratios[zoom]), y: (position.y * ratios[zoom]) });

  const dist = distanceToPlayer();

  useEffect(() => {
    setSystemSize(galaxySize * ratios[zoom]);
    setSystemPosition({
      x: (position.x * ratios[zoom]) + ((universeSize * ratios[zoom]) / 2) - ((galaxySize * ratios[zoom]) / 2),
      y: (position.y * ratios[zoom]) + ((universeSize * ratios[zoom]) / 2) - ((galaxySize * ratios[zoom]) / 2),
    });
  }, [zoom]);

  return (
    <div
    id={system.id + ''}
      ref={systemRef}
      style={{
        top: systemPosition.y + 'px',
        left: systemPosition.x + 'px',
        width: systemSize + 'px',
        height: systemSize + 'px',
        border: '1px solid white',
        position: 'absolute',
        overflow: 'hidden',
        // visibility: systemPosition ? 'visible' : 'hidden',
        // transition: 'all .2s ease-in-out'
      }}>
        <div>Distance to player: {dist}</div>
      {system.stars.map((star) => (
        <Star
          key={star.name} // Using name as the key since ID isn't in the interface
          star={star} // Pass the entire Star object
          // active={activeSystem} // Pass active state to the star
          onFlyNear={() => onFlyNearStar?.(star.id)} // Trigger view change when flying near a star
        />
      ))}
    </div>
  );
};

export default StarSystem;