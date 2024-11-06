import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { generateGalaxy } from '@/utils/types/stellarGeneration';
import { setGalaxy } from '@/state/galaxyStateSlice';

export const useGalaxyGeneration = (count: number) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const galaxy = generateGalaxy(100);
        if (galaxy.length > 0) { 
            dispatch(setGalaxy(galaxy));
        }
    }, []);

};
