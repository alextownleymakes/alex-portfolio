// StarSystem.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { scales } from '../../utils/functions/zoom';
import { RootState } from '../../state/store';
import useApproach from '@/hooks/useApproach';
import StellarBody from '../StellarBody/StellarBody';
import { bodyValues } from '@/utils/functions/calculations';
import BodyData from '../BodyData/BodyData';
import { orbits } from '@/state/gameStateSlice';
import useAuCoordinates from '@/hooks/useAuCoordinates';
import { StarSystemType, StarType, PlanetType, MoonType } from '@/utils/types/stellarTypes';
import GalacticCenter from '../GalacticCenter/GalacticCenter';
import StarComponent from '../StarComponent/StarComponent';


interface StarSystemProps {
  system: StarSystemType;
  // key: string;
  onFlyNearStar?: (starId: number) => void; // Callback when flying near a star
  miniMap?: boolean; // Whether the star system is in the mini map
  x: number;
  y: number;
}

const StarSystem: React.FC<StarSystemProps> = ({ system, miniMap = false, x, y }) => {
  console.log('StarSystem.tsx', system.name, x, y);
  const playerState = useSelector((state: RootState) => state.gameState);
  const zoom = useSelector((state: RootState) => state.gameState.zoom);
  const o = useSelector((state: RootState) => state.gameState.orbits);
  const dev = useSelector((state: RootState) => state.keyState.devDisplay.pressed);
  const ratio = useSelector((state: RootState) => state.gameState.ratio);

  const starSysRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    console.log('StarSystem.tsx', name, x, y);
  }, [x, y]);

  const useApproachProps = {
    ref: starSysRef,
    coords: { x, y },
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


  if (o.system !== '' && o.system !== system.name) return null;


  const distance = Math.sqrt(Math.pow(playerState.position.x - x, 2) + Math.pow(playerState.position.y - y, 2));

  // if (distance > 3000) return null;

  return (
    <div
      key={system.name + '-starSystem'}
      id={system.id + ''}
      ref={starSysRef}
      style={{
        top: `calc(50% + ${x}px)`,
        left: `calc(50% + ${y}px)`,
        width: 0,
        height: 0,
        position: 'absolute',
        overflow: 'visible',
      }}
    >
      <GalacticCenter />
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
      {system.stars.map((star: StarType) => (
        <StarComponent
          key={star.name}
          system={system}
          star={star}
          ratio={ratio}
          miniMap={miniMap}
          o={o}
          zoom={zoom}
          activeSystem={activeSystem}
        />
      ))}
      {/* {system.stars.map((star: StarType) => {
        if (o.star !== '' && o.star !== system.stars[0].name) return null
        
        const { x: starx, y: stary } = useAuCoordinates({data: { system, star }, type: 'star', ratio});
        if (Number.isNaN(starx) || Number.isNaN(stary)) return null;
        return (
        <React.Fragment key={`${star.name}-star`}> 
          <StellarBody
            key={`${star.name}-star`}
            star={star}
            system={system}
            miniMap={miniMap}
            type={'star'}
            scale={scales.star}
            variant={star.variant}
            x={starx}
            y={stary}
          />
          {zoom > scales.galaxy && activeSystem && star.planets?.map((planet: PlanetType) => {
            if (o.planet !== '' && o.planet !== planet.name) return null;
            const { x: planetx, y: planety } = useAuCoordinates({data: { system, star, planet }, type: 'planet', ratio});
            if (Number.isNaN(planetx) || Number.isNaN(planety)) return null;
            return (
            <React.Fragment key={`${planet.name}-planet`}>
              <StellarBody
                key={`${planet.name}-planet`}
                system={system}
                star={star}
                planet={planet}
                miniMap={miniMap}
                type={'planet'}
                scale={scales.planet}
                variant={planet.variant}
                x={planetx}
                y={planety}
              />
              {zoom > scales.starSystem && planet.moons?.map((moon: MoonType) => {
                if (o.moon !== '' && o.moon !== moon.name) return null;
                const { x: moonx, y: moony } = useAuCoordinates({ data: { system, star, planet, moon }, type: 'moon', ratio });
                if (Number.isNaN(moonx) || Number.isNaN(moony)) return null;
                return (
                <StellarBody
                  key={`${moon.name}-moon`} // Ensure each moon has a unique key
                  system={system}
                  star={star}
                  planet={planet}
                  moon={moon}
                  miniMap={miniMap}
                  type={'moon'}
                  scale={scales.moon}
                  variant='moon'
                  x={moonx}
                  y={moony}
                />
              )})}
            </React.Fragment>
          )})}
        </React.Fragment>
      )})} */}
    </div>
  );
};

export default StarSystem;
