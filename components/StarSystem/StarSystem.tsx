// StarSystem.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { StarSystem as StarSystemType } from '../../utils/types/stellarBodies';
import { ratios, scales } from '../../utils/functions/zoom';
import { RootState } from '../../state/store';
import useApproach from '@/hooks/useApproach';
import StellarBody from '../StellarBody/StellarBody';
import { bodies, BodyTypes, bodyValues } from '@/utils/functions/calculations';
import BodyData from '../BodyData/BodyData';
import { Star, Planet, Moon, Asteroid, AsteroidBelt, PlanetVariants, StarVariants, StellarBodies, StarVariantType, PlanetVariantType } from '@/utils/types/stellarBodies';


interface StarSystemProps {
  system: StarSystemType;
  key: string;
  onFlyNearStar?: (starId: number) => void; // Callback when flying near a star
  miniMap?: boolean; // Whether the star system is in the mini map
}

const StarSystem: React.FC<StarSystemProps> = ({ system, miniMap = false }) => {
  const zoom = useSelector((state: RootState) => state.gameState.zoom);
  const dev = useSelector((state: RootState) => state.gameState.dev);
  const ratio = ratios[zoom];
  const starSysRef = React.useRef<HTMLDivElement>(null);

  const useApproachProps = {
    ref: starSysRef,
    coords: { x: system.position.x * ratio, y: system.position.y * ratio },
    scale: scales.starSystem,
  };
  const { distanceToPlayer, activeSystem } = useApproach(useApproachProps);

  const bv = bodyValues({
    stellarData: { system },
    ratio,
    miniMap,
  });

  const { name, type, x, y, left, top, dLeft, dTop } = bv;

  return (
    <div
      key={system.name + '-starSystem'}
      id={system.id + ''}
      ref={starSysRef}
      style={{
        top,
        left,
        width: 0,
        height: 0,
        position: 'absolute',
        overflow: 'visible',
      }}
    >
      <BodyData
        name={name}
        type={type}
        x={x}
        y={y}
        left={dLeft}
        top={dTop}
        dev={dev} 
        miniMap={miniMap}
        distanceToPlayer={distanceToPlayer}
      />
      {system.stars.map((star: Star) => (
        <React.Fragment key={`${star.name}-star`}> {/* Ensure each star has a unique key */}
          <StellarBody
            key={`${star.name}-star`}
            star={star}
            system={system}
            miniMap={miniMap}
            type={star.type}
            scale={scales.star}
            variant={star.variant as StarVariantType}
          />
          {zoom > scales.starSystem && activeSystem && star.planets?.map((planet: Planet) => (
            <React.Fragment key={`${planet.name}-planet`}> {/* Ensure each planet has a unique key */}
              <StellarBody
                key={`${planet.name}-planet`}
                system={system}
                star={star}
                planet={planet}
                miniMap={miniMap}
                type={planet.type}
                scale={scales.planet}
                variant={planet.variant}
              />
              {zoom > scales.star && planet.moons?.map((moon: Moon) => (
                <StellarBody
                  key={`${moon.name}-moon`} // Ensure each moon has a unique key
                  system={system}
                  star={star}
                  planet={planet}
                  moon={moon}
                  miniMap={miniMap}
                  type={moon.type}
                  scale={scales.moon}
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

export default StarSystem;
