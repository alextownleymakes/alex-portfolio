// MoonComponent.tsx
import React from 'react';
import useAuCoordinates from '@/hooks/useAuCoordinates';
import StellarBody from '../StellarBody/StellarBody';
import { StarSystemType, StarType, PlanetType, MoonType } from '@/utils/types/stellarTypes';
import { scales } from '@/utils/functions/zoom';

interface MoonComponentProps {
  system: StarSystemType;
  star: StarType;
  planet: PlanetType;
  moon: MoonType;
  ratio: number;
  miniMap: boolean;
  o: any;
}

const MoonComponent: React.FC<MoonComponentProps> = ({
  system,
  star,
  planet,
  moon,
  ratio,
  miniMap,
  o,
}) => {
  if (o.moon !== '' && o.moon !== moon.name) return null;

  const { x: moonx, y: moony } = useAuCoordinates({ data: { system, star, planet, moon }, type: 'moon', ratio });
  if (Number.isNaN(moonx) || Number.isNaN(moony)) return null;

  return (
    <StellarBody
      moon={moon}
      planet={planet}
      star={star}
      system={system}
      miniMap={miniMap}
      type={'moon'}
      scale={scales.planet}
      variant="moon"
      x={moonx}
      y={moony}
    />
  );
};

export default MoonComponent;
