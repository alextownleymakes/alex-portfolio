import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StarSystem as SystemType } from '../utils/types/stellarBodies';
import { setVisibleSystems } from '../state/gameStateSlice';
import { RootState } from '../state/store';
import { StarSystemType } from '../utils/types/stellarTypes';
import useAuCoordinates from './useAuCoordinates';
import { scale } from '../utils/functions/zoom';

export const useVisibleSystems = (systems: StarSystemType[]) => {

    const playerState = useSelector((state: RootState) => state.gameState);
    const zoom = playerState.zoom;
    const position = playerState.position;

    const ratio = scale[zoom];

    const dispatch = useDispatch();


    useEffect(() => {
        const visSystems = systems.filter(system => {

            const { tX, tY } = useAuCoordinates({system}, 'system', ratio);
            
            const distance = Math.sqrt(Math.pow(playerState.position.x - tX, 2) + Math.pow(playerState.position.y - tY, 2));
            return distance < 3000;
        })
        dispatch(setVisibleSystems(visSystems));

    }, [position]);
};
