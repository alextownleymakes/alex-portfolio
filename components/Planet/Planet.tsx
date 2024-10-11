import React from 'react';

interface PlanetProps {
  location: { x: number; y: number }; // Planet location in the universe
  size: number; // Size of the planet
  color: string; // Planet color
  label: string; // Label for the planet (e.g., "Home", "Projects", etc.)
}

const Planet: React.FC<PlanetProps> = ({ location, size, color, label }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${location.x - (size*.5)}px`, // Use pixel-based position for accuracy
        top: `${location.y}px`,
        width: `${size}px`, // Set the planet's size
        height: `${size}px`,
        backgroundColor: color, // Set the planet's color
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'center',
        color: '#999',
        fontSize: '0.7rem',
        textTransform: 'uppercase',
      }}
    >
      <div style={{position: 'relative', left: size+5}}>{label}</div>
    </div>
  );
};

export default Planet;