import { useMemo } from 'react';
import { StellarDataType } from '@/utils/functions/calculations';
import useCurrentAngle from './useCurrentAngle';
import { StellarBodyType } from '@/utils/types/stellarBodies';
import { OrbitTypes } from '@/state/gameStateSlice';

type Coordinates = {
    x: number;
    y: number;
    aX: number;
    aY: number;
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

    const starAngle = data.star ? useCurrentAngle(data.star?.angleFromCenter, data.star?.orbitalPeriod) : 0;
    const planetAngle = data.planet ? useCurrentAngle(data.planet?.angleFromStar, data.planet?.orbitalPeriod) : 0;
    const moonAngle = data.moon ? useCurrentAngle(data.moon?.angleFromPlanet, data.moon?.orbitalPeriod) : 0;

    return useMemo(() => {
        const { system, star, planet, moon } = data;

        const systemCoords = { x: (system?.position.x || 0) * ratio, y: (system?.position.y || 0) * ratio };
        const starDistance = star?.distanceFromCenter || 0;
        const planetDistance = planet?.distanceFromStar || 0;
        const moonDistance = moon?.distanceFromPlanet || 0;

        const starAngleInRadians = (starAngle * Math.PI) / 180;
        const planetAngleInRadians = (planetAngle * Math.PI) / 180;
        const moonAngleInRadians = (moonAngle * Math.PI) / 180;

        const starDistanceInPx = starDistance * AU_TO_PX_SCALE;
        const planetDistanceInPx = planetDistance * AU_TO_PX_SCALE;
        const moonDistanceInPx = moonDistance * AU_TO_PX_SCALE * 200;

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
            },
            'star': {
                x: starCoords.x,
                y: starCoords.y,
                aX: starCoords.x + systemCoords.x,
                aY: starCoords.y + systemCoords.y,
            },
            'planet': {
                x: planetCoords.x,
                y: planetCoords.y,
                aX: planetCoords.x + systemCoords.x,
                aY: planetCoords.y + systemCoords.y,
            },
            'moon': {
                x: moonCoords.x,
                y: moonCoords.y,
                aX: moonCoords.x + systemCoords.x,
                aY: moonCoords.y + systemCoords.y,
            }
        }

        return coords[type];

    }, [data, ratio]);
};

export default useAuCoordinates;
