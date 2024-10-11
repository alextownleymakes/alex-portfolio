import React from 'react';
import Star from '../Star/Star';
import { StarSystem } from '../../utils/types/stellarBodies';

const SolarSystem: React.FC<{ system: StarSystem }> = ({ system }) => {

    return (
        <div
            id="solar-system"
            style={{
                top: system.position.y,
                left: system.position.x,
                width: '500px',
                height: '500px',
                border: '1px solid white',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '500px',
                    height: '500px',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                {system.stars.map((star, index) => (
                    <Star key={index} star={{ ...star, radius: 50 }} />
                ))}
            </div>
        </div>
    );
};

export default SolarSystem;