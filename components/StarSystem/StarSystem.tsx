// StarSystem.tsx
import React from 'react';
import Star from '../Star/Star';
import { StarSystem as StarSystemType } from '../../utils/types/stellarBodies';


interface StarSystemProps {
  system: StarSystemType;
  onFlyNearStar?: (starId: number) => void; // Callback when flying near a star
}

const StarSystem: React.FC<StarSystemProps> = ({ system, onFlyNearStar }) => {
  return (
    <div style={{
      top: system.position.y,
      left: system.position.x,
      width: '500px',
      height: '500px',
      border: '1px solid white',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {system.stars.map((star) => (
        <Star
          key={star.name} // Using name as the key since ID isn't in the interface
          star={star} // Pass the entire Star object
          onFlyNear={() => onFlyNearStar?.(star.id)} // Trigger view change when flying near a star
        />
      ))}
    </div>
  );
};

export default StarSystem;
