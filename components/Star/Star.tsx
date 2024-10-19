// Star.tsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Star as StarType } from '../../utils/types/stellarBodies'; // Import the Star type and StarPhase enum
import { StarSystem as StarSystemType } from '../../utils/types/stellarBodies';
import { ratios, scales } from '../../utils/functions/zoom';
import { RootState } from '../../state/store';
import useApproach from '@/hooks/useApproach';
import Planet from '../Planet/Planet';

interface StarProps {
    star: StarType;
    active?: boolean; // Whether the star is the active star
    onFlyNear?: () => void; // Callback when the user flies near the star
    system: StarSystemType;
}

const Star: React.FC<StarProps> = ({ star, active = false, system }) => {

    const zoom = useSelector((state: RootState) => state.gameState.zoom);
    const ratio = ratios[zoom];
    const starSize = (star.radius * ratio) + 'px';

    const starRef = React.useRef<HTMLDivElement>(null);
    const { distanceToPlayer } = useApproach(starRef, { x: (star.position.x + system.position.x) * ratios[zoom], y: (star.position.y + system.position.y) * ratios[zoom] }, scales.Star);

    const starLeft = `calc(${star.position.x * ratio}px + 50% - ${(star.radius * ratio) / 2}px)`;
    const starTop = `calc(${star.position.y * ratio}px + 50% - ${(star.radius * ratio) / 2}px)`;

    return (
        <div
            ref={starRef}
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
            {/* <div>DTP: {distanceToPlayer().toFixed(0)}</div> */}
            <div style={{ position: 'relative', left: star.radius + 5 }}>{star.name}</div>
        </div>

    );
};

export default Star;
