import { playerController } from "@/app/functions/playerControls";
import {
  KeyState,
  pressKey,
  releaseKey,
} from "@/app/state/keyStateSlice";
import { RootState } from "@/app/state/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarField from "../StarField/StarField";
import Player from "../Player/Player";

const SpaceGame = () => {
  const dispatch = useDispatch();
  const keyState: KeyState = useSelector((state: RootState) => state.keyState);

  useEffect(() => {
    console.log("keyState", keyState);
  }, [keyState]);

  // Local state for player position, velocity, etc.
  const [playerState, setPlayerState] = useState({
    position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    velocity: { x: 0, y: 0 },
    speed: 0,
    rotation: 0,
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
      <div>
        Player Position: {playerState.position.x}, {playerState.position.y}
      </div>
    </div>
  );
};

export default SpaceGame;
