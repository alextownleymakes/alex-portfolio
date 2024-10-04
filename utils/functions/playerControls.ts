import { KeyState } from "../../state/keyStateSlice";

interface PlayerState {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  speed: number;
  zoom: number;
  rotation: number;
}

export const playerController = {
  movePlayer: (state: PlayerState, keyState: KeyState): PlayerState => {
    const { isThrusting, isTurningLeft, isTurningRight, isBraking } = keyState;

    let newVelocityX = state.velocity.x;
    let newVelocityY = state.velocity.y;

    // Create a new state to avoid mutation
    let newState = { ...state };

    // Update rotation (left and right turns)
    if (isTurningLeft) {
      newState.rotation = (newState.rotation - 3 + 360) % 360; // Turn left
    }
    if (isTurningRight) {
      newState.rotation = (newState.rotation + 3) % 360; // Turn right
    }

    // Thrust increases velocity in the direction the ship is facing
    if (isThrusting) {
      newState.speed = Math.min(newState.speed + 1, 100); // Accelerate
      const angle = (newState.rotation - 90) * (Math.PI / 180); // Convert rotation to radians
      const thrustVelocityX = Math.cos(angle) * 0.1;
      const thrustVelocityY = Math.sin(angle) * 0.1;
      newVelocityX = newVelocityX * 0.98 + thrustVelocityX; // Smooth acceleration
      newVelocityY = newVelocityY * 0.98 + thrustVelocityY;
    }

    // Handle 'S' key for rotating the ship 180 degrees smoothly (no braking)
    if (isBraking) {
      // Calculate the current angle of travel based on velocity
      const angleOfTravel = Math.atan2(newVelocityY, newVelocityX) * (180 / Math.PI);

      // Target rotation is 180 degrees from the current direction of travel
      const targetRotation = (angleOfTravel + 270) % 360;

      // Calculate the shortest angular difference between current and target
      const diff = ((targetRotation - newState.rotation + 360) % 360);

      // If the difference is greater than 180, rotate counterclockwise (shorter route)
      const shortestRotationDirection = diff > 180 ? -1 : 1; // -1 for counterclockwise, 1 for clockwise
      const shortestRotationStep = Math.min(diff, 360 - diff); // Shortest step to rotate

      // Gradually rotate towards the target by incrementally adjusting the rotation
      const rotationStep = 5; // Adjust this value to control the rotation speed

      // Rotate by the step size in the shortest direction
      if (shortestRotationStep < rotationStep) {
        newState.rotation = targetRotation; // Snap to target if close
      } else {
        newState.rotation = (newState.rotation + shortestRotationDirection * rotationStep + 360) % 360;
      }
    }

    const newPosition = {
      x: state.position.x + newVelocityX, // Update position based on velocity
      y: state.position.y + newVelocityY,
    };

    return {
      ...newState,
      position: newPosition, // Return the new position object
      velocity: { x: newVelocityX, y: newVelocityY }, // Return the new velocity object
    };
  },
};
