import React from 'react';
import styles from './Body.module.scss';
import { StarVariants, PlanetVariants } from '../../utils/types/stellarTypes';
import { OrbitTypes } from '@/state/gameStateSlice';

interface BodyProps {
    type: OrbitTypes;
    style?: React.CSSProperties;
    variant: StarVariants | PlanetVariants | 'moon';
}

const Body: React.FC<BodyProps> = ({ type, style, variant }) => {

    const className = (variant && variant !== 'moon') ? type + '-' + variant : type;

    return (
        <div style={style ?? { width: '100%', height: '100%', position: 'absolute' }}>
            <div className={`${styles['body-container']} ${styles[className]} ${styles[type + '-anim']}`}>
                <div className={`${styles['clouds']} ${styles[type + '-' + variant + '-clouds']}`}></div>
                <div className={styles['inner-shadow']}></div>
            </div>
        </div>
    );
}

export default Body;