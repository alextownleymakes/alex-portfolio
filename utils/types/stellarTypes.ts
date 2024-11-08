import { StarComposition, PlanetComposition, MoonComposition, AsteroidComposition, CometComposition } from "../composition";

// i need to imagine for a minute that i am working with a system to scale a galaxy where the uom is AU.
// galaxy details:
// 1. the width of the full galaxy is represented by a div 1,000,000 pixels in width and height. 
// 2. the center of the galaxy is at 0,0, offset by 50% of the width and height of the div
// 3. 0,0 is at top: 500,000px, left: 500,000px
// 4. the galaxy is 100,000,000 AU in diameter, a small galaxy around 1581.25 light years in diameter
// 
// scale details:
// 1. the scale is represented by a zoom level, 0-6, where 0 is the most zoomed out and 6 is the most zoomed in
//
// 2. the div, at zoom level 0 (galaxy), represents a scale of 1000px for 100,000 AU, so the div is 1,000,000 pixels in width and height, representing 100,000,000 AU total
// 3. zoom level 1 (starSystem - 150AU diameter) represents a scale of 1000px for 200 AU, so the viewport is able to display a full star system reasonably, so the div is 500,000,000 pixels in width and height, representing 100,000,000 AU
// 4. zoom level 2 (star-1 - 60AU diameter), represents a scale of 1000px for 100 AU, so the viewport is able to display a full solar system reasonably, so the div is 1,000,000,000 pixels in width and height, representing 100,000,000 AU
// 5. zoom level 3 (star-2 - 60AU diameter), represents a scale of 1000px for 20 AU, so the viewport is able to display the majority of a solar system's planets, so the div is 5,000,000,000 pixels in width and height, representing 100,000,000 AU
// 6. zoom level 4 (star-3 - 60AU diameter), represents a scale of 1000px for 2 AU, so the viewport is able to display a solar system's inner planets, so the div is 50,000,000,000 pixels in width and height, representing 100,000,000 AU
// 7. zoom level 5 (planet), represents a scale of 1000px for .02 AU, so the viewport is able to display a planet and its moons, so the div is 500,000,000,000 pixels in width and height, representing 100,000,000 AU
// 8. zoom level 6 (moon), represents a scale of 1000px for .002 AU, so the viewport is able to display a moon, so the div is 5,000,000,000,000 pixels in width and height, representing 100,000,000 AU

// if i have..

export interface ScaleType {
    [key: number]: number;
}

export const scale: ScaleType = {
    0: 1/100,
    1: 2.5,
    2: 5,
    3: 50,
    4: 500,
    5: 50000,
    6: 500000
}

export interface ZoomType {
    [key: number]: number;
}

// what would the values for each be to ensure that if actual measurements in AU were given, 
// they would scale to these pixel sizes?
// imagine that at zoom level 0, a star system is 100au from the system center

export type MoonVariants = 'rocky' | 'icy' | 'lava' | 'ocean' | 'desert' | 'forest' | 'gas' | 'dwarf' | 'rogue' | 'expomoon';
export type PlanetVariants = 'terrestrial' | 'gasGiant' | 'iceGiant' | 'dwarfPlanet' | 'rocky' | 'earthLike' | 'superEarth' | 'dwarf' | 'dwarfGas' | 'rogue' | 'expolanet'
export type StarVariants = 'mainSequence' | 'redGiant' | 'whiteDwarf' | 'neutron' | 'blackHole' | 'pulsar' | 'quasar' | 'supernova' | 'hypernova' | 'nova' | 'protostar' | 'subdwarf';
export type AU = number;
export type KG = number;
export type KM = number;
export type SolDays = number;

export interface StellarType {
    id: number;
    name: string;
    orbitalPeriod: SolDays;
    orbitalSpeed: KM;
    gravitationalInfluence: AU;
    scatteredDisk: AU;
    scale: number;
    approachDistance: AU;
    radius: AU;
    distanceFromParent: AU;
    angleFromParent: number;
    position: {
        x: number;
        y: number;
    };
}

export interface StellarBodyType extends StellarType {
    mass: KG;
    density: number;
    gravity: number;
    escapeVelocity: number;
    rotationPeriod: SolDays;
    axialTilt: number;
    age: number;
    color?: string;
}

export interface MoonType extends StellarBodyType {
    variant: MoonVariants;
    composition: MoonComposition;
}

export interface PlanetType extends StellarBodyType {
    variant: PlanetVariants
    moons: MoonType[];
    composition: PlanetComposition;
}

export interface DwarfPlanetType extends StellarBodyType {
    variant: 'dwarfPlanet';
    composition: PlanetComposition;
    moons: MoonType[];
}

export interface AsteroidType extends StellarBodyType {
    variant: 'asteroid';
    composition: AsteroidComposition;
}

export interface AsteroidBeltType extends StellarBodyType {
    asteroids: AsteroidType[];
    numAsteroids: number;
}

export interface CometType extends StellarBodyType {
    variant: 'comet';
    composition: CometComposition;
}

export type PlanetsTypes = PlanetType | DwarfPlanetType;

export interface StarType extends StellarBodyType {
    variant: StarVariants;
    numPlanets: number;
    numComets: number;
    planets: PlanetsTypes[];
    comets?: CometType[];
    hasAsteroids: boolean;
    asteroidBelt?: AsteroidBeltType;
    composition: StarComposition;
    luminosity: number;
    temperature?: number;
}

export interface StarSystemType extends StellarType {
    stars: StarType[];
    numStars: number;
}

export const stellarRanges = {
    starSystem: {
        parent: 'galaxy',
        min: 0,
        max: 100000000
    },
    star: {
        parent: 'starSystem',
        min: 0,
        max: 100
    },
    planet: {
        parent: 'star',
        min: 0.2,
        max: 60
    },
    moon: {
        parent: 'planet',
        min: 0.0000627,
        max: 60
    },
    asteroidBelt: {
        parent: 'star',
        min: 3,
        max: 10
    },
    asteroid: {
        parent: 'asteroidBelt',
        min: 0,
        max: 1.2
    },
    comet: {
        parent: 'star',
        min: .5,
        max: 100
    }
}