// Star.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { ratios, scales } from '../../utils/functions/zoom';
import { StarType, StarSystemType } from '@/utils/types/stellarTypes';
import { RootState } from '../../state/store';
import { orbits } from '../../state/gameStateSlice';
import useApproach from '@/hooks/useApproach';
import useAuCoordinates from '@/hooks/useAuCoordinates';

interface StarProps {
    star: StarType;
    onFlyNear?: () => void; // Callback when the user flies near the star
    system: StarSystemType;
    miniMap?: boolean; // Whether the star is in the mini map
}

const Star: React.FC<StarProps> = ({ star, system, miniMap = false }) => {

    const zoom = useSelector((state: RootState) => state.gameState.zoom);
    const dev = useSelector((state: RootState) => state.gameState.dev);
    const ratio = !miniMap ? ratios[zoom] : ratios[zoom] / 10;

    const starRef = React.useRef<HTMLDivElement>(null);

    const { x, y } = useAuCoordinates({ data: { system, star }, type: 'star', ratio });

    const useApproachProps = {
        name: star.name,
        type: orbits.star,
        ref: starRef,
        coords: { x, y },
        scale: scales.StarSystem,
        miniMap
    };
    const { distanceToPlayer } = useApproach(useApproachProps);

    const starLeft = `calc(${x}px + 50% - ${(star.radius * ratio) / 2}px)`;
    const starTop = `calc(${y}px + 50% - ${(star.radius * ratio) / 2}px)`;
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
                <div style={{ position: 'relative', left: star.radius + 5 }}>{star.name} {dev && (`- DTP: ${distanceToPlayer().toFixed(0)}; x: ${x}; y: ${y}`)}</div>
            )}
        </div>
    );
};

export default Star;
