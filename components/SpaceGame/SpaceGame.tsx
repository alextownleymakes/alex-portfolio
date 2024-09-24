import { playerController } from "@/app/functions/playerControls";
import { KeyState, pressKey, releaseKey } from "@/app/state/keyStateSlice";
import { RootState } from "@/app/state/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarField from "../StarField/StarField";
import Player from "../Player/Player";
import Planet from "../Planet/Planet";

const SpaceGame = () => {
  const dispatch = useDispatch();
  const keyState: KeyState = useSelector((state: RootState) => state.keyState);

  useEffect(() => {
    console.log("keyState", keyState);
  }, [keyState]);

  // Local state for player position, velocity, etc.
  const [playerState, setPlayerState] = useState({
    position: { x: 10000, y: 10000 },
    velocity: { x: 0, y: 0 },
    speed: 0,
    rotation: 75,
  });

  useEffect(() => {
    console.log("playerState", playerState);
  }, [playerState]);

  // Handle keydown and keyup events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) =>
      dispatch(pressKey({ key: e.key }));
    const handleKeyUp = (e: KeyboardEvent) =>
      dispatch(releaseKey({ key: e.key }));

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [dispatch]);

  // Game loop for updating the universe position
  useEffect(() => {
    let animationFrameId: number; // Store the animation frame ID

    const gameLoop = () => {
      // Calculate the new player state
      const newState = playerController.movePlayer(playerState, keyState);

      // Update the state
      setPlayerState(newState);

      // Recursively call the gameLoop
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    // Start the game loop
    animationFrameId = requestAnimationFrame(gameLoop);

    // Cleanup function to cancel the animation frame when component unmounts
    return () => cancelAnimationFrame(animationFrameId);
  }, [keyState, playerState]); // Only re-run when keyState or playerState changes

  const planets = [
    { position: { x: 9980, y: 10020}, size: 40, color: "red", label: "Welcome" },
    { position: { x: 10200, y: 9750}, size: 60, color: "blue", label: "Resume" },
    { position: { x: 10100, y: 10200 }, size: 50, color: "green", label: "Projects" },
    { position: { x: 9500, y: 10200 }, size: 70, color: "orange", label: "About" },
    { position: { x: 9600, y: 9750 }, size: 80, color: "purple", label: "Missions" },
    { position: { x: 10450, y: 9900 }, size: 90, color: "yellow", label: "Contact" },
  ];

  // Render planets in an orbit around the player's starting position
  const planetElements = planets.map((planet, index) => {
    // Calculate the angle and position for each planet
    const angle = (index / planets.length) * 2 * Math.PI; // Spread evenly around a circle

    return (
      <Planet
        key={index}
        location={planet.position} 
        size={planet.size}
        color={planet.color}
        label={planet.label}
      />
    );
  });

  // Calculate the world's offset based on player's position
  const worldOffsetX = `calc(50vw - ${playerState.position.x}px)`;
  const worldOffsetY = `calc(50vh - ${playerState.position.y}px)`;

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100vw",
        height: "100vh",
      }}
    >
      <StarField
        playerVelocity={playerState.velocity}
        width={window.innerWidth}
        height={window.innerHeight}
      />{" "}
      <Player rotation={playerState.rotation} />
      <div
        style={{
          position: "absolute",
          left: worldOffsetX, // Offset world based on player's x position
          top: worldOffsetY, // Offset world based on player's y position
          width: "20000px", // Large enough to contain everything
          height: "20000px",
        }}
      >
        {planetElements}
      </div>
      <div>
        Player Position: {playerState.position.x}, {playerState.position.y}
      </div>
    </div>
  );
};

export default SpaceGame;
