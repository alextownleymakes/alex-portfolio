// StarSystem.tsx
import React from 'react';
import { useSelector } from 'react-redux';
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
  miniMap?: boolean; // Whether the star system is in the mini map
}

const StarSystem: React.FC<StarSystemProps> = ({ system, onFlyNearStar, miniMap = false }) => {
  const systemSize = useSelector((state: RootState) => state.gameState.galaxySize);
  const zoom = useSelector((state: RootState) => state.gameState.zoom);
  const dev = useSelector((state: RootState) => state.gameState.dev);
  const ratio = ratios[zoom];
  const starSysRef = React.useRef<HTMLDivElement>(null);

  const useApproachProps = {
    ref: starSysRef,
    coords: { x: system.position.x * ratio, y: system.position.y * ratio },
    scale: scales.Star,
  };
  const { distanceToPlayer, activeSystem } = useApproach(useApproachProps);

  const starSysLeft = `calc(${system.position.x * ratio}px + 50% - ${(systemSize * ratio) / 2}px)`;
  const starSysTop = `calc(${system.position.y * ratio}px + 50% - ${(systemSize * ratio) / 2}px)`;
  const starSysSize = systemSize * ratio;

  return (
    <div
      key={system.name + '-starSystem'}
      id={system.id + ''}
      ref={starSysRef}
      style={{
        top: starSysTop,
        left: starSysLeft,
        width: starSysSize + 'px',
        height: starSysSize + 'px',
        position: 'absolute',
      }}
    >
      <div style={{ position: 'relative', left: starSysSize + 5, color: 'white', top: '50%' }}>
        {system.name} System {dev && (`- DTP: ${distanceToPlayer().toFixed(0)}; x: ${system.position.x * ratio}; y: ${system.position.y * ratio}`)}
      </div>
      {system.stars.map((star) => (
        <React.Fragment key={`${star.name}-star`}> {/* Ensure each star has a unique key */}
          <Star
            key={`${star.name}-star`}
            star={star}
            active={activeSystem}
            onFlyNear={() => onFlyNearStar?.(star.id)}
            system={system}
            miniMap={miniMap}
          />
          {zoom > scales.StarSystem && activeSystem && star.planets?.map((planet) => (
            <React.Fragment key={`${planet.name}-planet`}> {/* Ensure each planet has a unique key */}
              <Planet
                key={`${planet.name}-planet`}
                system={system}
                star={star}
                planet={planet}
                radius={planet.radius}
                color={planet.color || 'brown'}
                label={planet.name}
                miniMap={miniMap}
              />
              {zoom > scales.Star && planet.moons?.map((moon) => (
                <Moon
                  key={`${moon.name}-moon`} // Ensure each moon has a unique key
                  system={system}
                  star={star}
                  planet={planet}
                  moon={moon}
                  radius={moon.radius}
                  color={moon.color || 'gray'}
                  label={moon.name}
                  miniMap={miniMap}
                />
              ))}
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StarSystem;
