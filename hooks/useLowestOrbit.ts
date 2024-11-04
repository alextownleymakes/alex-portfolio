import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { setLowestOrbit, Orbits } from '../state/gameStateSlice';
import { StellarBodyType } from '../utils/types/stellarBodies';


export const useLowestOrbit = (orbits: Orbits) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const lowOrb: { type: StellarBodyType | undefined, name: string | undefined } = { type: undefined, name: undefined };

        if (orbits.moon !== '') {
            lowOrb.type = 'moon';
            lowOrb.name = orbits.moon;
        } else if (orbits.planet !== '') {
            lowOrb.type = 'planet';
            lowOrb.name = orbits.planet;
        } else if (orbits.star !== '') {
            lowOrb.type = 'star';
            lowOrb.name = orbits.star;
        } else if (orbits.system !== '') {
            lowOrb.type = 'starSystem';
            lowOrb.name = orbits.system;
        } else {
            lowOrb.type = undefined;
            lowOrb.name = undefined;
        }

        if (lowOrb.name !== undefined) {
            dispatch(setLowestOrbit(lowOrb));
        }
        
    }, [orbits]);
}