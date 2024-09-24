"use client";

import React, { useState, useEffect } from "react";
import Spaceship from "../Spaceship/Spaceship";
import Planet from "../Planet/Planet";
import styles from "./SpaceScene.module.scss";

const SpaceScene = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 }); // Tracks the movement vector
  const [speed, setSpeed] = useState(0);
  const [rotation, setRotation] = useState(0); // Degrees
  const [isThrusting, setIsThrusting] = useState(false); // Track if thrust is active
  const [isBraking, setIsBraking] = useState(false); // Track if braking is active
  const maxSpeed = 2;
  const accel = 0.02;
  const decel = 0.04; // Increased deceleration for more noticeable braking
  const turnRate = 5; // Degrees per frame
  const velocityThreshold = 0.001; // Small velocity threshold to avoid micro movements

  // Handle keydown events for thrust, braking, and turning
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "w") {
      console.log("Thrusting...");
      setIsThrusting(true); // Start thrusting when "W" is pressed
      setIsBraking(false); // Stop braking when thrust starts
    }
    if (e.key === "s") {
      console.log("Braking...");
      setIsBraking(true); // Start braking when "S" is pressed
      setIsThrusting(false); // Stop thrusting when braking starts
    }
    if (e.key === "a") turnLeft();
    if (e.key === "d") turnRight();
  };

  // Handle keyup events for stopping thrust and braking
  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === "w") setIsThrusting(false); // Stop thrusting when "W" is released
    if (e.key === "s") setIsBraking(false); // Stop braking when "S" is released
  };

  // Thrust: Increases speed with acceleration, caps at maxSpeed
  const thrust = () => {
    if (isThrusting) {
      setSpeed((prevSpeed) => {
        const newSpeed = Math.min(prevSpeed + accel, maxSpeed);
        console.log("Thrust speed:", newSpeed);
        return newSpeed;
      });
    }
  };

  // Brake: Slows down the ship, but no reverse
  const brake = () => {
    if (isBraking) {
      setSpeed((prevSpeed) => {
        const newSpeed = Math.max(prevSpeed - decel, 0);
        console.log("Brake speed:", newSpeed); // Log the braking speed
        return newSpeed;
      });
    }
  };

  // Turn Left: Rotates the ship counter-clockwise
  const turnLeft = () => {
    setRotation((prevRotation) => (prevRotation - turnRate) % 360);
  };

  // Turn Right: Rotates the ship clockwise
  const turnRight = () => {
    setRotation((prevRotation) => (prevRotation + turnRate) % 360);
  };

  // UseEffect: Update velocity based on speed and rotation
  useEffect(() => {
    const updateVelocity = () => {
      const adjustedRotation = (rotation - 90) * (Math.PI / 180); // Adjust for up direction
      let newVelocityX = Math.cos(adjustedRotation) * speed;
      let newVelocityY = Math.sin(adjustedRotation) * speed;

      // Snap velocity to zero if it's below a threshold
      if (Math.abs(newVelocityX) < velocityThreshold) newVelocityX = 0;
      if (Math.abs(newVelocityY) < velocityThreshold) newVelocityY = 0;

      console.log("Velocity:", { x: newVelocityX, y: newVelocityY });
      setVelocity({ x: newVelocityX, y: newVelocityY });
    };

    updateVelocity();
  }, [speed, rotation]); // Recalculate velocity whenever speed or rotation changes

  // UseEffect: Update position based on velocity
  useEffect(() => {
    const updatePosition = () => {
      if (Math.abs(velocity.x) > velocityThreshold || Math.abs(velocity.y) > velocityThreshold) {
        setPosition((prevPos) => ({
          x: prevPos.x + velocity.x * 0.1, // Adjust for smoother motion
          y: prevPos.y + velocity.y * 0.1,
        }));
      }

      requestAnimationFrame(updatePosition);
    };

    const handleKeyDownWrapper = (e: KeyboardEvent) => handleKeyDown(e);
    const handleKeyUpWrapper = (e: KeyboardEvent) => handleKeyUp(e);

    window.addEventListener("keydown", handleKeyDownWrapper);
    window.addEventListener("keyup", handleKeyUpWrapper);

    const animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("keydown", handleKeyDownWrapper);
      window.removeEventListener("keyup", handleKeyUpWrapper);
      cancelAnimationFrame(animationFrameId);
    };
  }, [velocity]); // Only rerun effect when velocity changes

  // UseEffect: Run the thrust logic in a separate interval
  useEffect(() => {
    if (isThrusting) {
      const intervalId = setInterval(() => {
        thrust();
      }, 100); // Adjust interval for smooth acceleration (100ms is typical)

      return () => clearInterval(intervalId);
    } // Clean up interval when component unmounts
  }, [isThrusting]); // Only run this effect when thrusting is active

  // UseEffect: Run the braking logic in a separate interval
  useEffect(() => {
    if (isBraking) {
      const intervalId = setInterval(() => {
        brake();
      }, 100); // Adjust interval for smooth braking (100ms is typical)

      return () => clearInterval(intervalId);
    } // Clean up interval when component unmounts
  }, [isBraking]); // Only run this effect when braking is active

  return (
    <div className={styles.spaceScene}>
      <Spaceship position={position} rotation={rotation} />
      <Planet location={{ x: 30, y: 40 }} size={100} color="red" label="Home" />
      <Planet
        location={{ x: 70, y: 20 }}
        size={80}
        color="blue"
        label="Projects"
      />
      <Planet
        location={{ x: 50, y: 70 }}
        size={120}
        color="green"
        label="About"
      />
    </div>
  );
};

export default SpaceScene;
