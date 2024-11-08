import { AU, KM, StarSystemType, StarType, PlanetType, MoonType, AsteroidType, StarVariants, PlanetVariants, PlanetsTypes, CometType, AsteroidBeltType, SolDays } from './stellarTypes';
import { StarComposition, PlanetComposition, MoonComposition, CometComposition, AsteroidComposition } from '../composition';
import { getAuCoordinates } from '../functions/calculations';

function generateStarSystem(id: number): StarSystemType {
    const numStars = determineNumberOfStars();
    const stars: StarType[] = [];
    for (let i = 0; i < numStars; i++) {
        const star = generateStar(i);
        stars.push(star);
    }

    // Position stars appropriately (e.g., binary orbits)
    if (numStars > 1) {
        positionStarsInSystem(stars);
    }
    const name = `Star System ${id}`;
    const orbitalPeriod = calculateSystemOrbitalPeriod();
    const orbitalSpeed = calculateSystemOrbitalSpeed();
    const gravitationalInfluence = calculateSystemGravitationalInfluence(stars);
    const scatteredDisk = calculateSystemScatteredDisk(stars);
    const distanceFromParent = calculateSystemDistanceFromGalacticCenter();
    const angleFromParent = randomInRange(0, 360);

    return {
        id,
        name: `Star System ${id}`,
        numStars,
        stars,
        // Orbital parameters around the galactic center
        orbitalPeriod: calculateSystemOrbitalPeriod(),
        orbitalSpeed: calculateSystemOrbitalSpeed(),
        gravitationalInfluence: calculateSystemGravitationalInfluence(stars),
        scatteredDisk: calculateSystemScatteredDisk(stars),
        scale: 1,
        approachDistance: 0, // Not applicable for the system as a whole
        radius: 200,           // Can be calculated if needed
        distanceFromParent: calculateSystemDistanceFromGalacticCenter(),
        angleFromParent: randomInRange(0, 360),
        position: { x: 0, y: 0 }, // Placeholder
    };
}

function determineNumberOfStars(): number {
    const rand = Math.random();
    if (rand < 0.67) return 1;
    else if (rand < 0.91) return 2;
    else if (rand < 0.99) return 3;
    else return 4 + Math.floor(Math.random() * 3); // Up to 6 stars
}

function positionStarsInSystem(stars: StarType[]) {
    for (let i = 0; i < stars.length; i++) {

        stars[i].distanceFromParent = randomInRange(10, 100); // AU

        stars[i].angleFromParent = randomInRange(((360/stars.length) * i), ((360 / stars.length) * (i+1))); // Degrees
    }
    // Add more configurations for systems with 3+ stars if needed
}
// Add more configurations for systems with 3+ stars if needed


function generateStar(id: number): StarType {
    const mass = generateStarMass();
    const variant = determineSpectralType(mass);
    const luminosity = calculateLuminosity(mass);
    const radius = calculateRadius(mass);
    const temperature = calculateTemperature(variant);
    const age = determineStarAge(mass);

    // Initialize planets and comets arrays
    const planets: PlanetsTypes[] = []; // We'll generate planets later
    const comets: CometType[] = [];     // Similarly for comets

    // Determine if the star has an asteroid belt
    const hasAsteroids = determineHasAsteroidBelt(variant);

    // Generate composition based on variant
    const composition = generateStarComposition(variant);

    // Calculate gravitational influence and other orbital parameters
    const gravitationalInfluence = calculateGravitationalInfluence(mass, luminosity);
    const scatteredDisk = gravitationalInfluence * 1.5; // Example scaling
    const approachDistance = radius * 10; // Example: 10 times the radius
    const orbitalPeriod = 0; // Central star in its own system
    const orbitalSpeed = 0;  // Central star in its own system
    const scale = 1; // Base scale
    const distanceFromParent = 0; // Central star
    const angleFromParent = 0;    // Central star
    const density = calculateDensity(mass, radius);
    const gravity = calculateSurfaceGravity(mass, radius);
    const escapeVelocity = calculateEscapeVelocity(mass, radius);
    const rotationPeriod = determineStarRotationPeriod(variant);
    const axialTilt = determineAxialTilt();
    const asteroidBelt = hasAsteroids ? generateAsteroidBelt() : undefined;
    const position = { x: 0, y: 0 }; // Placeholder

    return {
        id,
        name: `Star ${id}`,
        variant,
        mass,
        luminosity,
        radius,
        temperature,
        age,
        numPlanets: planets.length,
        numComets: comets.length,
        planets,
        comets,
        hasAsteroids,
        asteroidBelt,
        composition,
        // Properties from StellarBodyType and StellarType
        density,
        gravity,
        escapeVelocity,
        rotationPeriod,
        axialTilt,
        gravitationalInfluence,
        scatteredDisk,
        approachDistance,
        orbitalPeriod,
        orbitalSpeed,
        scale,
        distanceFromParent,
        angleFromParent,
        position,
    };
}

function determineHasAsteroidBelt(variant: StarVariants): boolean {
    // Simplified logic: most main sequence stars may have asteroid belts
    return variant === 'mainSequence' ? Math.random() < 0.8 : Math.random() < 0.5;
}

function generateStarComposition(variant: StarVariants): StarComposition {
    // Simplified compositions based on variant
    let hydrogenPercentage = 70 + Math.random() * 5; // Between 70% and 75%
    let heliumPercentage = 24 + Math.random() * 5;   // Between 24% and 29%
    let metalsPercentage = 100 - (hydrogenPercentage + heliumPercentage);

    return {
        hydrogen: hydrogenPercentage,
        helium: heliumPercentage,
        // metals: metalsPercentage, // Metals percentage if needed
        // Additional elements can be added here
    };
}

function calculateGravitationalInfluence(mass: number, luminosity: number): number {
    // Simplified approach: gravitational influence scales with mass
    return mass * 100; // Example scaling factor
}

function calculateDensity(mass: number, radius: number): number {
    // Density = Mass / Volume
    // Volume of a sphere: (4/3) * π * radius^3
    const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
    return mass / volume;
}

function calculateSurfaceGravity(mass: number, radius: number): number {
    const G = 6.67430e-11; // Gravitational constant
    // Convert mass to kg and radius to meters if needed
    return (G * mass) / Math.pow(radius, 2);
}

function calculateEscapeVelocity(mass: number, radius: number): number {
    const G = 6.67430e-11; // Gravitational constant
    return Math.sqrt((2 * G * mass) / radius);
}

function determineStarRotationPeriod(variant: StarVariants): SolDays {
    // Simplified logic: rotation period varies by star type
    switch (variant) {
        case 'mainSequence':
            return randomInRange(20, 30); // SolDays
        case 'neutron':
            return randomInRange(0.01, 0.1); // Rapid rotation
        // Add cases for other variants
        default:
            return randomInRange(25, 35);
    }
}

function determineAxialTilt(): number {
    // Random axial tilt between 0 and 30 degrees
    return randomInRange(0, 30);
}


function generateStarMass(): number {
    // Use a simplified Kroupa IMF for mass distribution
    const rand = Math.random();
    if (rand < 0.5) return randomInRange(0.1, 0.5); // M-type stars
    else if (rand < 0.75) return randomInRange(0.5, 0.8); // K-type stars
    else if (rand < 0.9) return randomInRange(0.8, 1.04); // G-type stars
    else if (rand < 0.97) return randomInRange(1.04, 1.4); // F-type stars
    else if (rand < 0.99) return randomInRange(1.4, 2.1); // A-type stars
    else return randomInRange(2.1, 16); // B and O-type stars
}

function determineSpectralType(mass: number): StarVariants {
    if (mass < 0.45) return 'mainSequence'; // M-type
    else if (mass < 0.8) return 'mainSequence'; // K-type
    else if (mass < 1.04) return 'mainSequence'; // G-type
    else if (mass < 1.4) return 'mainSequence'; // F-type
    else if (mass < 2.1) return 'mainSequence'; // A-type
    else if (mass < 16) return 'mainSequence'; // B-type
    else return 'mainSequence'; // O-type
}

function calculateLuminosity(mass: number): number {
    // Mass-Luminosity relation: L ∝ M^3.5
    return Math.pow(mass, 3.5);
}

function calculateRadius(mass: number): number {
    // Approximate Mass-Radius relation for main sequence stars, measured in solar radii which in miles is 432,288.6 and in km is 696,340 and in AU is 0.00465
    if (mass <= 1) return mass * Math.pow(mass, 0.8);
    else return mass * Math.pow(mass, 0.5);
}

function calculateTemperature(spectralType: StarVariants): number {
    // Simplified temperatures based on spectral type
    switch (spectralType) {
        case 'mainSequence': return randomInRange(2400, 3700); // M-type
        // Add cases for other spectral types if needed
        default: return 5778; // Sun's temperature as default
    }
}

function determineStarAge(mass: number): number {
    // Star lifespan decreases with mass
    const lifespan = (10e10) / Math.pow(mass, 2.5); // in years
    return randomInRange(1e6, lifespan);
}

////
//// PLANETS
////



function generatePlanetsForStar(star: StarType): PlanetType[] {
    const numPlanets = determineNumberOfPlanets(star);
    const planets: PlanetType[] = [];

    let currentDistance = star.gravitationalInfluence * 0.1; // Start close to the star

    for (let i = 0; i < numPlanets; i++) {
        const planet = generatePlanet(i, star, currentDistance);
        planets.push(planet);

        // Update distance for next planet based on the new planet's properties
        currentDistance = planet.distanceFromParent + calculateNextPlanetDistance(planet);
    }

    return planets;
}

function calculateNextPlanetDistance(planet: PlanetType): number {
    const baseDistance = 0.5; // Base distance increment in AU, can be adjusted as needed
    const sizeFactor = planet.radius * 0.01; // Increase distance based on planet's size
    const massFactor = planet.mass * 0.0001; // Increase distance based on planet's mass
    const variantFactor = determineVariantDistanceFactor(planet.variant);

    // Total distance increment is a combination of base distance and factors
    return baseDistance + sizeFactor + massFactor + variantFactor;
}

// Helper function to determine distance factor based on planet variant/type
function determineVariantDistanceFactor(variant: PlanetVariants): number {
    switch (variant) {
        case 'rocky':
            return 0.1; // Rocky planets tend to be closer together
        case 'earthLike':
            return 0.2; // Earth-like planets are spaced a bit farther
        case 'gasGiant':
            return 1.5; // Gas giants need more space
        case 'iceGiant':
            return 2; // Ice giants are typically farther out
        default:
            return 0.3; // Default for other planet types
    }
}


function determineNumberOfPlanets(star: StarType): number {
    // More massive stars might have more planets
    const baseNum = Math.floor(randomInRange(0, 5));
    return baseNum + Math.floor(star.mass);
}

function generatePlanet(id: number, star: StarType, previousPlanetDistance: number): PlanetType {
    const mass = generatePlanetMass();
    const variant = determinePlanetVariant(previousPlanetDistance, star);
    const distanceFromStar = calculateDistanceFromStar(id, star, previousPlanetDistance, mass, variant);
    const composition = generatePlanetComposition(variant);

    // Orbital and physical properties
    const name = `Planet ${id}`;
    const radius = calculatePlanetRadius(mass, variant);
    const distanceFromParent = distanceFromStar;
    const density = calculateDensity(mass, radius);
    const gravity = calculateSurfaceGravity(mass, radius);
    const escapeVelocity = calculateEscapeVelocity(mass, radius);
    const orbitalPeriod = calculateOrbitalPeriod(distanceFromStar, star.mass);
    const rotationPeriod = determinePlanetRotationPeriod(variant);
    const axialTilt = determineAxialTilt();
    const age = calculatePlanetAge(star.age);
    const orbitalSpeed = calculateOrbitalSpeed(distanceFromStar, star.mass);
    const gravitationalInfluence = calculateGravitationalInfluence(mass, 0);
    const angleFromParent = randomInRange(0, 360);
    const position = { x: 0, y: 0 }; // Placeholder
    const scatteredDisk = 0; // Typically for star-level properties, set to 0 for planets
    const scale = 1;
    const approachDistance = 0.1; // AU, for gameplay interaction

    // Generate moons based on variant
    const moons = generateMoonsForPlanet(variant, age);

    return {
        id,
        name,
        variant,
        mass,
        distanceFromParent,
        orbitalPeriod,
        moons,
        composition,
        density,
        gravity,
        escapeVelocity,
        rotationPeriod,
        axialTilt,
        age,
        orbitalSpeed,
        gravitationalInfluence,
        scatteredDisk, // Typically for star-level properties, set to 0 for planets
        scale,
        approachDistance, // AU, for gameplay interaction
        radius,
        angleFromParent,
        position,
    };
}

function determinePlanetRotationPeriod(variant: PlanetVariants): SolDays {
    return variant === 'rocky' ? randomInRange(20, 30) : randomInRange(10, 20);
}

function generatePlanetComposition(variant: PlanetVariants): PlanetComposition {
    // Simplified example composition based on planet type
    return {
        H: variant === 'gasGiant' ? randomInRange(70, 85) : randomInRange(0, 5),
        O: variant === 'earthLike' ? randomInRange(15, 20) : randomInRange(0, 5),
        Si: randomInRange(10, 25), // Silicate percentage
        // Add other elements as desired
    };
}

function generatePlanetMass(): number {
    // Random mass between Mars and Jupiter
    return randomInRange(0.1, 317.8); // Earth masses
}

function determinePlanetVariant(distance: number, star: StarType): PlanetVariants {
    const habitableZone = calculateHabitableZone(star);

    if (distance < habitableZone.inner) return 'rocky';
    else if (distance < habitableZone.outer) return 'earthLike';
    else return 'gasGiant';
}

function calculateDistanceFromStar(
    id: number,
    star: StarType,
    previousDistance: number,
    mass: number,
    variant: PlanetVariants
): number {
    const baseDistance = previousDistance || star.gravitationalInfluence * 0.01;

    // Distance increases based on variant type
    let distanceMultiplier: number;
    switch (variant) {
        case 'rocky':
            distanceMultiplier = 1.3; // Compact spacing for rocky planets
            break;
        case 'earthLike':
            distanceMultiplier = 1.5; // Slightly wider for habitable
            break;
        case 'gasGiant':
            distanceMultiplier = 2.5; // Wide orbits for gas giants
            break;
        case 'iceGiant':
            distanceMultiplier = 3; // Farthest for ice giants
            break;
        default:
            distanceMultiplier = 1.5;
    }

    // Factor in the planet's mass and size for additional spacing
    const massFactor = Math.sqrt(mass) * 0.05;

    // Calculate final distance from star
    return baseDistance + (distanceMultiplier + massFactor) * (id + 1);
}

function calculateHabitableZone(star: StarType): { inner: number; outer: number } {
    // Simplified habitable zone calculation
    const inner = Math.sqrt(star.luminosity / 1.1);
    const outer = Math.sqrt(star.luminosity / 0.53);
    return { inner, outer };
}

function calculateOrbitalPeriod(distance: number, starMass: number): number {
    // Kepler's Third Law: P^2 ∝ a^3 / M
    return Math.sqrt(Math.pow(distance, 3) / starMass);
}

function calculatePlanetAge(starAge: number): number {
    // Planets are typically close in age to their star but could be a bit younger
    const minPlanetAge = starAge * 0.5; // At least 50% of the star's age
    const maxPlanetAge = starAge * 0.95; // Max out at 95% of the star's age

    return randomInRange(minPlanetAge, maxPlanetAge);
}

function calculateOrbitalSpeed(distance: number, starMass: number): KM {
    return Math.sqrt((6.67430e-11 * starMass) / distance); // Simplified orbital speed
}


////
//// MOONS
////

function generateMoonsForPlanet(variant: PlanetVariants, planetAge: number): MoonType[] {
    const numMoons = variant === 'gasGiant' ? Math.floor(randomInRange(10, 80)) : Math.floor(randomInRange(0, 2));
    const moons: MoonType[] = [];

    for (let i = 0; i < numMoons; i++) {
        moons.push(generateMoon(i, planetAge));
    }

    return moons;
}

function generateMoon(id: number, planetAge: number): MoonType {
    return {
        id,
        name: `Moon ${id}`,
        variant: 'rocky', // Basic example variant for moons
        mass: randomInRange(0.0001, 0.01), // Earth masses
        distanceFromParent: randomInRange(0.001, 0.1), // AU
        orbitalPeriod: calculateOrbitalPeriod(randomInRange(0.001, 0.1), 0.0001), // Based on moon mass
        composition: {
            H2O: randomInRange(0, 10), // Example water composition
            Si: randomInRange(20, 40),
        },
        density: randomInRange(3, 5), // g/cm³, typical for rocky bodies
        gravity: randomInRange(0.1, 1.6), // m/s²
        escapeVelocity: randomInRange(1, 2), // km/s
        rotationPeriod: randomInRange(1, 27), // SolDays
        axialTilt: randomInRange(0, 10), // degrees
        age: calculatePlanetAge(planetAge),
        orbitalSpeed: randomInRange(0.1, 1), // km/s
        gravitationalInfluence: 0.001, // AU for a moon
        scatteredDisk: 0,
        scale: 0.1,
        approachDistance: 0.05,
        radius: randomInRange(0.001, 0.01), // AU
        angleFromParent: randomInRange(0, 360),
        position: { x: 0, y: 0 }, // Placeholder
    };
}

////
//// ASTEROIDS
////



function generateAsteroidBelt(): AsteroidBeltType {
    // Simplified example
    return {
        id: 0,
        name: 'Asteroid Belt',
        asteroids: [], // You can generate individual asteroids if needed
        numAsteroids: Math.floor(randomInRange(1000, 1000000)),
        // Inherit properties from StellarBodyType and StellarType
        mass: randomInRange(1e18, 1e21), // Total mass of the belt
        density: randomInRange(2, 5),    // g/cm^3
        gravity: 0,                      // Negligible for the belt as a whole
        escapeVelocity: 0,               // Not applicable
        rotationPeriod: 0,               // Not applicable
        axialTilt: determineAxialTilt(),
        age: randomInRange(1e6, 1e10),
        orbitalPeriod: randomInRange(3, 10), // AU
        orbitalSpeed: randomInRange(15, 25), // km/s
        gravitationalInfluence: 0, // Negligible
        scatteredDisk: 0,
        scale: 1,
        approachDistance: 0,
        radius: randomInRange(1, 3), // AU
        distanceFromParent: randomInRange(2, 4), // AU from the star
        angleFromParent: randomInRange(0, 360),
        position: { x: 0, y: 0 }, // Placeholder
    };
}


export function generateCompleteStarSystem(id: number): StarSystemType {
    const system = generateStarSystem(id);
    system.position = getAuCoordinates({ data: { system }, type: 'system' });

    system.stars.forEach(star => {
        // Generate planets for each star
        star.position = getAuCoordinates({ data: { system, star }, type: 'star' });
        const planets = generatePlanetsForStar(star);
        star.planets = planets;
        star.numPlanets = planets.length;

        planets.forEach(planet => {
            planet.position = getAuCoordinates({ data: { system, star, planet }, type: 'planet' });
            // Generate moons for each planet
            const moons = generateMoonsForPlanet(planet.variant, planet.age);
            planet.moons = moons;
            planet.moons.forEach(moon => {
                moon.position = getAuCoordinates({ data: { system, star, planet, moon }, type: 'moon' });
            });
        });

        star.numComets = 0;
    });

    return system;
}

export const generateGalaxy = (numSystems: number): StarSystemType[] => {
    const galaxy: StarSystemType[] = [];

    for (let i = 0; i < numSystems; i++) {
        galaxy.push(generateCompleteStarSystem(i));
    }

    return galaxy;
}

function randomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

function calculateSystemOrbitalPeriod(): SolDays {
    // Example orbital period around the galactic center
    return 200_000_000; // ~200 million years for a Sun-like star system
}

function calculateSystemOrbitalSpeed(): KM {
    return 220 * 1_000; // Typical speed around galactic center in km/s
}

function calculateSystemGravitationalInfluence(stars: StarType[]): AU {
    // Based on the mass of all stars combined
    const totalMass = stars.reduce((sum, star) => sum + star.mass, 0);
    return totalMass * 100; // Example scaling
}

function calculateSystemScatteredDisk(stars: StarType[]): AU {
    const influence = calculateSystemGravitationalInfluence(stars);
    return influence * 1.5; // Example for scattered disk distance
}

function calculateSystemDistanceFromGalacticCenter(): AU {
    // Example: distance in AU from galactic center (customize as needed)
    return randomInRange(0, 100); // within the galaxy's habitable zone
}

function calculatePlanetRadius(mass: number, variant: PlanetVariants): number {
    return variant === 'gasGiant' ? mass * 0.1 : mass * 0.05; // Simplified scaling
}


