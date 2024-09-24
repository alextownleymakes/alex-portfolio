import React from "react";
import "./Planet.scss";

type PlanetProps = {
  location: { x: number; y: number };
  size: number;
  color: string;
  label: string;
};

const Planet: React.FC<PlanetProps> = ({ location, size, color, label }) => (
  <div
    className="planet"
    style={{
      left: `${location.x}%`,
      top: `${location.y}%`,
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
    }}
  >
    <span className="label">{label}</span>
  </div>
);

export default Planet;
