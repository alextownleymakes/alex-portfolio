import React from 'react';
import { StarSystem as StarSystemType } from '../../utils/types/stellarBodies';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import StarSystem from '../StarSystem/StarSystem';

interface GalaxyProps {
    systems: StarSystemType[]
}

const Galaxy: React.FC<GalaxyProps> = ({
    systems,
}) => {
    const playerState = useSelector((state: RootState) => state.gameState);
    const worldOffsetPosition = { x: `calc(50vw - ${playerState.position.x}px)`, y: `calc(50vh - ${playerState.position.y}px)` };

    const visibleSystems = systems.filter(system => {
        const distance = Math.sqrt(Math.pow(playerState.position.x - system.position.x, 2) + Math.pow(playerState.position.y - system.position.y, 2));
        return distance < 3000;
    });

    return visibleSystems.map((system) => (
        <StarSystem
            key={system.name}
            system={system}
        />
    ));
}

export default Galaxy;