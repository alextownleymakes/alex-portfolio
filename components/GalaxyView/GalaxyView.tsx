// GalaxyView.tsx
import React from 'react';
import { StarSystem } from '../../utils/types/stellarBodies'; // Import the StarSystem type
import { calculateDistance } from '../../utils/functions/calculations'; // Import the calculateDistance function
import Star from '../Star/Star'; // Import the Star component

interface GalaxyViewProps {
  starSystems: StarSystem[];
  playerPosition: { x: number; y: number };
  onFlyNearSystem: (systemId: number) => void;
}

const GalaxyView: React.FC<GalaxyViewProps> = ({ starSystems, playerPosition, onFlyNearSystem }) => {
  console.log('GalaxyView rendering');
  return starSystems.map((system) => {
    console.log('system rendering', system);
    const distance = calculateDistance(playerPosition, system.position);

    // If the player is within 250px of the system, call the callback
    if (distance <= 250) {
      // onFlyNearSystem(system.id);
    }

    return (
      <div
        style={{
          top: '10500px',
          left: '10500px',
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
            <Star key={index} star={{...star, radius: 50}} />
          ))}
        </div>
      </div>
    );
  }
  );
};

export default GalaxyView;
