import { KeyState } from "../state/keyStateSlice";

interface PlayerState {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  speed: number;
  rotation: number;
}

export const playerController = {
  movePlayer: (state: PlayerState, keyState: KeyState): PlayerState => {
    const { isThrusting, isBraking, isTurningLeft, isTurningRight } = keyState;

    let newVelocityX = state.velocity.x; 
    let newVelocityY = state.velocity.y; 

    // Create a new state to avoid mutation
    let newState = { ...state };

    // Update rotation (no impact on velocity yet)
    if (isTurningLeft) {
      newState.rotation = (newState.rotation - 1) % 360; // Turn left
    }
    if (isTurningRight) {
      newState.rotation = (newState.rotation + 1) % 360; // Turn right
    }

    // Thrust should add to the current velocity, rather than overwrite it
    if (isThrusting) {
      newState.speed = Math.min(newState.speed + 0.1, 10); // Accelerate

      // Convert rotation to movement direction and apply a small change to velocity
      const angle = (newState.rotation - 90) * (Math.PI / 180); // Convert rotation to radians
      const thrustVelocityX = Math.cos(angle) * 0.05; // Small thrust in the new direction
      const thrustVelocityY = Math.sin(angle) * 0.05;

      // Adjust velocity by incrementally adding the thrust direction to the current velocity
      newVelocityX = newVelocityX * 0.98 + thrustVelocityX; // Blend old and new velocities
      newVelocityY = newVelocityY * 0.98 + thrustVelocityY;
    }

    // Apply braking by reducing speed and velocity gradually
    if (isBraking) {
      newState.speed = Math.max(newState.speed - 0.1, 0); // Decelerate the ship

      // Apply friction to slow down velocity gradually
      newVelocityX *= 0.98;
      newVelocityY *= 0.98;

      // If speed is close to 0, stop completely
      if (Math.abs(newVelocityX) < 0.01 && Math.abs(newVelocityY) < 0.01) {
        newVelocityX = 0;
        newVelocityY = 0;
        newState.speed = 0;
      }
    }

    // Move the universe (background) around the player
    const newPositionX = newState.position.x - newVelocityX;
    const newPositionY = newState.position.y - newVelocityY;

    // Return the updated state with the blended velocity
    return {
      ...newState,
      velocity: { x: newVelocityX, y: newVelocityY },
      position: { x: newPositionX, y: newPositionY },
    };
  },
};
