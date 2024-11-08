"use client";

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { pressKey, releaseKey } from "@/state/keyStateSlice";
import { GameState as PlayerState } from '../../state/gameStateSlice';
import { DrawerList, DrawerState } from '../../state/drawersStateSlice';
import { KeyState, KeyMapType, KeyStateType, KeyofKeyStateType, keyMap } from '../../state/keyStateSlice';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { updateAll, updateRotation, updatePosition, updateSpeed, updateVelocity } from '../../state/gameStateSlice';
import { open, close } from '../../state/drawersStateSlice';
import { useEffect } from 'react';

interface PlayerControllerType {
    children: React.ReactNode;
}

const PlayerController: React.FC<PlayerControllerType> = ({ children }) => {

    const keyState = useSelector((state: RootState) => state.keyState) as KeyStateType;
    const playerState = useSelector((state: RootState) => state.gameState);
    const drawerState = useSelector((state: RootState) => state.drawers);
    const dispatch = useDispatch();
    const ratio = useSelector((state: RootState) => state.gameState.ratio);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const keyName = keyMap[e.key as KeyMapType];
            const thisKey = keyState[keyName] || undefined;
    
            if (thisKey) {
                if (thisKey.toggle) {
                    // Handle toggle keys
                    if (!thisKey.pressed) {
                        dispatch(pressKey({ key: e.key as KeyMapType }));
                    } else {
                        dispatch(releaseKey({ key: e.key as KeyMapType }));
                    }
                } else {
                    // Handle non-toggle keys (press)
                    if (!thisKey.pressed) {
                        dispatch(pressKey({ key: e.key as KeyMapType }));
                    }
                }
            }
        };
    
        const handleKeyUp = (e: KeyboardEvent) => {
            const keyName = keyMap[e.key as KeyMapType];
            const thisKey = keyState[keyName];
    
            if (thisKey && !thisKey.toggle) {
                // Release only non-toggle keys
                dispatch(releaseKey({ key: e.key as KeyMapType }));
            }
        };
    
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
    
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [dispatch, keyState]);
    

    useEffect(() => {
        let animationFrameId: number;

        const gameLoop = () => {
            const state = { ...playerState };
            const newState = movePlayer(state, keyState);
            const drawers = { ...drawerState }
            drawerToggles(drawers, keyState);

            dispatch(updateAll(newState));

            animationFrameId = requestAnimationFrame(gameLoop);
        };

        animationFrameId = requestAnimationFrame(gameLoop);

        return () => cancelAnimationFrame(animationFrameId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyState, playerState]);



    const movePlayer = (state: PlayerState, keyState: KeyState): PlayerState => {
        const { isThrusting, isTurningLeft, isTurningRight, isRefacing, isBraking } = keyState;

        let newVelocityX = state.velocity.x;
        let newVelocityY = state.velocity.y;

        const newState = { ...state };

        if (isTurningLeft.pressed) {
            newState.rotation = (newState.rotation - 3 + 360) % 360;
        }
        if (isTurningRight.pressed) {
            newState.rotation = (newState.rotation + 3) % 360; 
        }

        if (isThrusting.pressed) {
            newState.speed = Math.min(newState.speed + 1, 100); 
            const angle = (newState.rotation - 90) * (Math.PI / 180);
            const thrustVelocityX = Math.cos(angle) * 0.1;
            const thrustVelocityY = Math.sin(angle) * 0.1;
            newVelocityX = newVelocityX * 0.98 + thrustVelocityX; 
            newVelocityY = newVelocityY * 0.98 + thrustVelocityY;
        }

        if (isBraking.pressed) {
            newState.speed = Math.max(newState.speed - 1, 0); 
            newVelocityX = newVelocityX * 0.90;
            newVelocityY = newVelocityY * 0.90;
        }

        if (isRefacing.pressed) {
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
            x: state.position.x + newVelocityX / ((ratio*ratio) / (.5 * ratio)), 
            y: state.position.y + newVelocityY / ((ratio*ratio) / (.5 * ratio)),
        };

        const newZoomedPosition = {
            x: newPosition.x * ratio,
            y: newPosition.y * ratio,
        };

        return {
            ...newState,
            position: newPosition,
            zoomedPosition: newZoomedPosition,
            velocity: { x: newVelocityX, y: newVelocityY }
        };
    };

    const drawerToggles = (state: DrawerState, keyState: KeyStateType) => {

        const keys: { [K in KeyofKeyStateType]: KeyStateType[K] } = { ...keyState };

        //drawerkeys is a new object containing only the keys that have drawerName defined
        const drawerKeys = Object.keys(keys).reduce((acc: Partial<KeyStateType>, key) => {
            if (keys[key as KeyofKeyStateType].drawerName) {
                acc[key as KeyofKeyStateType] = keys[key as KeyofKeyStateType];
            }
            return acc;
        }, {});


        const handleOpen = (drawer: DrawerList) => {
            dispatch(open({ drawer }));
        }
        const handleClose = (drawer: DrawerList) => {
            dispatch(close({ drawer }));
        }

        for (const key in drawerKeys as {[key: string]: KeyStateType}) {
            const drawerName = drawerKeys[key as KeyofKeyStateType]?.drawerName as DrawerList;
            if (keys[key as KeyofKeyStateType].pressed) {
                if (state[drawerName as DrawerList] === false) handleOpen(drawerName);
            } else {
                if (state[drawerName as DrawerList] === true) handleClose(drawerName);
            }
        }
    }

    return (
        <>
            {children}
        </>
    )
};

export default PlayerController;
