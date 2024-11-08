import { StarSystemType, StarType, PlanetType, MoonType } from '../types/stellarTypes';

export type BodyTypes = 'starSystem' | 'star' | 'planetSystem' | 'planet' | 'moonSystem' | 'moon' | 'asteroidSytem' | 'asteroid';

export const bodies: { [key in BodyTypes]: string } = {
    starSystem: 'starSystem',
    star: 'star',
    planetSystem: 'planetSystem',
    planet: 'planet',
    moonSystem: 'moonSystem',
    moon: 'moon',
    asteroidSytem: 'asteroidSytem',
    asteroid: 'asteroid',
};

export interface StellarDataType {
    system?: StarSystemType;
    star?: StarType;
    planet?: PlanetType;
    moon?: MoonType;
}

export interface BodyValuesType {
    name: string;
    key: string;
    width: number;
    height: number;
    backgroundColor: string;
    border: string;
    type: string;
}

export interface BodyValuesProps {
    stellarData: StellarDataType;
    dev?: boolean;
    miniMap?: boolean;
}


type Coordinates = {
    x: number;
    y: number;
};

interface AuCoordinates extends Coordinates {
    // cx: number;
    // cy: number;
}

const AU_TO_PX_SCALE = 50 / 0.39; // 1 AU = ~76.92px

type StellarObjectValues = {
    distance: number;
    distanceInPx: number;
    angle: number;
    coordinates: Coordinates;
    cumulativeCoordinates?: Coordinates;
};

interface UseAuCoordinatesProps {
    data: StellarDataType;
    type: keyof StellarDataType;
}

export const bodyValues = (data: BodyValuesProps): BodyValuesType => {

    const { stellarData, miniMap } = data;

    const formulateSize = (stellarData: StellarDataType): number => {
        const solarRadiiInAu = 0.00465047;
        const { star, planet, moon } = stellarData;
        const width = (moon ? moon.radius : planet ? planet.radius : star ? star.radius : 0) * (solarRadiiInAu * 20000);
        return width;
    }

    const formulateColor = (stellarData: StellarDataType): string => {
        const { star, planet, moon } = stellarData;
        const color = (moon ? moon.color : planet ? planet.color : star ? star.color : 'gray') as string;
        return color;
    }

    const formulateBackgroundColor = (stellarData: StellarDataType): string => {
        const color = formulateColor(stellarData);
        return miniMap ? 'transparent' : color;
    }

    const formulateBorder = (stellarData: StellarDataType): string => {
        const color = formulateColor(stellarData);
        return miniMap ? `2px solid ${color}` : 'none';
    }

    const formulateName = (stellarData: StellarDataType): string => {
        const { system, star, planet, moon } = stellarData;
        return moon ? moon.name : planet ? planet.name : star ? star.name : system ? system.name : '';
    }

    const formulateType = (stellarData: StellarDataType): string => {
        const { system, star, planet, moon } = stellarData;
        return moon ? bodies.moon : planet ? bodies.planet : star ? bodies.star : system ? bodies.starSystem : '';
    }

    const formulateKey = (stellarData: StellarDataType): string => {
        const name = formulateName(stellarData);
        const type = formulateType(stellarData);
        const mm = miniMap ? '-mm' : '';
        const key = `${name}-${type}${mm}`;
        return key;
    }

    const bodyValues: BodyValuesType = {
        name: formulateName(stellarData),
        key: formulateKey(stellarData),
        width: formulateSize(stellarData),
        height: formulateSize(stellarData),
        backgroundColor: formulateBackgroundColor(stellarData),
        border: formulateBorder(stellarData),
        type: formulateType(stellarData),
    }

    return bodyValues;
}

export const calculateDistance = (pos1: { x: number; y: number }, pos2: { x: number; y: number }): number => {
    return Math.sqrt((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2);
};

export const distanceTo = (props : { px: number, py: number, cx: number, cy: number }) => {
    const { px, py, cx, cy } = props;
    return Number(Math.sqrt(Math.pow(px - cx, 2) + Math.pow(py - cy, 2)).toFixed(0));
}

export const findBody = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    obj: { [key: string]: any },
    name: string,
    type: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any | undefined => {
    // Base case: if the current object matches, return it
    if (obj.name === name && obj.type === type) {
        return obj;
    }

    // Iterate through each property of the current object
    for (const key in obj) {
        // Ensure the property is an object before diving deeper
        if (typeof obj[key] === "object" && obj[key] !== null) {
            const result = findBody(obj[key], name, type);
            if (result) {
                return result; // Found a match in a nested object
            }
        }
    }

    return undefined; // No match found in this branch
}

// calculateCurrentAngle.ts
const START_TIME = new Date('2000-01-01T00:00:00Z');

export function calculateCurrentAngle(
    startingAngle: number, 
    orbitalPeriod: number, 
    // now: Date
): number {
//   const elapsedTimeInDays =
//     (now.getTime() - START_TIME.getTime()) / (1000 * 60 * 60 * 24); // Convert milliseconds to days

//   // Calculate degrees per day
//   const degreesPerDay = orbitalPeriod === 0 ? 1 : 360 / orbitalPeriod;

//   // Calculate the current angle based on elapsed time
  const angle = (
    startingAngle 
    // + 
    // degreesPerDay * 
    // elapsedTimeInDays
) % 360;

  return angle;
}

export default calculateCurrentAngle;

export const getAuCoordinates: (props: UseAuCoordinatesProps) => AuCoordinates = ({ data, type }) => {

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
        const x = (distance * Math.cos(angleInRadians)).toFixed(0);
        const y = (distance * Math.sin(angleInRadians)).toFixed(0);
        const c = { x: Number(x), y: Number(y) };
        return c;
    };

    const setCelestialObject = (
        type: keyof StellarDataType,
        data: StellarDataType,
        parentTypes: (keyof StellarDataType)[] = []
    ) => {
        const objectData = data[type];
        if (objectData && values[type]) {

            values[type].angle = calculatedAngles[type] || 0;
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
            data[type] && setCelestialObject(type, data, parentTypesMap[type]);
        });
    };

    setValues(data);

    return values[type]?.coordinates ?? { x: 0, y: 0 };
};
