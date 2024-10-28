import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StarSystem as SystemType } from '../utils/types/stellarBodies';
import { setVisibleSystems } from '../state/gameStateSlice';
import { RootState } from '../state/store';

export const useVisibleSystems = (systems: SystemType[]) => {

    const playerState = useSelector((state: RootState) => state.gameState);
    const position = playerState.position;

    const dispatch = useDispatch();

    useEffect(() => {
        const visSystems = systems.filter(system => {
            const distance = Math.sqrt(Math.pow(playerState.position.x - system.position.x, 2) + Math.pow(playerState.position.y - system.position.y, 2));
            return distance < 3000;
        })
        dispatch(setVisibleSystems(visSystems));

    }, [position]);
};
