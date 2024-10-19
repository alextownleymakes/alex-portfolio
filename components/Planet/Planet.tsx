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
}

const Planet: React.FC<PlanetProps> = ({ system, star, planet, radius, color }) => {

  const planetRef = React.useRef<HTMLDivElement>(null);
  const zoom = useSelector((state: RootState) => state.gameState.zoom);

  const [planetPosition, setPlanetPosition] = React.useState({
    x: star.position.x + planet.position.x,
    y: star.position.y + planet.position.y,
  });

  const { distanceToPlayer } = useApproach(planetRef, { x: (star.position.x + system.position.x + planet.position.x) * ratios[zoom], y: (star.position.y + system.position.y + planet.position.y) * ratios[zoom] }, scales.Planet);

  React.useEffect(() => {
    planetRef.current && planetRef.current.parentElement && setPlanetPosition({
      x: ((star.position.x + planet.position.x) * ratios[zoom]) + (planetRef.current?.parentElement?.offsetWidth / 2),
      y: ((star.position.y + planet.position.y) * ratios[zoom]) + (planetRef.current?.parentElement?.offsetWidth / 2),
    });
  }, [planetRef.current]);

  const planetLeft = `calc(${(star.position.x + planet.position.x) * ratios[zoom]}px + 50% - ${(star.radius * ratios[zoom]) / 2}px)`;
  const planetTop = `calc(${(star.position.y + planet.position.y) * ratios[zoom]}px + 50% - ${(star.radius * ratios[zoom]) / 2}px)`;
  console.log(planet.name, 'planetLeft', planetLeft, 'planetTop', planetTop)
  const planetSize = (radius * ratios[zoom]);
  return (
    <>
      <div
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
          // justifyContent: 'center',
          color: '#999',
          fontSize: '0.7rem',
          textTransform: 'uppercase',
        }}
      >
        <div style={{ position: 'relative', left: radius + 5 }}>{planet.name}, DTP: {distanceToPlayer()} </div>
      </div>
      {zoom > scales.Star && planet.moons && planet.moons.map((moon) => (
        <Moon key={moon.name} system={system} star={star} planet={planet} moon={moon} radius={moon.radius} color={moon.color || 'gray'} label={moon.name} />
      ))}
    </>
  );
};

export default Planet;