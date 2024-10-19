import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { pressKey, releaseKey } from "@/state/keyStateSlice";
import { GameState as PlayerState } from '../../state/gameStateSlice';
import { KeyState, KeyMapType } from '../../state/keyStateSlice';
import { updateAll } from '../../state/gameStateSlice';
import { useEffect } from 'react';
import { ratios } from '../../utils/functions/zoom';

interface PlayerControllerType {
    children: React.ReactNode;
}

const PlayerController: React.FC<PlayerControllerType> = ({ children }) => {

    const keyState = useSelector((state: RootState) => state.keyState);
    const playerState = useSelector((state: RootState) => state.gameState);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) =>
            dispatch(pressKey({ key: e.key as KeyMapType }));
        const handleKeyUp = (e: KeyboardEvent) =>
            dispatch(releaseKey({ key: e.key as KeyMapType }));

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [dispatch]);

    useEffect(() => {
        let animationFrameId: number;

        const gameLoop = () => {
            const state = { ...playerState };
            const newState = movePlayer(state, keyState);

            dispatch(updateAll(newState));

            animationFrameId = requestAnimationFrame(gameLoop);
        };

        animationFrameId = requestAnimationFrame(gameLoop);

        return () => cancelAnimationFrame(animationFrameId);
    }, [keyState, playerState]);



    const movePlayer = (state: PlayerState, keyState: KeyState): PlayerState => {
        const { isThrusting, isTurningLeft, isTurningRight, isRefacing, isBraking } = keyState;

        let newVelocityX = state.velocity.x;
        let newVelocityY = state.velocity.y;

        const newState = { ...state };

        if (isTurningLeft) {
            newState.rotation = (newState.rotation - 3 + 360) % 360;
        }
        if (isTurningRight) {
            newState.rotation = (newState.rotation + 3) % 360; 
        }

        if (isThrusting) {
            newState.speed = Math.min(newState.speed + 1, 100); 
            const angle = (newState.rotation - 90) * (Math.PI / 180);
            const thrustVelocityX = Math.cos(angle) * 0.1;
            const thrustVelocityY = Math.sin(angle) * 0.1;
            newVelocityX = newVelocityX * 0.98 + thrustVelocityX; 
            newVelocityY = newVelocityY * 0.98 + thrustVelocityY;
        }

        if (isBraking) {
            newState.speed = Math.max(newState.speed - 1, 0); 
            newVelocityX = newVelocityX * 0.90;
            newVelocityY = newVelocityY * 0.90;
        }

        if (isRefacing) {
            const angleOfTravel = Math.atan2(newVelocityY, newVelocityX) * (180 / Math.PI);

            const targetRotation = (angleOfTravel + 270) % 360;

            const diff = ((targetRotation - newState.rotation + 360) % 360);

            const shortestRotationDirection = diff > 180 ? -1 : 1; 
            const shortestRotationStep = Math.min(diff, 360 - diff); 

            const rotationStep = 5; 

            if (shortestRotationStep < rotationStep) {
                newState.rotation = targetRotation;
            } else {
                newState.rotation = (newState.rotation + shortestRotationDirection * rotationStep + 360) % 360;
            }
        }

        const newPosition = {
            x: state.position.x + newVelocityX / (ratios[state.zoom]*ratios[state.zoom]), 
            y: state.position.y + newVelocityY / (ratios[state.zoom]*ratios[state.zoom]),
        };

        const newZoomedPosition = {
            x: newPosition.x * ratios[state.zoom],
            y: newPosition.y * ratios[state.zoom],
        };

        return {
            ...newState,
            position: newPosition,
            zoomedPosition: newZoomedPosition,
            velocity: { x: newVelocityX, y: newVelocityY }
        };
    };



    return (
        <>
            {children}
        </>
    )
};

export default PlayerController;
