import React from 'react';
import useApproach, { UseApproachProps } from '@/hooks/useApproach';
import { useSelector } from 'react-redux';
import { StarSystem as StarSystemType, Star as StarType, Planet as PlanetType, Moon as MoonType, StellarBodyType, StarVariantType, PlanetVariantType } from '../../utils/types/stellarBodies';
import { ratios } from '../../utils/functions/zoom';
import { RootState } from '../../state/store';
import { StellarDataType, BodyValuesProps, bodyValues } from '@/utils/functions/calculations';
import BodyData from '../BodyData/BodyData';
import styles from './StellarBody.module.scss';  // Importing the CSS Module

interface StellarBodyProps {
  system?: StarSystemType;
  planet?: PlanetType;
  star?: StarType;
  moon?: MoonType;
  miniMap?: boolean; // Whether the star is in the mini map
  scale: number;
  type: StellarBodyType;
  variant?: PlanetVariantType | StarVariantType | 'moon';
}

const StellarBody: React.FC<StellarBodyProps> = ({ system, star, planet, moon, type, scale, variant, miniMap = false }) => {

  const ref = React.useRef<HTMLDivElement>(null);
  const zoom = useSelector((state: RootState) => state.gameState.zoom);
  const dev = useSelector((state: RootState) => state.gameState.dev);
  const ratio = !miniMap ? ratios[zoom] : ratios[zoom] / 10;

  const stellarData: StellarDataType = { system, star, planet, moon };
  
  const bodyValueProps: BodyValuesProps = {
    stellarData,
    miniMap,
    ratio,
    dev
  }
  
  const bv = bodyValues(bodyValueProps);
  const { x, y, left, top, width, height, backgroundColor, border, dLeft, dTop, name, key } = bv;

  const useApproachProps: UseApproachProps = {
    ref,
    coords: { x, y },
    scale,
    miniMap
  }

  const { distanceToPlayer } = useApproach(useApproachProps);

  const variantClass = variant ? variant === 'moon' ? styles['craters'] : styles[variant] : '';
  const bodyClass = styles['body'];
  const waterClass = variant === 'earthLike' ? styles['earthLikeWater'] : '';

  return (
    <>
      <div
        key={key}
        id={name + '-' + type}
        ref={ref}
        style={{
          position: 'absolute',
          left, // Use pixel-based position for accuracy
          top,
          width,
          height,
          backgroundColor,
          border,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          color: '#999',
          fontSize: '0.7rem',
          textTransform: 'uppercase',
          transform: `translate(-50%, -50%)`, 
          overflow: 'hidden',
        }}
        className={`${variantClass} ${bodyClass} ${waterClass}`}
      >
        
      <BodyData
        name={name}
        type={type}
        x={x}
        y={y}
        left={dLeft}
        top={dTop}
        dev={dev}
        miniMap={miniMap}
        distanceToPlayer={distanceToPlayer}
      />
      </div>
    </>
  );
};

export default StellarBody;