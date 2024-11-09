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
  const zoom = useSelector((state: RootState) => state.gameState.zoom);
  const o = useSelector((state: RootState) => state.gameState.orbits);

  const starSysRef = React.useRef<HTMLDivElement>(null);

  const { name } = system;

  const useApproachProps = {
    ref: starSysRef,
    coords: { x, y },
    scale: scales.galaxy,
    type: orbits.system,
    name: system.name,
  };

  const { distanceToPlayer, activeSystem } = useApproach(useApproachProps);

  if (o.system !== '' && o.system !== system.name) return null;

  return (
    <>
    <div
      key={system.name + '-starSystem'}
      id={system.id + ''}
      ref={starSysRef}
      style={{
        top: `calc(${y}px + 50%)`,
        left: `calc(${x}px + 50%)`,
        width: 0,
        height: 0,
        position: 'absolute',
        overflow: 'visible',
      }}
    >
      <GalacticCenter />
      <BodyData
        name={name}
        type={'system'}
        x={x}
        y={y}
        left={50}
        top={0}
        miniMap={miniMap}
        distance={distanceToPlayer()}
      />
      
    </div>
    {system.stars.map((star: StarType) => (
      <StarComponent
        key={star.name}
        system={system}
        star={star}
        miniMap={miniMap}
        o={o}
        zoom={zoom}
        activeSystem={activeSystem}
      />
    ))}
    </>
  );
};

export default StarSystem;
