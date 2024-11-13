import React from 'react';
import useApproach, { UseApproachProps } from '@/hooks/useApproach';
import { useSelector } from 'react-redux';
import { StarVariants, PlanetVariants, MoonVariants } from '../../../utils/types/stellarTypes';
import { RootState } from '../../../state/store';
import BodyData from '../BodyData/BodyData';
import styles from './StellarBody.module.scss';  // Importing the CSS Module
import Body from '../Body/Body';
import { OrbitTypes } from '@/state/gameStateSlice';
import { StellarType, StellarBodyType } from '@/utils/types/stellarTypes';

export interface StellarBodyProps {
  system: StellarType;
  body: StellarBodyType;
  mm?: boolean; // Whether the star is in the mini map
  type: OrbitTypes;
  variant: PlanetVariants | StarVariants | MoonVariants | 'moon' | 'comet' | 'asteroid' | 'asteroidBelt';
  x: number;
  y: number;
}

const systemChildren = {
  system: 'star',
  star: 'planet',
  planet: 'moon',
}

const StellarBody: React.FC<StellarBodyProps> = ({ system, body, type, variant, mm = false, x, y }) => {

  const ref = React.useRef<HTMLDivElement>(null);
  const dev = useSelector((state: RootState) => state.keyState.devDisplay.pressed);
  const lowestOrbit = useSelector((state: RootState) => state.gameState.lowestOrbit);
  const scale = useSelector((state: RootState) => state.gameState.zoom);

  const width = body?.radius * 2;
  const height = body?.radius * 2;
  const backgroundColor = 'color' in body ? body.color : 'transparent';
  const name = body?.name;
  const border = mm ? `2px solid ${backgroundColor}` : 'none'
  const key = name + '-' + type;
  
  
  const useApproachProps: UseApproachProps = {
    ref,
    coords: {x, y},
    scale,
    mm,
    type,
    name,
    approach: width + 100,
    recede: width * 100,
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
          left: `calc(${x - width/2}px + 50%)`, // Use pixel-based position for accuracy
          top: `calc(${y - height/2}px + 50%)`, // Use pixel-based position for accuracy
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
      >{!mm &&
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
        mm={mm}
        distance={distanceToPlayer()}
      />
    </div>
    </>
  );
}
export default StellarBody;