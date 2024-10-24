// StarSystem.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Moon, Planet, Star, StarSystem as StarSystemType } from '../../utils/types/stellarBodies';
import { ratios, scales } from '../../utils/functions/zoom';
import { RootState } from '../../state/store';
import StellarBody from '../StellarBody/StellarBody';


interface MiniMapStarSystemProps {
  system: StarSystemType;
  key: string;
  onFlyNearStar?: (starId: number) => void; // Callback when flying near a star
}

const MiniMapStarSystem: React.FC<MiniMapStarSystemProps> = ({ system, onFlyNearStar }) => {
  const systemSize = useSelector((state: RootState) => state.gameState.galaxySize);
  const zoom = useSelector((state: RootState) => state.gameState.zoom);
  const ratio = ratios[zoom] / 10;

  const starSysRef = React.useRef<HTMLDivElement>(null);

  const starSysLeft = `calc(${system.position.x * ratio}px + 50% - ${(systemSize * ratio) / 2}px)`;
  const starSysTop = `calc(${system.position.y * ratio}px + 50% - ${(systemSize * ratio) / 2}px)`;
  const starSysSize = systemSize * ratio;

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
      {system.stars.map((star: Star) => (
        <React.Fragment key={`${star.name}-star-mm`}> {/* Ensure each star has a unique key */}
          <StellarBody
            key={`${star.name}-star`}
            star={star}
            system={system}
            type={star.type}
            scale={scales.star}
            variant={star.variant}
            miniMap={true}
          />
          {zoom > scales.starSystem && star.planets?.map((planet: Planet) => (
              <React.Fragment key={`${planet.name}-planet-mm`}> {/* Ensure each planet has a unique key */}
                <StellarBody
                  key={`${planet.name}-planet`}
                  system={system}
                  star={star}
                  planet={planet}
                  type={planet.type}
                  scale={scales.planet}
                  variant={planet.variant}
                  miniMap={true}
                />
              {zoom > scales.star && planet.moons?.map((moon: Moon) => (
                  planet.moons &&
                  planet.moons.map((moon) => (
                    <StellarBody
                      key={`${moon.name}-moon`} // Ensure each moon has a unique key
                      system={system}
                      star={star}
                      planet={planet}
                      moon={moon}
                      type={moon.type}
                      scale={scales.moon}
                      miniMap={true}
                    />
                  ))))}
              </React.Fragment>
            ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default MiniMapStarSystem;
