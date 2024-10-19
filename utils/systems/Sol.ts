// Import the necessary types/interfaces you've already defined
import { Star, Planet, Moon, Asteroid, AsteroidBelt, StarSystem, StarPhase, } from '../types/stellarBodies';
// Define the star (Sol)


// Define planets in the Sol system
export const mercury: Planet = {
  id: 2,
  name: 'Mercury',
  mass: 3.3011e23, // kg
  radius: 5, // km
  distanceFromStar: 0.39, // AU
  orbitalPeriod: 88, // Earth days
  color: 'Gray',
  moons: [],
  chemicalComposition: {
    Fe: 0.7,
    O: 0.2,
    silicon: 0.1,
  },
  position: { x: 59, y: 38 }, // Relative coordinates
};

export const venus: Planet = {
  id: 3,
  name: 'Venus',
  mass: 4.8675e24, // kg
  radius: 6, // km
  distanceFromStar: 0.72, // AU
  orbitalPeriod: 225, // Earth days
  chemicalComposition: {
    CO2: 0.96,
    N: 0.03,
    S02: 0.001,
    Fe: 0.03,
  },
  color: 'Yellow',
  position: { x: 60, y: -50 },
};


// Major moons of Earth
export const moon: Moon = {
  id: 5,
  name: 'Moon',
  mass: 7.342e22, // kg
  radius: 6, // km
  distanceFromPlanet: 0.00257, // AU
  orbitalPeriod: 27.3, // Earth days
  chemicalComposition: {
    O: 0.42,
    Si: 0.21,
    Mg: 0.19,
    Fe: 0.1,
  },
  position: { x: -30, y: -25 }, // Relative to Earth
};

export const earth: Planet = {
  id: 4,
  name: 'Earth',
  mass: 5.97237e24, // kg
  radius: 10, // km
  distanceFromStar: 1, // AU
  orbitalPeriod: 365.25, // Earth days
  chemicalComposition: {
    O: 0.46,
    silicon: 0.28,
    Al: 0.08,
    Fe: 0.06,
  },
  color: 'Blue',
  position: { x: -60, y: -80 },
  moons: [moon],
};


export const mars: Planet = {
  id: 6,
  name: 'Mars',
  mass: 6.4171e23, // kg
  radius: 9, // km
  distanceFromStar: 1.52, // AU
  orbitalPeriod: 687, // Earth days
  chemicalComposition: {
    SiO2: 0.45,
    FeO: 0.18,
    Al2O3: 0.06,
  },
  position: { x: -52, y: 95 },
};

// Moons of Mars
export const phobos: Moon = {
  id: 7,
  name: 'Phobos',
  mass: 1.0659e16, // kg
  radius: 4, // km
  distanceFromPlanet: 0.00032, // AU
  orbitalPeriod: 0.319, // Earth days
  chemicalComposition: {
    C: 0.4,
    Si: 0.3,
    O: 0.1,
  },
  position: { x: 50, y: 50 }, // Relative to Mars
};

export const deimos: Moon = {
  id: 8,
  name: 'Deimos',
  mass: 1.4762e15, // kg
  radius: 5, // km
  distanceFromPlanet: 0.00049, // AU
  orbitalPeriod: 1.26, // Earth days
  chemicalComposition: {
    C: 0.4,
    Si: 0.2,
  },
  position: { x: -32, y: 180 }, // Relative to Mars
};

// Define the rest of the planets
export const jupiter: Planet = {
  id: 9,
  name: 'Jupiter',
  mass: 1.8982e27, // kg
  radius: 20, // km
  distanceFromStar: 5.2, // AU
  orbitalPeriod: 4332.59, // Earth days
  chemicalComposition: {
    H: 0.9,
    He: 0.1,
    CH4: 0.002,
  },
  position: { x: -442, y: 140 },
};

export const saturn: Planet = {
  id: 10,
  name: 'Saturn',
  mass: 5.6834e26, // kg
  radius: 22, // km
  distanceFromStar: 9.58, // AU
  orbitalPeriod: 10759.22, // Earth days
  chemicalComposition: {
    H: 0.96,
    He: 0.03,
    CH4: 0.001,
  },
  position: { x: 600, y: -350 },
};

export const uranus: Planet = {
  id: 11,
  name: 'Uranus',
  mass: 8.6810e25, // kg
  radius: 19, // km
  distanceFromStar: 19.22, // AU
  orbitalPeriod: 30688.5, // Earth days
  chemicalComposition: {
    H2O: 0.2,
    H: 0.83,
    He: 0.15,
  },
  position: { x: 1200, y: 500 },
};

export const neptune: Planet = {
  id: 12,
  name: 'Neptune',
  mass: 1.02413e26, // kg
  radius: 18, // km
  distanceFromStar: 30.05, // AU
  orbitalPeriod: 60182, // Earth days
  chemicalComposition: {
    H: 0.8,
    He: 0.19,
    CH4: 0.01,
  },
  position: { x: 1300, y: 500 },
};

// Pluto as a dwarf planet
export const pluto: Planet = {
  id: 13,
  name: 'Pluto',
  mass: 1.309e22, // kg
  radius: 4, // km
  distanceFromStar: 39.48, // AU
  orbitalPeriod: 90560, // Earth days
  chemicalComposition: {
    N: 0.98,
    CH4: 0.01,
    CO: 0.01,
  },
  position: { x: 1400, y: 500 },
};

export const solStar: Star = {
  id: 1,
  name: 'Sol',
  mass: 1.989e30, // kg
  chemicalComposition: {
    H: 0.74,
    He: 0.24,
    O: 0.01,
    Fe: 0.0006,
  },
  phase: StarPhase.MainSequence,
  density: 1.41, // g/cm³
  luminosity: 3.828e26, // Watts
  color: 'Yellow',
  temperature: 5778, // Kelvin
  age: 4.6e9, // 4.6 billion years
  radius: 50, // km
  position: { x: 0, y: 0 }, // Center of the solar system
  planets: [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto],
};

// Export the entire Sol system
export const solSystem: StarSystem = {
  stars: [solStar],
  planets: [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto],
  id: 1,
  name: 'Sol',
  asteroidBelts: [],
  comets: [],
  position: { x: 500, y: 500 }, 
};
