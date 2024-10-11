// Import the necessary types/interfaces you've already defined
import { Star, Planet, Moon, Asteroid, AsteroidBelt, StarSystem, StarPhase } from '../types/stellarBodies';

// Define the binary stars (orbiting around the barycenter at {0, 0})
export const starA: Star = {
  id: 14,
  name: 'Nova Alpha',
  mass: 2.0e30, // kg
  chemicalComposition: {
    H: 0.73,
    He: 0.25,
    O: 0.015,
    Fe: 0.001,
  },
  phase: StarPhase.MainSequence,
  density: 1.45, // g/cm³
  luminosity: 3.95e26, // Watts
  color: 'Blue',
  temperature: 5800, // Kelvin
  age: 5e9, // 5 billion years
  radius: 55, // km (scaled for game purposes)
  position: { x: -150, y: 75 }, // Position relative to the barycenter
};

export const starB: Star = {
  id: 15,
  name: 'Nova Beta',
  mass: 1.5e30, // kg
  chemicalComposition: {
    H: 0.72,
    He: 0.26,
    O: 0.012,
    Fe: 0.001,
  },
  phase: StarPhase.MainSequence,
  density: 1.38, // g/cm³
  luminosity: 2.85e26, // Watts
  color: 'White',
  temperature: 5500, // Kelvin
  age: 4.5e9, // 4.5 billion years
  radius: 45, // km (scaled for game purposes)
  position: { x: 100, y: -50 }, // Position relative to the barycenter
};

// Define planets for Star A (Alpha)
export const planetA1: Planet = {
  id: 16,
  name: 'Planet A1',
  mass: 3.0e24, // kg
  radius: 6000, // km
  distanceFromStar: 1, // AU
  orbitalPeriod: 365, // Earth days
  color: 'Blue',
  moons: [],
  chemicalComposition: {
    O: 0.45,
    silicon: 0.3,
    Fe: 0.2,
  },
  position: { x: -1200, y: 200 }, // Relative to Star A
};

export const planetA2: Planet = {
  id: 17,
  name: 'Planet A2',
  mass: 5.0e24, // kg
  radius: 7000, // km
  distanceFromStar: 1.5, // AU
  orbitalPeriod: 540, // Earth days
  color: 'Green',
  moons: [],
  chemicalComposition: {
    O: 0.48,
    silicon: 0.25,
    Fe: 0.15,
  },
  position: { x: -1400, y: 300 }, // Relative to Star A
};

// Define planets for Star B (Beta)
export const planetB1: Planet = {
  id: 18,
  name: 'Planet B1',
  mass: 4.0e24, // kg
  radius: 5500, // km
  distanceFromStar: 1.2, // AU
  orbitalPeriod: 420, // Earth days
  color: 'Red',
  moons: [],
  chemicalComposition: {
    O: 0.40,
    Fe: 0.3,
    Mg: 0.15,
  },
  position: { x: 1300, y: -150 }, // Relative to Star B
};

export const planetB2: Planet = {
  id: 19,
  name: 'Planet B2',
  mass: 6.0e24, // kg
  radius: 8000, // km
  distanceFromStar: 2.0, // AU
  orbitalPeriod: 600, // Earth days
  color: 'Yellow',
  moons: [],
  chemicalComposition: {
    O: 0.5,
    Fe: 0.25,
    silicon: 0.2,
  },
  position: { x: 1600, y: -250 }, // Relative to Star B
};

// Define moons for Planet B1
export const moonB1A: Moon = {
  id: 20,
  name: 'Moon B1A',
  mass: 7.342e22, // kg
  radius: 1737.1, // km
  distanceFromPlanet: 0.002, // AU
  orbitalPeriod: 27, // Earth days
  chemicalComposition: {
    O: 0.42,
    Si: 0.21,
    Mg: 0.19,
    Fe: 0.1,
  },
  position: { x: 1350, y: -175 }, // Relative to Planet B1
};

// Export the entire Binary Star System
export const nova: StarSystem = {
  stars: [starA, starB],
  planets: [planetA1, planetA2, planetB1, planetB2],
  id: 2,
  name: 'Nova',
  asteroidBelts: [],
  comets: [],
  position: { x: 1000, y: 1000 }, // Position of the binary system in the galaxy
};
