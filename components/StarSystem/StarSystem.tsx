// StarSystem.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { StarSystem as StarSystemType } from '../../utils/types/stellarBodies';
import { ratios, scales } from '../../utils/functions/zoom';
import { RootState } from '../../state/store';
import useApproach from '@/hooks/useApproach';
import StellarBody from '../StellarBody/StellarBody';
import { bodyValues } from '@/utils/functions/calculations';
import BodyData from '../BodyData/BodyData';
import { Star, Planet, Moon, StarVariantType, } from '@/utils/types/stellarBodies';
import { orbits } from '@/state/gameStateSlice';
import useAuCoordinates from '@/hooks/useAuCoordinates';


interface StarSystemProps {
  system: StarSystemType;
  key: string;
  onFlyNearStar?: (starId: number) => void; // Callback when flying near a star
  miniMap?: boolean; // Whether the star system is in the mini map
}

const StarSystem: React.FC<StarSystemProps> = ({ system, miniMap = false }) => {
  const zoom = useSelector((state: RootState) => state.gameState.zoom);
  const o = useSelector((state: RootState) => state.gameState.orbits);
  const dev = useSelector((state: RootState) => state.keyState.devDisplay.pressed);
  const ratio = ratios[zoom];

  const starSysRef = React.useRef<HTMLDivElement>(null);

  const useApproachProps = {
    ref: starSysRef,
    coords: { x: system.position.x * ratio, y: system.position.y * ratio },
    scale: scales.starSystem,
    type: orbits.system,
    name: system.name,
  };

  const { distanceToPlayer, activeSystem } = useApproach(useApproachProps);

  const bv = bodyValues({
    stellarData: { system },
    ratio,
    miniMap,
    dev
  });

  const { name, type } = bv;

  const { x, y } = useAuCoordinates({system, star: undefined, planet: undefined, moon: undefined}, orbits.system, ratio);

  if (o.system !== '' && o.system !== system.name) return null;

  return (
    <div
      key={system.name + '-starSystem'}
      id={system.id + ''}
      ref={starSysRef}
      style={{
        top: `calc(50% + ${system.position.y * ratio}px)`,
        left: `calc(50% + ${system.position.x * ratio}px)`,
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
        left={50}
        top={0}
        miniMap={miniMap}
        distance={distanceToPlayer()}
      />
      {system.stars.map((star: Star) => o.star !== '' && o.star !== system.stars[0].name ? '' : (
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
          {zoom > scales.galaxy && activeSystem && star.planets?.map((planet: Planet) => o.planet !== '' && o.planet !== planet.name ? '' : (
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
              {zoom > scales.star && planet.moons?.map((moon: Moon) => o.moon !== '' && o.moon !== moon.name ? '' : (
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
