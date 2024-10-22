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
  miniMap?: boolean; // Whether the star is in the mini map
}

const Moon: React.FC<MoonProps> = ({ system, star, planet, moon, radius, color, miniMap = false }) => {

  const moonRef = React.useRef<HTMLDivElement>(null);
  const zoom = useSelector((state: RootState) => state.gameState.zoom);
  const dev = useSelector((state: RootState) => state.gameState.dev);
  const ratio = !miniMap ? ratios[zoom] : ratios[zoom] / 10;

  const useApproachProps = {
    ref: moonRef,
    coords: { x: (star.position.x + system.position.x + planet.position.x + moon.position.x) * ratio, y: (star.position.y + system.position.y + planet.position.y + moon.position.y) * ratio },
    scale: scales.Moon,
    miniMap
  }

  const { distanceToPlayer } = useApproach(useApproachProps);

  const moonLeft = `calc(${(star.position.x + planet.position.x + moon.position.x) * ratio}px + 50% - ${(moon.radius * ratio) / 2}px)`;
  const moonTop = `calc(${(star.position.y + planet.position.y + moon.position.y) * ratio}px + 50% - ${(moon.radius * ratio) / 2}px)`;

  const moonPosX = ((star.position.x + planet.position.x + moon.position.x) * ratio)
  const moonPosY = ((star.position.y + planet.position.y + moon.position.y) * ratio);
  const moonSize = (radius * ratio);
  return (
    <div
      key={moon.name + miniMap ? '-mm' : ''}
      id={moon.name}
      ref={moonRef}
      style={{
        position: 'absolute',
        left: `${moonLeft}`, // Use pixel-based position for accuracy
        top: `${moonTop}`,
        width: `${moonSize}px`, // Set the planet's size
        height: `${moonSize}px`,
        backgroundColor: miniMap ? 'transparent' : color,
        border: miniMap ? `2px solid ${color}` : 'none',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        color: '#999',
        fontSize: '0.7rem',
        textTransform: 'uppercase',
      }}
    >
      {!miniMap && (
        <div style={{ position: 'relative', left: radius + 5 }}>{moon.name}, {dev && (`- DTP: ${distanceToPlayer().toFixed(0)}; x: ${moonPosX}; y: ${moonPosY}`)}</div>
      )}
    </div>
  );
};

export default Moon;