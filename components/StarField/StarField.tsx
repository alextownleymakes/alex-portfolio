import React, { useState, useEffect } from 'react';
import styles from './StarField.module.scss'; // Import the module SCSS

interface Star {
  id: number;
  x: number;
  y: number;
  size: number; // Size of the star (1px, 1.5px, 2px, 3px)
  speedFactor: number; // Speed factor based on size (related to depth)
  twinkle: boolean; // Whether this star will twinkle
  twinkleDuration: number; // Random duration for the twinkle effect
  twinkleDelay: number; // Random delay before starting twinkle effect
}

interface StarFieldProps {
  playerVelocity: { x: number; y: number };
  width: number; // Width of the field of view
  height: number; // Height of the field of view
}

// Function to generate a star with a weighted random size and twinkle effect
const generateStar = (width: number, height: number): Star => {
  const randomValue = Math.random();
  let size, speedFactor;

  if (randomValue < 0.5) {
    size = 0.4;
    speedFactor = 0.4; // Slowest speed
  } else if (randomValue < 0.7) {
    size = 0.5;
    speedFactor = 0.5;
  } else if (randomValue < 0.85) {
    size = 0.5;
    speedFactor = 0.6;
  } else if (randomValue < 0.93) {
    size = 0.6;
    speedFactor = 0.7;
  } else if (randomValue < 0.98) {
    size = 0.8;
    speedFactor = 0.8;
  } else {
    size = 1;
    speedFactor = 1; // Fastest speed
  }

  // 20% chance for the star to twinkle
  const twinkle = Math.random() < 0.2;

  // Randomize twinkle duration (between 1.5s and 4s) and delay (between 0s and 2s)
  const twinkleDuration = Math.random() * (7 - 1.5) + 1; // Between 1.5s and 4s
  const twinkleDelay = Math.random() * 2; // Random delay between 0 and 2 seconds

  return {
    id: Math.random(),
    x: Math.random() * width,
    y: Math.random() * height,
    size,
    speedFactor,
    twinkle,
    twinkleDuration,
    twinkleDelay,
  };
};

const StarField: React.FC<StarFieldProps> = ({ playerVelocity, width, height }) => {
  const [stars, setStars] = useState<Star[]>(() =>
    Array.from({ length: 350 }, () => generateStar(width, height))
  );

  useEffect(() => {
    setStars((prevStars) =>
      prevStars.map((star) => {
        const newX = star.x - playerVelocity.x * star.speedFactor;
        const newY = star.y - playerVelocity.y * star.speedFactor;

        return {
          ...star,
          x: (newX + width) % width,
          y: (newY + height) % height,
        };
      })
    );
  }, [playerVelocity, width, height]);

  return (
    <svg width={width} height={height} style={{ position: 'absolute', top: 0, left: 0 }}>
      {stars.map((star) => (
        <circle
          key={star.id}
          cx={star.x}
          cy={star.y}
          r={star.size}
          fill="white"
          className={styles.twinkle} 
          style={{
            animationDuration: `${star.twinkleDuration}s`,
            animationDelay: `${star.twinkleDelay}s`,
          }}
        />
      ))}
    </svg>
  );
};

export default StarField;
