// MoonComponent.tsx
import React from 'react';
import StellarBody from '../StellarBody/StellarBody';
import { StarSystemType, StarType, PlanetType, MoonType } from '@/utils/types/stellarTypes';
import { scales } from '@/utils/functions/zoom';

interface MoonComponentProps {
  system: StarSystemType;
  star: StarType;
  planet: PlanetType;
  moon: MoonType;
  mm: boolean;
  o: any;
}

const MoonComponent: React.FC<MoonComponentProps> = ({
  system,
  star,
  planet,
  moon,
  mm,
  o,
}) => {
  if (o.moon !== '' && o.moon !== moon.name) return null;

  return (
    <StellarBody
      moon={moon}
      planet={planet}
      star={star}
      system={system}
      mm={mm}
      type={'moon'}
      variant="moon"
      x={moon.position.x}
      y={moon.position.y}
    />
  );
};

export default MoonComponent;
