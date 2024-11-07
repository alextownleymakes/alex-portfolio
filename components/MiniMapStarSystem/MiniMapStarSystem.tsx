// MiniMapStarSystem.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { ratios, scales } from '../../utils/functions/zoom';
import { RootState } from '../../state/store';
import useApproach from '@/hooks/useApproach';
import StellarBody from '../StellarBody/StellarBody';
import { bodyValues } from '@/utils/functions/calculations';
import BodyData from '../BodyData/BodyData';
import { StarType, PlanetType, MoonType } from '@/utils/types/stellarTypes';
import { orbits } from '@/state/gameStateSlice';
import useAuCoordinates from '@/hooks/useAuCoordinates';

import { StarSystemType } from '@/utils/types/stellarTypes';



interface MiniMapStarSystemProps {
  system: StarSystemType;
  key: string;
  onFlyNearStar?: (starId: number) => void; // Callback when flying near a star
}

const MiniMapStarSystem: React.FC<MiniMapStarSystemProps> = ({ system }) => {
  const systemSize = useSelector((state: RootState) => state.gameState.galaxySize);
  const zoom = useSelector((state: RootState) => state.gameState.zoom);
  const ratio = ratios[zoom] / 10;

  const starSysRef = React.useRef<HTMLDivElement>(null);

  const { x, y, aX, aY} = useAuCoordinates({system}, orbits.system, ratio);
  if ( Number.isNaN(x) || Number.isNaN(y) || Number.isNaN(aX) || Number.isNaN(aY) ) {console.log('minimap starSystem', x, y, aX, aY)};
  if ( Number.isNaN(x) || Number.isNaN(y) || Number.isNaN(aX) || Number.isNaN(aY) ) return null;

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
      {system.stars.map((star: StarType) => (
        <React.Fragment key={`${star.name}-star-mm`}> {/* Ensure each star has a unique key */}
          <StellarBody
            key={`${star.name}-star`}
            star={star}
            system={system}
            type={'star'}
            scale={scales.star}
            variant={star.variant}
            miniMap={true}
          />
          {zoom > scales.starSystem && star.planets?.map((planet: PlanetType) => (
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
                />
              {zoom > scales.star && planet.moons?.map((moon: MoonType) => (
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
