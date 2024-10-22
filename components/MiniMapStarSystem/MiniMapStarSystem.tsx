// StarSystem.tsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Star from '../Star/Star';
import Planet from '../Planet/Planet';
import { StarSystem as StarSystemType } from '../../utils/types/stellarBodies';
import { ratios, scales } from '../../utils/functions/zoom';
import { RootState } from '../../state/store';
import Moon from '../Moon/Moon';


interface MiniMapStarSystemProps {
  system: StarSystemType;
  key: string;
  onFlyNearStar?: (starId: number) => void; // Callback when flying near a star
}

const MiniMapStarSystem: React.FC<MiniMapStarSystemProps> = ({ system, onFlyNearStar }) => {
  const systemSize = 125;
  const zoom = useSelector((state: RootState) => state.gameState.zoom);
  const ratio = ratios[zoom] / 10;

  const starSysRef = React.useRef<HTMLDivElement>(null);

  const starSysLeft = `calc(${system.position.x * ratio}px + 50% - ${(systemSize * ratio) / 2}px)`;
  const starSysTop = `calc(${system.position.y * ratio}px + 50% - ${(systemSize * ratio) / 2}px)`;
  const starSysSize = systemSize * ratio;

  useEffect(() => {
    console.log('ratio: ', ratio);
  }, [ratio]);

  return (
    <div
      key={`${system.name}-starSystem-mm`} // Using a unique key for each system
      id={system.id + ''}
      ref={starSysRef}
      style={{
        top: starSysTop,
        left: starSysLeft,
        width: `${starSysSize}px`,
        height: `${starSysSize}px`,
        position: 'absolute',
      }}
    >
      {system.stars.map((star) => (
        <React.Fragment key={`${star.name}-star-mm`}> {/* Ensure each star has a unique key */}
          <Star
            key={`${star.name}-star`} // Using star's name with a suffix as a unique key
            star={star}
            active={true}
            onFlyNear={() => onFlyNearStar?.(star.id)}
            system={system}
            miniMap={true}
          />
          {zoom > scales.Galaxy &&
            star.planets &&
            star.planets.map((planet) => (
              <React.Fragment key={`${planet.name}-planet-mm`}> {/* Ensure each planet has a unique key */}
                <Planet
                  key={`${planet.name}-planet`} // Using planet's name with a suffix as a unique key
                  system={system}
                  star={star}
                  planet={planet}
                  radius={planet.radius}
                  color={planet.color || 'brown'}
                  label={planet.name}
                  miniMap={true}
                />
                {zoom > scales.StarSystem &&
                  planet.moons &&
                  planet.moons.map((moon) => (
                    <Moon
                      key={`${moon.name}-moon`} // Using moon's name with a suffix as a unique key
                      system={system}
                      star={star}
                      planet={planet}
                      moon={moon}
                      radius={moon.radius}
                      color={moon.color || 'gray'}
                      label={moon.name}
                      miniMap={true}
                    />
                  ))}
              </React.Fragment>
            ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default MiniMapStarSystem;
