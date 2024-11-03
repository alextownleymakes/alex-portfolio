import React from 'react';
import styles from './Body.module.scss';
import { StellarBodyType } from '../../utils/types/stellarBodies';

interface BodyProps {
    type: StellarBodyType;
    style?: React.CSSProperties;
}

const Body: React.FC<BodyProps> = ({ type, style }) => {
    return (
    <div style={style ?? {width: '100%', height: '100%', position: 'absolute'}}>
        <div className={`${styles['body-container']} ${styles[type]}-container`} styl>
            <div className={styles[type === 'star' ? 'star-anim' : (type === 'planet' ? 'clouds-anim' : 'moon-anim')]}></div>
            <div className={styles['inner-shadow']}></div>
        </div>
    </div>
    );
}

export default Body;