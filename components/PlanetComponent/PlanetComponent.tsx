// PlanetComponent.tsx
import React from 'react';
import useAuCoordinates from '@/hooks/useAuCoordinates';
import StellarBody from '../StellarBody/StellarBody';
import MoonComponent from '../MoonComponent/MoonComponent';
import { StarSystemType, StarType, PlanetType, MoonType } from '@/utils/types/stellarTypes';
import { scales } from '@/utils/functions/zoom';

interface PlanetComponentProps {
  system: StarSystemType;
  star: StarType;
  planet: PlanetType;
  ratio: number;
  miniMap: boolean;
  o: any;
  zoom: number;
}

const PlanetComponent: React.FC<PlanetComponentProps> = ({
  system,
  star,
  planet,
  ratio,
  miniMap,
  o,
  zoom,
}) => {
  if (o.planet !== '' && o.planet !== planet.name) return null;

  const { x: planetx, y: planety } = useAuCoordinates({ data: { system, star, planet }, type: 'planet', ratio });
  if (Number.isNaN(planetx) || Number.isNaN(planety)) return null;

  return (
    <>
      <StellarBody
        planet={planet}
        star={star}
        system={system}
        miniMap={miniMap}
        type={'planet'}
        scale={scales.planet}
        variant={planet.variant}
        x={planetx}
        y={planety}
      />
      {zoom > scales.starSystem &&
        planet.moons?.map((moon: MoonType) => (
          <MoonComponent
            key={moon.name}
            system={system}
            star={star}
            planet={planet}
            moon={moon}
            ratio={ratio}
            miniMap={miniMap}
            o={o}
          />
        ))}
    </>
  );
};

export default PlanetComponent;
