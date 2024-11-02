import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { setLowestOrbit, Orbits } from '../state/gameStateSlice';
import { StellarBodyType } from '../utils/types/stellarBodies';


export const useLowestOrbit = (orbit: Orbits) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const lowOrb: { type: StellarBodyType | undefined, name: string | undefined } = { type: undefined, name: undefined };

        if (orbit.moon) {
            lowOrb.type = 'moon';
            lowOrb.name = orbit.moon;
        } else if (orbit.planet) {
            lowOrb.type = 'planet';
            lowOrb.name = orbit.planet;
        } else if (orbit.star) {
            lowOrb.type = 'star';
            lowOrb.name = orbit.star;
        } else if (orbit.system) {
            lowOrb.type = 'starSystem';
            lowOrb.name = orbit.system;
        } else {
            lowOrb.type = undefined;
            lowOrb.name = undefined;
        }

        if (lowOrb.name !== undefined) {
            dispatch(setLowestOrbit(lowOrb));
        }
        
    }, [orbit]);
}