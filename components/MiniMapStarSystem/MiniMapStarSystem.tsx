// MiniMapStarSystem.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { scales } from '../../utils/functions/zoom';
import { RootState } from '../../state/store';
import StellarBody from '../StellarBody/StellarBody';
import { StarType, PlanetType, MoonType } from '@/utils/types/stellarTypes';
import useAuCoordinates from '@/hooks/useAuCoordinates';

import { StarSystemType } from '@/utils/types/stellarTypes';



interface MiniMapStarSystemProps {
  system: StarSystemType;
  x: number;
  y: number;
  key: string;
  onFlyNearStar?: (starId: number) => void; // Callback when flying near a star
}

const MiniMapStarSystem: React.FC<MiniMapStarSystemProps> = ({ system, x, y }) => {
  const systemSize = useSelector((state: RootState) => state.gameState.galaxySize);
  const zoom = useSelector((state: RootState) => state.gameState.zoom);
  const ratioBase = useSelector((state: RootState) => state.gameState.scale);
  const ratio = ratioBase / 10;

  const starSysRef = React.useRef<HTMLDivElement>(null);

  if (Number.isNaN(x) || Number.isNaN(y)) return null;

  const starSysLeft = `calc(${x}px + 50%)`;
  const starSysTop = `calc(${y}px + 50%)`;
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
      {system.stars.map((star: StarType) => {
        const { x: starx, y: stary } = useAuCoordinates({ data: { system, star }, type: 'star', ratio });
        if (Number.isNaN(starx) || Number.isNaN(stary)) return null;
        return (
          <React.Fragment key={`${star.name}-star-mm`}> {/* Ensure each star has a unique key */}
            <StellarBody
              key={`${star.name}-star`}
              star={star}
              system={system}
              type={'star'}
              scale={scales.star}
              variant={star.variant}
              miniMap={true}
              x={starx}
              y={stary}
            />
            {zoom > scales.starSystem && star.planets?.map((planet: PlanetType) => {
              const { x: planetx, y: planety } = useAuCoordinates({ data: { system, star, planet }, type: 'planet', ratio });
              if (Number.isNaN(planetx) || Number.isNaN(planety)) return null;
              return (
                <React.Fragment key={`${planet.name}-planet-mm`}> {/* Ensure each planet has a unique key */}
                  <StellarBody
                    key={`${planet.name}-planet`}
                    system={system}
                    star={star}
                    planet={planet}
                    type={'planet'}
                    scale={scales.planet}
                    variant={planet.variant}
                    miniMap={true}
                    x={planetx}
                    y={planety}
                  />
                  {zoom > scales.star && planet.moons?.map((moon: MoonType) => {
                    const { x: moonx, y: moony } = useAuCoordinates({ data: { system, star, planet, moon }, type: 'moon', ratio });
                    if (Number.isNaN(moonx) || Number.isNaN(moony)) return null;
                    return (
                      <StellarBody
                        key={`${moon.name}-moon`} // Ensure each moon has a unique key
                        system={system}
                        star={star}
                        planet={planet}
                        moon={moon}
                        type={'moon'}
                        scale={scales.moon}
                        miniMap={true}
                        variant='moon'
                        x={moonx}
                        y={moony}
                      />
                    )
                  })}
                </React.Fragment>
              )
            })}
          </React.Fragment>
        )
      })}
    </div>
  );
};

export default MiniMapStarSystem;
