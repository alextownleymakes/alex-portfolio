import React from 'react';
import { useSelector } from 'react-redux';
import { StarSystem as StarSystemType, Star as StarType, Planet as PlanetType, Moon as MoonType } from '../../utils/types/stellarBodies';
import { ratios, scales } from '../../utils/functions/zoom';
import { RootState } from '../../state/store';
import useApproach from '@/hooks/useApproach';


interface MoonProps {
  system: StarSystemType;
  planet: PlanetType;
  star: StarType;
  moon: MoonType;
  radius: number; // Size of the planet
  color: string; // Planet color
  label: string; // Label for the planet (e.g., "Home", "Projects", etc.)
}

const Planet: React.FC<MoonProps> = ({ system, star, planet, moon, radius, color }) => {

  const moonRef = React.useRef<HTMLDivElement>(null);
  const zoom = useSelector((state: RootState) => state.gameState.zoom);

  const [moonPosition, setMoonPosition] = React.useState({
    x: star.position.x + planet.position.x,
    y: star.position.y + planet.position.y,
  });

  const { distanceToPlayer } = useApproach(moonRef, { x: (star.position.x + system.position.x + planet.position.x + moon.position.x) * ratios[zoom], y: (star.position.y + system.position.y + planet.position.y + moon.position.y) * ratios[zoom] }, scales.Moon);

  React.useEffect(() => {
    moonRef.current && moonRef.current.parentElement && setMoonPosition({
      x: ((star.position.x + planet.position.x) * ratios[zoom]) + (moonRef.current?.parentElement?.offsetWidth / 2),
      y: ((star.position.y + planet.position.y) * ratios[zoom])+ (moonRef.current?.parentElement?.offsetWidth / 2),
    });
  }, [moonRef.current]);

  const moonLeft = `calc(${(star.position.x + planet.position.x + moon.position.x) * ratios[zoom]}px + 50% - ${(star.radius * ratios[zoom]) / 2}px)`;
  const moonTop = `calc(${(star.position.y + planet.position.y) * ratios[zoom]}px + 50% - ${(star.radius * ratios[zoom]) / 2}px)`;
  const moonSize = (radius * ratios[zoom]);
  return (
    <div
    id={moon.name}
    ref={moonRef}
      style={{
        position: 'absolute',
        left: `${moonLeft}`, // Use pixel-based position for accuracy
        top: `${moonTop}`,
        width: `${moonSize}px`, // Set the planet's size
        height: `${moonSize}px`,
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
      <div style={{position: 'relative', left: radius+5}}>{moon.name}, DTP: {distanceToPlayer()} </div>
    </div>
  );
};

export default Planet;