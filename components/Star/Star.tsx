// Star.tsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Star as StarType } from '../../utils/types/stellarBodies'; // Import the Star type and StarPhase enum
import { ratios } from '../../utils/functions/zoom';
import { RootState } from '../../state/store';

interface StarProps {
    star: StarType;
    active?: boolean; // Whether the star is the active star
    onFlyNear?: () => void; // Callback when the user flies near the star
}

const Star: React.FC<StarProps> = ({ star, active = false }) => {

    const zoom = useSelector((state: RootState) => state.gameState.zoom);
    const ratio = ratios[zoom];
    const starSize = (star.radius * ratio) + 'px';

    const starLeft = `calc(${star.position.x * ratio}px + 50% - ${(star.radius * ratio)/2}px)`;
    const starTop = `calc(${star.position.y * ratio}px + 50% - ${(star.radius * ratio)/2}px)`;

    return (
        <div
        id={star.name}
            style={{
                position: 'absolute',
                left: starLeft, // Use pixel-based position for accuracy
                top: starTop, // Use pixel-based position for accuracy
                width: starSize,
                height: starSize,
                backgroundColor: star.color,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                color: '#999',
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                transition: 'all .2s ease-in-out',
            }}
        >
            <div style={{ position: 'relative', left: star.radius + 5 }}>{star.name}</div>
        </div>
    );
};

export default Star;
