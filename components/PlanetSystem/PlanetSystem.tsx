// StarSystem.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StarSystem as StarSystemType, Star as StarType, Planet as PlanetType } from '../../utils/types/stellarBodies';
import Planet from '../Planet/Planet';
import { ratios, scales } from '../../utils/functions/zoom';
import { RootState } from '../../state/store';
import useApproach from '@/hooks/useApproach';


interface StarSystemProps {
    system: StarSystemType;
    star: StarType;
    key: string;
    activeSystem: boolean;
    onFlyNearStar?: (starId: number) => void; // Callback when flying near a star
}

const StarSystem: React.FC<StarSystemProps> = ({ system, activeSystem, star }) => {
    const zoom = useSelector((state: RootState) => state.gameState.zoom);

    return zoom > scales.StarSystem && activeSystem && star.planets.map((planet) => (
        <>
        <Planet key={planet.name} system={system} star={star} planet={planet} radius={planet.radius} color={planet.color || 'brown'} label={planet.name} />
        </>
    ))
};

export default StarSystem;
