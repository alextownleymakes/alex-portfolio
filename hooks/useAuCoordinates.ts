import { useMemo } from 'react';
import { StellarDataType } from '@/utils/functions/calculations';
import useCurrentAngle from './useCurrentAngle';
import { OrbitTypes } from '@/state/gameStateSlice';
import { StarSystemType, StarType, PlanetType, MoonType } from '@/utils/types/stellarTypes';

type Coordinates = {
    x: number;
    y: number;
    aX: number;
    aY: number;
    tX: number;
    tY: number;
};

const AU_TO_PX_SCALE = 50 / 0.39; // 1 AU = ~76.92px

/**
 * Converts a distance in AU to x, y coordinates, based on an optional starting reference point.
 *
 * @param distanceInAU - The distance in Astronomical Units (AU) to convert.
 * @param angleInDegrees - The angle in degrees to determine the x, y offset.
 * @param baseCoords - Optional base coordinates to start from (default is { x: 0, y: 0 }).
 * @returns Coordinates in pixels from the base point.
 */
const useAuCoordinates = (
    data: StellarDataType,
    type: OrbitTypes,
    ratio: number
): Coordinates => {

    const values = {
        system: {
            distance: 0,
            distanceInPx: 0,
            angle: 0,
            coordinates: { x: 0, y: 0 },
        },
        star: {
            distance: 0,
            distanceInPx: 0,
            angle: 0,
            coordinates: 0,
        },
        planet: {
            distance: 0,
            distanceInPx: 0,
            angle: 0,
            coordinates: 0,
        },
        moon: {
            distance: 0,
            distanceInPx: 0,
            angle: 0,
            coordinates: 0,
        },
    }

    const systemAngle = data.system ? getAngle(data.system?.angleFromParent, data.system?.orbitalPeriod) : 0;
    const starAngle = data.star ? getAngle(data.star?.angleFromParent, data.star?.orbitalPeriod) : 0;
    const planetAngle = data.planet ? getAngle(data.planet?.angleFromParent, data.planet?.orbitalPeriod) : 0;
    const moonAngle = data.moon ? getAngle( data.moon?.angleFromParent, data.moon?.orbitalPeriod) : 0;

    return useMemo(() => {
        const { system, star, planet, moon } = data;

        

        const systemDistance = system?.distanceFromParent || 0;
        const starDistance = star?.distanceFromParent || 0;
        const planetDistance = planet?.distanceFromParent || 0;
        const moonDistance = moon?.distanceFromParent || 0;

        const systemAngleInRadians = (systemAngle * Math.PI) / 180;
        const starAngleInRadians = (starAngle * Math.PI) / 180;
        const planetAngleInRadians = (planetAngle * Math.PI) / 180;
        const moonAngleInRadians = (moonAngle * Math.PI) / 180;

        const systemDistanceInPx = systemDistance * AU_TO_PX_SCALE;
        const starDistanceInPx = starDistance * AU_TO_PX_SCALE;
        const planetDistanceInPx = planetDistance * AU_TO_PX_SCALE;
        const moonDistanceInPx = moonDistance * AU_TO_PX_SCALE * (100);

        const systemCoords = {
            x: systemDistanceInPx * Math.cos(systemAngleInRadians) * ratio,
            y: systemDistanceInPx * Math.sin(systemAngleInRadians) * ratio,
        };
        
        const starCoords = {
            x: starDistanceInPx * Math.cos(starAngleInRadians) * ratio,
            y: starDistanceInPx * Math.sin(starAngleInRadians) * ratio,
        };

        const planetCoords = {
            x: planetDistanceInPx * Math.cos(planetAngleInRadians) * ratio,
            y: planetDistanceInPx * Math.sin(planetAngleInRadians) * ratio,
        };

        const moonCoords = {
            x: (planetDistanceInPx * Math.cos(planetAngleInRadians) * ratio) + (moonDistanceInPx * Math.cos(moonAngleInRadians) * ratio),
            y: (planetDistanceInPx * Math.sin(planetAngleInRadians) * ratio) + (moonDistanceInPx * Math.sin(moonAngleInRadians) * ratio),
        };

        const coords: { [key: string]: Coordinates } = {
            'system': {
                x: systemCoords.x,
                y: systemCoords.y,
                aX: systemCoords.x,
                aY: systemCoords.y,
                tX: systemCoords.x,
                tY: systemCoords.y,
            },
            'star': {
                x: starCoords.x,
                y: starCoords.y,
                aX: starCoords.x + systemCoords.x,
                aY: starCoords.y + systemCoords.y,
                tX: systemCoords.x + starCoords.x,
                tY: systemCoords.y + starCoords.y,
            },
            'planet': {
                x: planetCoords.x,
                y: planetCoords.y,
                aX: planetCoords.x + systemCoords.x,
                aY: planetCoords.y + systemCoords.y,
                tX: systemCoords.x + starCoords.x + planetCoords.x,
                tY: systemCoords.y + starCoords.y + planetCoords.y,
            },
            'moon': {
                x: moonCoords.x,
                y: moonCoords.y,
                aX: moonCoords.x + systemCoords.x,
                aY: moonCoords.y + systemCoords.y,
                tX: systemCoords.x + starCoords.x + planetCoords.x + moonCoords.x,
                tY: systemCoords.y + starCoords.y + planetCoords.y + moonCoords.y,
            }
        }

        return coords[type];

    }, [data, ratio]);
};

const systemAuCoordinates = (
    data: { system: StarSystemType },
    ratio: number
): Coordinates => {

    return {
        x: 0,
        y: 0,
        aX: 0,
        aY: 0,
        tX: 0,
        tY: 0,
    }
}

const starAuCoordinates = (
    data: { system: StarSystemType, star: StarType },
    ratio: number
): Coordinates => {
    
        return {
            x: 0,
            y: 0,
            aX: 0,
            aY: 0,
            tX: 0,
            tY: 0,
        }
    }

const planetAuCoordinates = (
    data: { system: StarSystemType, star: StarType, planet: PlanetType },
    ratio: number
): Coordinates => {
    
        return {
            x: 0,
            y: 0,
            aX: 0,
            aY: 0,
            tX: 0,
            tY: 0,
        }
    }

const moonAuCoordinates = (
    data: { system: StarSystemType, star: StarType, planet: PlanetType, moon: MoonType },
    ratio: number
): Coordinates => {
    
        return {
            x: 0,
            y: 0,
            aX: 0,
            aY: 0,
            tX: 0,
            tY: 0,
        }
    }

    // const relativeCoords = ({ distance, angle, ratio }: { distance: number, angle: number, ratio: number }) => {

    //     return {
    //         x: systemDistanceInPx * Math.cos(systemAngleInRadians) * ratio,
    //         y: systemDistanceInPx * Math.sin(systemAngleInRadians) * ratio,
    //     }
    // }




export default useAuCoordinates;
