// StarSystem.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { orbits } from '@/state/gameStateSlice';
import useApproach from '@/hooks/useApproach';
import { scales } from '@/utils/functions/zoom';
import { StellarType } from '@/utils/types/stellarTypes';
import BodyData from '@/components/StellarComponents/BodyData/BodyData';
import GalacticCenter from '@/components/GalacticCenter/GalacticCenter';
import BodyComponent from '@/components/StellarComponents/BodyComponent/BodyComponent';
import { StellarBodyType } from '@/utils/types/stellarTypes';

interface SystemProps {
  system: StellarType;
  type: string;
  onFlyNearStar?: (starId: number) => void; // Callback when flying near a star
  mm?: boolean; // Whether the star system is in the mini map
  x: number;
  y: number;
}

const System: React.FC<SystemProps> = ({ system, mm = false, x, y, type }) => {
  const zoom = useSelector((state: RootState) => state.gameState.zoom);
  const o = useSelector((state: RootState) => state.gameState.orbits);
  const scale = useSelector((state: RootState) => state.gameState.scale);

  const starSysRef = React.useRef<HTMLDivElement>(null);

  const { name } = system;

  const useApproachProps = {
    ref: starSysRef,
    coords: { x, y },
    scale: scales.galaxy,
    type: orbits.system,
    name: system.name,
    approach: Math.min(10 * scale, 10),
    recede: Math.min(12 * scale, 600),
  };

  type BodyTypesType = 'star' | 'planet' | 'moon';

  const bodyTypes: { [key in BodyTypesType]: BodyTypesType } = {
    star: 'star',
    planet: 'planet',
    moon: 'moon',
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
        width: 200,
        height: 200,
        position: 'absolute',
        overflow: 'visible',
        border: '1px solid red',
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
    {system.children?.map((child: StellarBodyType) => (
      // <StellarBody
      //   key={child.name}
      //   system={system}
      //   body={child}
      //   mm={mm}
      //   type={child.type}
      // />
      <BodyComponent
        key={child.name}
        system={system}
        body={child}
        type={child.type}
        mm={mm}
        zoom={zoom}
        activeSystem={activeSystem}
      />
    ))}
    </>
  );
};

export default System;
