// PlanetComponent.tsx
import React from 'react';
import StellarBody from '../StellarBody/StellarBody';
import MoonComponent from '../MoonComponent/MoonComponent';
import { StarSystemType, StarType, PlanetType, MoonType } from '@/utils/types/stellarTypes';

interface PlanetComponentProps {
  system: StarSystemType;
  star: StarType;
  planet: PlanetType;
  mm: boolean;
  o: any;
  zoom: number;
}

const PlanetComponent: React.FC<PlanetComponentProps> = ({
  system,
  star,
  planet,
  mm,
  o,
  zoom,
}) => {
  if (o.planet !== '' && o.planet !== planet.name) return null;
  return (
    <>
      <StellarBody
        planet={planet}
        star={star}
        system={system}
        mm={mm}
        type={'planet'}
        variant={planet.variant}
        x={planet.position.x}
        y={planet.position.y}
      />
      {zoom > 2 &&
        planet.moons?.map((moon: MoonType) => (
          <MoonComponent
            key={moon.name}
            system={system}
            star={star}
            planet={planet}
            moon={moon}
            mm={mm}
            o={o}
          />
        ))}
    </>
  );
};

export default PlanetComponent;
