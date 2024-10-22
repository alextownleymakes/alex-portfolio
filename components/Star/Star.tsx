// Star.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Star as StarType } from '../../utils/types/stellarBodies'; // Import the Star type and StarPhase enum
import { StarSystem as StarSystemType } from '../../utils/types/stellarBodies';
import { ratios, scales } from '../../utils/functions/zoom';
import { RootState } from '../../state/store';
import useApproach from '@/hooks/useApproach';

interface StarProps {
    star: StarType;
    active?: boolean; // Whether the star is the active star
    onFlyNear?: () => void; // Callback when the user flies near the star
    system: StarSystemType;
    miniMap?: boolean; // Whether the star is in the mini map
}

const Star: React.FC<StarProps> = ({ star, system, miniMap = false }) => {

    const zoom = useSelector((state: RootState) => state.gameState.zoom);
    const dev = useSelector((state: RootState) => state.gameState.dev);
    const ratio = !miniMap ? ratios[zoom] : ratios[zoom] / 10;

    const starRef = React.useRef<HTMLDivElement>(null);

    const useApproachProps = {
        ref: starRef,
        coords: { x: (star.position.x + system.position.x) * ratio, y: (star.position.y + system.position.y) * ratio },
        scale: scales.StarSystem,
        miniMap
    };
    const { distanceToPlayer } = useApproach(useApproachProps);

    const starPosX = ((star.position.x + system.position.x) * ratio);
    const starPosY = ((star.position.y + system.position.y) * ratio);
    const starLeft = `calc(${star.position.x * ratio}px + 50% - ${(star.radius * ratio) / 2}px)`;
    const starTop = `calc(${star.position.y * ratio}px + 50% - ${(star.radius * ratio) / 2}px)`;
    const starSize = (star.radius * ratio);

    return (
        <div
        key={star.name + miniMap ? '-mm' : ''}
            ref={starRef}
            id={star.name}
            style={{
                position: 'absolute',
                left: starLeft, // Use pixel-based position for accuracy
                top: starTop, // Use pixel-based position for accuracy
                width: starSize + 'px',
                height: starSize + 'px',
                backgroundColor: miniMap ? 'transparent' : star.color,
                border: miniMap ? `2px solid ${star.color}` : 'none',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                color: '#999',
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                transition: 'all .2s ease-in-out',
            }}
        >
            {!miniMap && (
                <div style={{ position: 'relative', left: star.radius + 5 }}>{star.name} {dev && (`- DTP: ${distanceToPlayer().toFixed(0)}; x: ${starPosX}; y: ${starPosY}`)}</div>
            )}
        </div>
    );
};

export default Star;
