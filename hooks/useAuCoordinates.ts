// useAuCoordinates.ts
import { useMemo } from 'react';
import { OrbitTypes } from '@/state/gameStateSlice';
import { StarSystemType, StarType, PlanetType, MoonType } from '@/utils/types/stellarTypes';
import calculateCurrentAngle from '@/utils/functions/calculations';
import useTime from './useTime';

type Coordinates = {
    x: number;
    y: number;
};

const AU_TO_PX_SCALE = 50 / 0.39; // 1 AU = ~76.92px

interface StellarDataType {
    system?: StarSystemType;
    star?: StarType;
    planet?: PlanetType;
    moon?: MoonType;
}

type StellarObjectValues = {
    distance: number;
    distanceInPx: number;
    angle: number;
    coordinates: Coordinates;
};

interface UseAuCoordinatesProps {
    data: StellarDataType;
    type: keyof StellarDataType;
    ratio: number;
}

const useAuCoordinates: (props: UseAuCoordinatesProps) => Coordinates = ({ data, type, ratio }) => {
    console.log('useAuCoordinates', data[type]?.name, data, type, ratio);
    
    return useMemo(() => {
        // const now = new Date(); // Update every second
        const values: { [key in keyof StellarDataType]: StellarObjectValues } = {
            system: { distance: 0, distanceInPx: 0, angle: 0, coordinates: { x: 0, y: 0 } },
            star: { distance: 0, distanceInPx: 0, angle: 0, coordinates: { x: 0, y: 0 } },
            planet: { distance: 0, distanceInPx: 0, angle: 0, coordinates: { x: 0, y: 0 } },
            moon: { distance: 0, distanceInPx: 0, angle: 0, coordinates: { x: 0, y: 0 } },
        };

        // Calculate angles at the top level
        const calculatedAngles: { [key in keyof StellarDataType]: number } = {
            system: data.system
                ? calculateCurrentAngle(
                    data.system.angleFromParent, 
                    data.system.orbitalPeriod, 
                    // now
                )
                : 0,
            star: data.star
                ? calculateCurrentAngle(
                    data.star.angleFromParent, 
                    data.star.orbitalPeriod, 
                    // now
                )
                : 0,
            planet: data.planet
                ? calculateCurrentAngle(
                    data.planet.angleFromParent, 
                    data.planet.orbitalPeriod, 
                    // now
                )
                : 0,
            moon: data.moon
                ? calculateCurrentAngle(
                    data.moon.angleFromParent, 
                    data.moon.orbitalPeriod, 
                    // now
                )
                : 0,
        };

        const getCoords = (distance: number, angle: number) => {
            const angleInRadians = (angle * Math.PI) / 180;
            const x = (distance * Math.cos(angleInRadians) * ratio).toFixed(0);
            const y = (distance * Math.sin(angleInRadians) * ratio).toFixed(0);
            console.log('getCoords', distance, angle, angleInRadians, ratio, x, y);
            const c = { x: Number(x), y: Number(y) };
            return c;
        };

        const setCelestialObject = (
            type: keyof StellarDataType,
            data: StellarDataType,
            parentTypes: (keyof StellarDataType)[] = []
        ) => {
            const objectData = data[type];
            if (objectData && values[type] && calculatedAngles[type]) {
                
                values[type].angle = calculatedAngles[type];
                values[type].distance = objectData.distanceFromParent;
                values[type].distanceInPx = objectData.distanceFromParent * AU_TO_PX_SCALE;

                
                const parentCoords = parentTypes.map(
                    (parentType) => values[parentType] ? values[parentType].coordinates : { x: 0, y: 0 }
                );
                
                
                const baseCoords = getCoords(values[type].distanceInPx, values[type].angle);
                
                
                const finalCoords = parentCoords.reduce(
                    (accum, curr) => ({
                        x: Number((accum.x + curr.x).toFixed(0)),
                        y: Number((accum.y + curr.y).toFixed(0)),
                    }),
                    baseCoords
                );
                // console.log(objectData.name, 'd: ', values[type].distance, 'dpx: ', values[type].distanceInPx, 'a :', values[type].angle, 'c-base: ', baseCoords, 'c-parent: ', parentCoords, 'c-final :', finalCoords);
                // console.log('finalCoords', finalCoords);
                values[type].coordinates = finalCoords;
            }
        };

        const parentTypesMap: { [K in keyof StellarDataType]: (keyof StellarDataType)[] } = {
            system: [],
            star: ['system'],
            planet: ['system', 'star'],
            moon: ['system', 'star', 'planet'],
        };

        const setValues = (data: StellarDataType) => {
            (Object.keys(parentTypesMap) as (keyof StellarDataType)[]).forEach((type) => {
                // console.log('PRE ', type, data, parentTypesMap[type]);
                setCelestialObject(type, data, parentTypesMap[type]);
            });
        };

        setValues(data);

        return values[type]?.coordinates ?? { x: 0, y: 0 };
    }, [data, ratio]); // Include 'now' in dependencies
};

export default useAuCoordinates;
