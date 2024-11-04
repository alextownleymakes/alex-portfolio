import { StarComposition, PlanetComposition, MoonComposition, AsteroidComposition, CometComposition } from "../composition";
import { OrbitTypes } from "@/state/gameStateSlice";

export type StellarBodyType = 'star' | 'planet' | 'moon' | 'asteroid' | 'asteroidBelt' | 'comet' | 'starSystem';
export type PlanetVariantType = 'rocky' | 'terrestrial' | 'gas' | 'gasGiant' | 'dwarfGas' | 'iceGiant' | 'dwarf' | 'exoplanet' | 'earthLike' | 'superEarth';
export type StarVariantType = 'mainSequence' | 'redGiant' | 'whiteDwarf' | 'supernova' | 'blackHole' | 'neutronStar' | 'pulsar' | 'quarkStar';
export type StellarBodiesObject = { [key in StellarBodyType]: StellarBodyType; };
export type StarVariantTypeObject = { [key in StarVariantType]: StarVariantType; };
export type PlanetVariantTypeObject = { [key in PlanetVariantType]: PlanetVariantType; };

export const StellarBodies: StellarBodiesObject = {
  star: 'star',
  planet: 'planet',
  moon: 'moon',
  asteroid: 'asteroid',
  asteroidBelt: 'asteroidBelt',
  comet: 'comet',
  starSystem: 'starSystem',
};

export const PlanetVariants: PlanetVariantTypeObject = {
  rocky: 'rocky',
  terrestrial: 'terrestrial',
  gas: 'gas',
  dwarfGas: 'dwarfGas',
  gasGiant: 'gasGiant',
  iceGiant: 'iceGiant',
  dwarf: 'dwarf',
  exoplanet: 'exoplanet',
  earthLike: 'earthLike',
  superEarth: 'superEarth',
};

export const StarVariants: StarVariantTypeObject = {
  mainSequence: 'mainSequence',
  redGiant: 'redGiant',
  whiteDwarf: 'whiteDwarf',
  supernova: 'supernova',
  blackHole: 'blackHole',
  neutronStar: 'neutronStar',
  pulsar: 'pulsar',
  quarkStar: 'quarkStar',
};
// Star interface
export interface Star {
  id: number;
  name: string;
  mass: number;
  chemicalComposition: StarComposition;
  distanceFromCenter: number; // Distance from the center of the galaxy
  angleFromCenter: number; // Angle from the center in degrees
  orbitalPeriod: number; // Orbital period in Earth days
  type: OrbitTypes;
  variant: StarVariantType;
  density: number;
  luminosity: number;
  color: string;
  temperature: number;
  age: number;
  radius: number;
  position: { x: number; y: number }; // StarSystem coordinates
  planets: Planet[]; // Array of planets orbiting the star
}

// Planet interface
export interface Planet {
  id: number;
  name: string;
  mass: number;
  radius: number;
  type: OrbitTypes;
  variant: PlanetVariantType;
  chemicalComposition: PlanetComposition;
  distanceFromStar: number; // Distance from its star in AU or km
  angleFromStar: number; // Angle from the star in degrees
  orbitalPeriod: number; // Orbital period in Earth days
  color?: string;
  position: { x: number; y: number }; // Solar system coordinates
  moons?: Moon[]; // Array of moons
}

// Moon interface
export interface Moon {
  id: number;
  name: string;
  mass: number;
  radius: number;
  type: OrbitTypes;
  chemicalComposition: MoonComposition; // Moons can have their own composition
  distanceFromPlanet: number; // Distance from its planet
  angleFromPlanet: number; // Angle from the planet in degrees
  orbitalPeriod: number; // Orbital period around the planet
  color?: string;
  position: { x: number; y: number }; // Position relative to the planet
}

// Asteroid interface
export interface Asteroid {
  id: number;
  name: string;
  size: number;
  chemicalComposition: AsteroidComposition; // Asteroids will use elemental composition
  position: { x: number; y: number }; // Position in the asteroid belt
}

// AsteroidBelt interface
export interface AsteroidBelt {
  id: number;
  name: string;
  asteroids: Asteroid[]; // Array of asteroids within the belt
  position: { x: number; y: number }; // Belt's central position
}

// Comet interface
export interface Comet {
  id: number;
  name: string;
  size: number;
  chemicalComposition: CometComposition; // Comets use elemental composition
  tailLength: number; // Length of the comet's tail
  position: { x: number; y: number }; // Position in the solar system
}

// StarSystem interface
export interface StarSystem {
  id: number;
  name: string;
  stars: Star[]; // Array of stars in the star system
  planets: Planet[]; // Array of planets orbiting the stars
  asteroidBelts: AsteroidBelt[]; // Array of asteroid belts in the system
  comets: Comet[]; // Array of comets in the system
  position: { x: number; y: number }; // Position of the star system in the galaxy
}

