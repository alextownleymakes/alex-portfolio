"use client";

import React from 'react';
import { StarSystem as StarSystemType } from '../../utils/types/stellarBodies';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import StarSystem from '../StarSystem/StarSystem';
import { ratios } from '../../utils/functions/zoom';

interface GalaxyProps {
    systems: StarSystemType[]
}

export const baseSize = 100000;

const Galaxy: React.FC<GalaxyProps> = ({
    systems,
}) => {
    const playerState = useSelector((state: RootState) => state.gameState);

    const { position, universeSize, zoomedPosition, velocity, speed, rotation, zoom } = playerState;

    const galaxyRef = React.useRef<HTMLDivElement>(null);

    // React.useEffect(() => {
    //     const galaxyPos = {
    //         x: -((universeSize * ratios[zoom]) / 2) + (window.innerWidth/2) - (zoomedPosition.x !== 0 ? zoomedPosition.x : position.x),
    //         y: -((universeSize * ratios[zoom]) / 2) + (window.innerHeight/2) - (zoomedPosition.y !== 0 ? zoomedPosition.y : position.y),
    //     }

    //     if (galaxyRef.current) {
    //         galaxyRef.current.style.left = `${galaxyPos.x}px`;
    //         galaxyRef.current.style.top = `${galaxyPos.y}px`;
    //     }
    // }, [position]);


        const visibleSystems = systems.filter(system => {
            const distance = Math.sqrt(Math.pow(playerState.position.x - system.position.x, 2) + Math.pow(playerState.position.y - system.position.y, 2));
            return distance < 3000;
        });

        return (
            <div
                ref={galaxyRef}
                style={{
                    width: universeSize * ratios[zoom],
                    height: universeSize * ratios[zoom],
                    position: 'absolute',
                    left: -((universeSize * ratios[zoom]) / 2) + (window.innerWidth/2) - (zoomedPosition.x !== 0 ? zoomedPosition.x : position.x),
                    top: -((universeSize * ratios[zoom]) / 2) + (window.innerHeight/2) - (zoomedPosition.y !== 0 ? zoomedPosition.y : position.y),
                    // transition: 'all .1s ease-in-out',
                }}>
                {visibleSystems.map((system) => (
                    <StarSystem
                        key={system.name}
                        system={system}
                    />
                ))}
            </div>
        );
    }

export default Galaxy;