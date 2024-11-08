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
  miniMap: boolean;
  o: any;
}

const MoonComponent: React.FC<MoonComponentProps> = ({
  system,
  star,
  planet,
  moon,
  miniMap,
  o,
}) => {
  if (o.moon !== '' && o.moon !== moon.name) return null;

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
      x={moon.position.x}
      y={moon.position.y}
    />
  );
};

export default MoonComponent;
