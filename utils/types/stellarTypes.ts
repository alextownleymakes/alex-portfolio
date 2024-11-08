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

export const solariaA: StarType = {
    id: 0,
    name: "Solaria A",
    variant: "mainSequence",
    numPlanets: 0,
    numComets: 0,
    hasAsteroids: false,
    mass: 1.989e30, // KG, similar to the mass of our Sun
    density: 1.41, // g/cm^3, average density of the Sun
    gravity: 274, // m/s^2, solar surface gravity
    escapeVelocity: 617.5, // km/s, solar escape velocity
    rotationPeriod: 25, // SolDays, solar rotation period at the equator
    axialTilt: 7.25, // degrees, solar axial tilt
    age: 4_600_000_000, // in years, typical for a main-sequence star

    // Star characteristics within the star system
    orbitalPeriod: 0, // Star is central in its own system, so no orbit period
    orbitalSpeed: 0, // Main star has no speed relative to itself in the system
    gravitationalInfluence: 100, // AU, gravitational influence for planetary orbits
    scatteredDisk: 60, // AU, scattered disk distance
    scale: 1, // Base scale for realism
    approachDistance: 0.5, // AU, gameplay interaction distance
    radius: 0.002325, // AU, solar diameter (~696,340 km converted to AU)
    distanceFromParent: 0, // AU, central star in the system
    angleFromParent: 0, // No angular offset within its own system
    luminosity: 1, // Solar luminosity

    planets: [], // No planets included in this example
    composition: {
        hydrogen: 73.5, // Composition percentages
        helium: 24.85,
        // metals: 1.65 // Remaining heavier elements
    }
}

export const solaria: StarSystemType = {
    id: 0,
    name: "Solaria",
    numStars: 1,
    // Orbital parameters around the galactic center
    orbitalPeriod: 200_000_000, // in SolDays, e.g., approx. 200 million years around galactic center
    orbitalSpeed: 220 * 1_000, // in KM, typical orbital speed around galactic center for Sun-like stars ~220 km/s
    gravitationalInfluence: 100, // AU, reasonable influence distance for this star system
    scatteredDisk: 60, // AU, radius for scattered disk bodies
    scale: 1, // Scale factor set to base for this example
    approachDistance: 1, // AU, gameplay distance for "close approach"
    radius: 0.5, // AU, approximate extent for outer boundary markers
    distanceFromParent: 500, // AU from the galactic center
    angleFromParent: 45, // Arbitrary angle within the galactic plane

    // Main star in the system
    stars: [solariaA],
};

export const starSystems: StarSystemType[] = [solaria];

// i need a function library that is as so:

export const generateStarSystem = {
    generateSystem: (system: StarSystemType): StarSystemType => {
        return system;
    },
    generateStar: (star: StarType): StarType => {
        return star;
    },
    generatePlanet: (planet: PlanetType): PlanetType => {
        return planet;
    },
    generateMoon: (moon: MoonType): MoonType => {
        return moon;
    },
    generateDwarfPlanet: (dwarfPlanet: DwarfPlanetType): DwarfPlanetType => {
        return dwarfPlanet;
    },
    generateAsteroid: (asteroid: AsteroidType): AsteroidType => {
        return asteroid;
    },
    generateAsteroidBelt: (asteroidBelt: AsteroidBeltType): AsteroidBeltType => {
        return asteroidBelt;
    },
    generateComet: (comet: CometType): CometType => {
        return comet;
    }
}

export const generationFunctions = {
    determineMass: (min: number, max: number): number => {
        return Math.random() * (max - min) + min;
    },
    determineDensity: (min: number, max: number): number => {
        return Math.random() * (max - min) + min;
    },
    determineGravity: (min: number, max: number): number => {
        return Math.random() * (max - min) + min;
    },
    determineEscapeVelocity: (min: number, max: number): number => {
        return Math.random() * (max - min) + min;
    },
    determineRotationPeriod: (min: number, max: number): number => {
        return Math.random() * (max - min) + min;
    },
    determineAxialTilt: (min: number, max: number): number => {
        return Math.random() * (max - min) + min;
    },
    determineAge: (min: number, max: number): number => {
        return Math.random() * (max - min) + min;
    },
    determineOrbitalPeriod: (min: number, max: number): number => {
        return Math.random() * (max - min) + min;
    },
    determineOrbitalSpeed: (min: number, max: number): number => {
        return Math.random() * (max - min) + min;
    },
    determineGravitationalInfluence: (min: number, max: number): number => {
        return Math.random() * (max - min) + min;
    },
    determineScatteredDisk: (min: number, max: number): number => {
        return Math.random() * (max - min) + min;
    },
    determineScale: (min: number, max: number): number => {
        return Math.random() * (max - min) + min;
    },
    determineApproachDistance: (min: number, max: number): number => {
        return Math.random() * (max - min) + min;
    },
    determineDiameter: (min: number, max: number): number => {
        return Math.random() * (max - min) + min;
    },
    determineDistanceFromParent: (min: number, max: number): number => {
        return Math.random() * (max - min) + min;
    },
    determineAngleFromParent: (min: number, max: number): number => {
        return Math.random() * (max - min) + min;
    },
    determineComposition: (min: number, max: number): StarComposition => {
        return {
            hydrogen: Math.random() * (max - min) + min,
            helium: Math.random() * (max - min) + min
        }
    },
    determineVariant: <T>(variants: T[]): T => {
        return variants[Math.floor(Math.random() * variants.length)];
    }
}