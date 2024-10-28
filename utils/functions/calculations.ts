import { StarSystem as StarSystemType, Star as StarType, Planet as PlanetType, Moon as MoonType } from '../../utils/types/stellarBodies';

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
    x: number;
    y: number;
    left: string;
    top: string;
    width: number;
    height: number;
    backgroundColor: string;
    border: string;
    dTop: string;
    dLeft: string;
    type: string;
}

export interface BodyValuesProps {
    stellarData: StellarDataType;
    ratio: number;
    dev?: boolean;
    miniMap?: boolean;
}

export const bodyValues = (data: BodyValuesProps): BodyValuesType => {

    const { stellarData, ratio, miniMap, dev } = data;

    const calc = (f: number): string => `calc(50% + ${f}px)`;

    const formulateX = (stellarData: StellarDataType): number => {
        const { system, star, planet, moon } = stellarData;

        const systemX = system && system.position && system.position.x ? system.position.x : 0;
        const starX = star && star.position && star.position.x ? star.position.x : 0;
        const planetX = planet && planet.position && planet.position.x ? planet.position.x : 0;
        const moonX = moon && moon.position && moon.position.x ? moon.position.x : 0;

        return (
            (
                systemX
                +
                starX
                +
                planetX
                +
                moonX
            ) * ratio
        );
    }

    const formulateY = (stellarData: StellarDataType): number => {
        const { system, star, planet, moon } = stellarData;

        const systemY = system && system.position && system.position.y ? system.position.y : 0;
        const starY = star && star.position && star.position.y ? star.position.y : 0;
        const planetY = planet && planet.position && planet.position.y ? planet.position.y : 0;
        const moonY = moon && moon.position && moon.position.y ? moon.position.y : 0;

        return (
            (
                systemY
                +
                starY
                +
                planetY
                +
                moonY
            ) * ratio
        );
    }

    const formulateSize = (stellarData: StellarDataType): number => {
        const { star, planet, moon } = stellarData;
        return (
            (moon ? moon.radius : planet ? planet.radius : star ? star.radius : 0)
            *
            ratio
        );
    }

    const formulateLeft = (stellarData: StellarDataType): number => {
        const { system, star, planet, moon } = stellarData;
        const formula = (!star && !planet && !moon )? formulateX({system}) : formulateX(stellarData) - (system ? formulateX({system}) : 0);
        return formula;
    }

    const formulateTop = (stellarData: StellarDataType): number => {
        const { system, star, planet, moon } = stellarData;

        const formula = (!star && !planet && !moon )? formulateY({system}) : formulateY(stellarData) - (system ? formulateY({system}) : 0);
        return formula;
    }

    const formulateDLeft = (stellarData: StellarDataType): string => {
        const { star, planet, moon } = stellarData;

        const bodyLeft = formulateLeft(stellarData);
        const size = formulateSize(stellarData);
        const str = (!star && !planet && !moon ) ? (250 * ratio) + 'px': `calc(10px + ${bodyLeft}px + ${size/2}px)`;
        return str;
    }

    const formulateDTop = (stellarData: StellarDataType): string => {
        const { star, planet, moon } = stellarData;
        const bodyTop = formulateTop(stellarData);
        const str = (!star && !planet && !moon ) ? `calc(${dev ? '-1.55' : '-.5'}rem` : `calc(${bodyTop}px - ${dev ? '1.55' : '.5'}rem)`
        return str;
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
        x: formulateX(stellarData),
        y: formulateY(stellarData),
        left: calc(formulateLeft(stellarData)),
        top: calc(formulateTop(stellarData)),
        width: formulateSize(stellarData),
        height: formulateSize(stellarData),
        backgroundColor: formulateBackgroundColor(stellarData),
        border: formulateBorder(stellarData),
        dLeft: formulateDLeft(stellarData),
        dTop: formulateDTop(stellarData),
        type: formulateType(stellarData),
    }

    return bodyValues;
}

export const calculateDistance = (pos1: { x: number; y: number }, pos2: { x: number; y: number }): number => {
    return Math.sqrt((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2);
};