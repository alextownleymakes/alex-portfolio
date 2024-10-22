import React from 'react';
import { useSelector } from 'react-redux';
import { StarSystem as StarSystemType, Star as StarType, Planet as PlanetType } from '../../utils/types/stellarBodies';
import { ratios, scales } from '../../utils/functions/zoom';
import { RootState } from '../../state/store';
import useApproach from '@/hooks/useApproach';
import Moon from '../Moon/Moon';


interface PlanetProps {
  system: StarSystemType;
  planet: PlanetType;
  star: StarType;
  radius: number; // Size of the planet
  color: string; // Planet color
  label: string; // Label for the planet (e.g., "Home", "Projects", etc.)
  miniMap?: boolean;
}

const Planet: React.FC<PlanetProps> = ({ system, star, planet, radius, color, miniMap = false }) => {

  const zoom = useSelector((state: RootState) => state.gameState.zoom);
  const ratio = !miniMap ? ratios[zoom] : ratios[zoom] / 4;

  const planetRef = React.useRef<HTMLDivElement>(null);

  const useApproachProps = {
    ref: planetRef,
    coords: { x: (star.position.x + system.position.x + planet.position.x) * ratio, y: (star.position.y + system.position.y + planet.position.y) * ratio },
    scale: scales.Planet,
    miniMap
  };

  const { distanceToPlayer } = useApproach(useApproachProps);

  const planetPosX = ((system.position.x + star.position.x + planet.position.x) * ratio);
  const planetPosY = ((system.position.y + star.position.y + planet.position.y) * ratio);
  const planetLeft = `calc(${(star.position.x + planet.position.x) * ratio}px + 50% - ${(planet.radius * ratio) / 2}px)`;
  const planetTop = `calc(${(star.position.y + planet.position.y) * ratio}px + 50% - ${(planet.radius * ratio) / 2}px)`;

  const planetSize = (radius * ratio);
  return (
    <>
      <div
        key={planet.name + miniMap ? '-mm' : ''}
        id={planet.name}
        ref={planetRef}
        style={{
          position: 'absolute',
          left: `${planetLeft}`, // Use pixel-based position for accuracy
          top: `${planetTop}`,
          width: `${planetSize}px`, // Set the planet's size
          height: `${planetSize}px`,
          backgroundColor: color, // Set the planet's color
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          color: '#999',
          fontSize: '0.7rem',
          textTransform: 'uppercase',
        }}
      >
        {!miniMap && (
          <div style={{ position: 'relative', left: radius + 5 }}>{planet.name}, DTP: {distanceToPlayer().toFixed(0)}; x: {planetPosX}, y: {planetPosY} </div>
        )}
      </div>
    </>
  );
};

export default Planet;