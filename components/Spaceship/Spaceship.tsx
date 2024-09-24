import React from "react";
import "./Spaceship.scss";

type SpaceshipProps = {
  position: { x: number; y: number };
  rotation: number;
};

const Spaceship: React.FC<SpaceshipProps> = ({ position, rotation }) => (
  <div
    className="spaceship"
    style={{
      left: `${position.x}%`,
      top: `${position.y}%`,
      transform: `rotate(${rotation}deg)`,
    }}
  ></div>
);

export default Spaceship;
