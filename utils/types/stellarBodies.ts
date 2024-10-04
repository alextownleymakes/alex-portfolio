import { StarComposition, PlanetComposition, MoonComposition, AsteroidComposition, CometComposition } from "../composition";

// StarPhase Enum
export enum StarPhase {
    MainSequence = 'MainSequence',
    RedGiant = 'RedGiant',
    WhiteDwarf = 'WhiteDwarf',
    NeutronStar = 'NeutronStar',
    BlackHole = 'BlackHole',
    Supernova = 'Supernova',
  }
  
  // Star interface
  export interface Star {
    id: number;
    name: string;
    mass: number;
    chemicalComposition: StarComposition;
    phase: StarPhase;
    density: number;
    luminosity: number;
    color: string;
    temperature: number;
    age: number;
    radius: number;
    position: { x: number; y: number }; // StarSystem coordinates
  }
  
  // Planet interface
  export interface Planet {
    id: number;
    name: string;
    mass: number;
    radius: number;
    chemicalComposition: PlanetComposition;
    distanceFromStar: number; // Distance from its star in AU or km
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
    chemicalComposition: MoonComposition; // Moons can have their own composition
    distanceFromPlanet: number; // Distance from its planet
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
  
  