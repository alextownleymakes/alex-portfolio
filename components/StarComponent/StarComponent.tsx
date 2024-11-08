// StarComponent.tsx
import React from 'react';
import useAuCoordinates from '@/hooks/useAuCoordinates';
import StellarBody from '../StellarBody/StellarBody';
import PlanetComponent from '../PlanetComponent/PlanetComponent';
import { StarSystemType, StarType, PlanetType } from '@/utils/types/stellarTypes';
import { scales } from '@/utils/functions/zoom';

interface StarComponentProps {
  system: StarSystemType;
  star: StarType;
  miniMap: boolean;
  o: any;
  zoom: number;
  activeSystem: boolean;
}

const StarComponent: React.FC<StarComponentProps> = ({
  system,
  star,
  miniMap,
  o,
  zoom,
  activeSystem,
}) => {
  if (o.star !== '' && o.star !== system.stars[0].name) return null;

  return (
    <>
      <StellarBody
        star={star}
        system={system}
        miniMap={miniMap}
        type={'star'}
        scale={scales.starSystem}
        variant={star.variant}
        x={star.position.x}
        y={star.position.y}
      />
      {zoom > scales.galaxy &&
        activeSystem &&
        star.planets?.map((planet: PlanetType) => (
          <PlanetComponent
            key={planet.name}
            system={system}
            star={star}
            planet={planet}
            miniMap={miniMap}
            o={o}
            zoom={zoom}
          />
        ))}
    </>
  );
};

export default StarComponent;
