import React from 'react';
import useApproach, { UseApproachProps } from '@/hooks/useApproach';
import { useSelector } from 'react-redux';
import { StarSystem as StarSystemType, Star as StarType, Planet as PlanetType, Moon as MoonType, StarVariantType, PlanetVariantType } from '../../utils/types/stellarBodies';
import { ratios } from '../../utils/functions/zoom';
import { RootState } from '../../state/store';
import { StellarDataType, BodyValuesProps, bodyValues } from '@/utils/functions/calculations';
import BodyData from '../BodyData/BodyData';
import styles from './StellarBody.module.scss';  // Importing the CSS Module
import Body from '../Body/Body';
import useAuCoordinates from '@/hooks/useAuCoordinates';
import { OrbitTypes } from '@/state/gameStateSlice';

export interface StellarBodyProps {
  system?: StarSystemType;
  planet?: PlanetType;
  star?: StarType;
  moon?: MoonType;
  miniMap?: boolean; // Whether the star is in the mini map
  scale: number;
  type: OrbitTypes;
  variant: PlanetVariantType | StarVariantType | 'moon';
}

const StellarBody: React.FC<StellarBodyProps> = ({ system, star, planet, moon, type, scale, variant, miniMap = false }) => {

  const ref = React.useRef<HTMLDivElement>(null);
  const zoom = useSelector((state: RootState) => state.gameState.zoom);
  const dev = useSelector((state: RootState) => state.keyState.devDisplay.pressed);
  const lowestOrbit = useSelector((state: RootState) => state.gameState.lowestOrbit);
  const ratio = !miniMap ? ratios[zoom] : ratios[zoom] / 10;

  const stellarData: StellarDataType = { system, star, planet, moon };

  const bodyValueProps: BodyValuesProps = {
    stellarData,
    miniMap,
    ratio,
    dev
  }



  const bv = bodyValues(bodyValueProps);
  const { width, height, backgroundColor, border, name, key } = bv;

  const { x, y, aX, aY} = useAuCoordinates(stellarData, type, ratio);

  const useApproachProps: UseApproachProps = {
    ref,
    coords: {x: aX, y: aY},
    scale,
    miniMap,
    type,
    name
  }

  const { distanceToPlayer } = useApproach(useApproachProps);

  const variantClass = variant ? variant === 'moon' ? styles['craters'] : styles[variant] : '';
  const bodyClass = styles['body'];
  const waterClass = variant === 'earthLike' ? styles['earthLikeWater'] : '';
  const orbitedClass = styles['orbited'];

  return (
    <>
      <div
        key={key}
        id={name + '-' + type}
        ref={ref}
        style={{
          position: 'absolute',
          left: x, // Use pixel-based position for accuracy
          top: y,
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
          // transition: 'all .1s ease-in-out',
        }}
        className={`${variantClass} ${bodyClass} ${waterClass} ${lowestOrbit.name === name && orbitedClass}`}
      >{!miniMap &&
      <Body type={type}
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
          margin: '0',
        }}
        variant={variant}
      />}
      <BodyData
        name={name}
        type={type}
        x={x}
        y={y}
        left={`calc(${width} + 10px)`}
        top={`calc(${height} / 2)`}
        miniMap={miniMap}
        distance={distanceToPlayer()}
      />
    </div>
    </>
  );
}
export default StellarBody;