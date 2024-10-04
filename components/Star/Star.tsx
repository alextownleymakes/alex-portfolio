// Star.tsx
import React from 'react';
import { Star as StarType } from '../../utils/types/stellarBodies'; // Import the Star type and StarPhase enum

interface StarProps {
    star: StarType;
    onFlyNear?: () => void; // Callback when the user flies near the star
}

const Star: React.FC<StarProps> = ({ star, onFlyNear }) => {

    const fract = 1;
    const width = star.radius * fract;
    
    return (
        <div
            style={{
                position: 'relative',
                left: `calc(${star.position.x} + 50%) px`, // Use pixel-based position for accuracy
                top: `calc(${star.position.y} + 50%) px`, // Use pixel-based position for accuracy
                width: `${50}px`,
                height: `${50}px`,
                backgroundColor: star.color,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                color: '#999',
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                transform: `translate(-50%, -25px) scale(${fract})`, // Scale the star based on the fract value
            }}
        >
            <div style={{ position: 'relative', left: star.radius + 5 }}>{star.name}</div>
        </div>
    );
};

export default Star;
