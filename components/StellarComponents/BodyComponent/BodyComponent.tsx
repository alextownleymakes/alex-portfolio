// StarComponent.tsx
import React from 'react';
import useAuCoordinates from '@/hooks/useAuCoordinates';
import StellarBody from '../StellarBody/StellarBody';
import { StellarType, StellarBodyType, StarType, PlanetType, MoonType } from '@/utils/types/stellarTypes';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import BodyComponent from '../BodyComponent/BodyComponent';

export type BodyTypesType = 'system' | 'star' | 'planet' | 'moon' | 'comet' | 'asteroid';

export interface BodyComponentProps {
  system: StellarType;
  body: StellarBodyType;
  type: BodyTypesType;
  mm: boolean;
  zoom: number;
  activeSystem: boolean;
}

const StarComponent: React.FC<BodyComponentProps> = ({
  system,
  body,
  type,
  mm,
  zoom,
  activeSystem,
}) => {

  const o = useSelector((state: RootState) => state.gameState.orbits);

  if (o[type] !== '' && o[type] !== body.name) return null;

  return (
    <>
      <StellarBody
        system={system}
        body={body}
        type={type}
        mm={mm}
        x={body.position.x}
        y={body.position.y}
        variant={body.variant}
      />
      {zoom > 0 &&
        activeSystem &&
        system.children?.map((child: StellarBodyType) => (
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

export default StarComponent;
