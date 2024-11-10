// StarSystem.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { orbits } from '@/state/gameStateSlice';
import useApproach from '@/hooks/useApproach';
import { scales } from '@/utils/functions/zoom';
import { StarSystemType, StarType} from '@/utils/types/stellarTypes';
import BodyData from '@/components/StellarComponents/BodyData/BodyData';
import GalacticCenter from '@/components/GalacticCenter/GalacticCenter';
import StarComponent from '@/components/StellarComponents/StarComponent/StarComponent';


interface SystemProps {
  system: StarSystemType;
  // key: string;
  onFlyNearStar?: (starId: number) => void; // Callback when flying near a star
  mm?: boolean; // Whether the star system is in the mini map
  x: number;
  y: number;
}

const System: React.FC<SystemProps> = ({ system, mm = false, x, y }) => {
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
        mm={mm}
        distance={distanceToPlayer()}
      />
      
    </div>
    {system.stars.map((star: StarType) => (
      <StarComponent
        key={star.name}
        system={system}
        star={star}
        mm={mm}
        o={o}
        zoom={zoom}
        activeSystem={activeSystem}
      />
    ))}
    </>
  );
};

export default System;
