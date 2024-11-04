// Import the necessary types/interfaces you've already defined
import { Star, Planet, Moon, Asteroid, AsteroidBelt, StarSystem, StarVariants, PlanetVariants, StellarBodies } from '../types/stellarBodies';
import { orbits } from "@/state/gameStateSlice";

// Define moons for Planet B1
export const moonB1A: Moon = {
  id: 20,
  name: 'Moon B1A',
  mass: 7.342e22, // kg
  radius: 4, // km
  distanceFromPlanet: 0.002, // AU
  angleFromPlanet: 45, // Degrees
  orbitalPeriod: 27, // Earth days
  chemicalComposition: {
    O: 0.42,
    Si: 0.21,
    Mg: 0.19,
    Fe: 0.1,
  },
  type: orbits.moon
};

// Define planets for Star A (Alpha)
export const planetA1: Planet = {
  id: 16,
  name: 'Planet A1',
  mass: 3.0e24, // kg
  radius: 12, // km
  distanceFromStar: 1, // AU
  angleFromStar: 30, // Degrees
  orbitalPeriod: 365, // Earth days
  color: 'Blue',
  moons: [],
  chemicalComposition: {
    O: 0.45,
    silicon: 0.3,
    Fe: 0.2,
  },
  variant: PlanetVariants.terrestrial,
  type: orbits.planet,
};

export const planetA2: Planet = {
  id: 17,
  name: 'Planet A2',
  mass: 5.0e24, // kg
  radius: 15, // km
  distanceFromStar: 1.5, // AU
  angleFromStar: 60, // Degrees
  orbitalPeriod: 540, // Earth days
  color: 'Green',
  moons: [],
  chemicalComposition: {
    O: 0.48,
    silicon: 0.25,
    Fe: 0.15,
  },
  variant: PlanetVariants.terrestrial,
  type: orbits.planet,
};

// Define planets for Star B (Beta)
export const planetB1: Planet = {
  id: 18,
  name: 'Planet B1',
  mass: 4.0e24, // kg
  radius: 12, // km
  distanceFromStar: 1.2, // AU
  angleFromStar: 15, // Degrees
  orbitalPeriod: 420, // Earth days
  color: 'Red',
  moons: [moonB1A],
  chemicalComposition: {
    O: 0.40,
    Fe: 0.3,
    Mg: 0.15,
  },
  variant: PlanetVariants.terrestrial,
  type: orbits.planet,
};

export const planetB2: Planet = {
  id: 19,
  name: 'Planet B2',
  mass: 6.0e24, // kg
  radius: 30, // km
  distanceFromStar: 2.0, // AU
  angleFromStar: 90, // Degrees
  orbitalPeriod: 600, // Earth days
  color: 'Yellow',
  moons: [],
  chemicalComposition: {
    O: 0.5,
    Fe: 0.25,
    silicon: 0.2,
  },
  variant: PlanetVariants.terrestrial,
  type: orbits.planet,
};

// Define the binary stars (orbiting around the barycenter at {0, 0})
export const novaAlpha: Star = {
  id: 14,
  name: 'Nova Alpha',
  mass: 2.0e30, // kg
  distanceFromCenter: 4.0, 
  angleFromCenter: 45, // Degrees
  orbitalPeriod: 11.9, // Earth days
  chemicalComposition: {
    H: 0.73,
    He: 0.25,
    O: 0.015,
    Fe: 0.001,
  },
  planets: [
    planetA1,
    planetA2,
  ],
  variant: StarVariants.mainSequence,
  type: orbits.star,
  density: 1.45, // g/cm³
  luminosity: 3.95e26, // Watts
  color: 'Blue',
  temperature: 5800, // Kelvin
  age: 5e9, // 5 billion years
  radius: 55, // km (scaled for game purposes)
};

export const novaBeta: Star = {
  id: 15,
  name: 'Nova Beta',
  mass: 1.5e30, // kg
  distanceFromCenter: 2.2, 
  angleFromCenter: 135, // Degrees
  orbitalPeriod: 11.9, // Earth days
  chemicalComposition: {
    H: 0.72,
    He: 0.26,
    O: 0.012,
    Fe: 0.001,
  },
  planets: [
    planetB1,
    planetB2,
  ],
  variant: StarVariants.mainSequence,
  type: orbits.star,
  density: 1.38, // g/cm³
  luminosity: 2.85e26, // Watts
  color: 'White',
  temperature: 5500, // Kelvin
  age: 4.5e9, // 4.5 billion years
  radius: 45, // km (scaled for game purposes)
};

// Export the entire Binary Star System
export const nova: StarSystem = {
  stars: [novaAlpha, novaBeta],
  planets: [planetA1, planetA2, planetB1, planetB2],
  id: 2,
  name: 'Nova',
  asteroidBelts: [],
  comets: [],
  position: { x: -300, y: -880 }, // Position of the binary system in the galaxy
};
