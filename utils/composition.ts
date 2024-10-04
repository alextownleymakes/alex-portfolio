export interface ElementComposition {
    H?: number;  // Hydrogen
    He?: number; // Helium
    Li?: number; // Lithium
    Be?: number; // Beryllium
    B?: number;  // Boron
    C?: number;  // Carbon
    N?: number;  // Nitrogen
    O?: number;  // Oxygen
    F?: number;  // Fluorine
    Ne?: number; // Neon
    // Add other elements as needed, up to the entire periodic table
    Fe?: number; // Iron
    Au?: number; // Gold
    U?: number;  // Uranium
    Pb?: number; // Lead
    Pt?: number; // Platinum
    Si?: number; // Silicon
    Al?: number; // Aluminium
    Ti?: number; // Titanium
    Mg?: number; // Magnesium
    SiO2?: number; // Silica
    Ca?: number; // Calcium
    FeO?: number; // Iron oxide
    Al2O3?: number; // Aluminium oxide
    CH4?: number; // Methane
    H2O?: number; // Water
    CO?: number; // Carbon monoxide
    // Add other metals and elements critical for certain functions in-game
}

export interface StarComposition extends ElementComposition {
    hydrogen?: number;        // Core hydrogen for fusion
    helium?: number;          // Core helium post-fusion
    solarMass?: number;       // Mass of the star (relative to the sun)
    energyOutput?: number;    // Energy output, useful for harvesting energy or building new stars
    solarWind?: number;       // Solar wind intensity (important for certain resources)

    // Resources for star harvesting
    plasma?: number;          // Plasma content for special fusion-related tasks
    magneticFieldStrength?: number; // For gravitational manipulation or energy extraction
}

export interface PlanetComposition extends ElementComposition {
    diamonds?: number;
    rubies?: number;
    methane?: number;
    water?: number;
    graphite?: number;
    sulfur?: number;
    silicon?: number;
    thorium?: number;
    alienArtifacts?: number;
    Al?: number;             // Aluminum

    // Atmosphere-specific resources for terraforming or harvesting
    ozone?: number;         // Ozone layer content
    oxygen?: number;        // Oxygen percentage
    nitrogen?: number;      // Nitrogen percentage
    CO2?: number;           // Carbon dioxide percentage
    S02?: number;           // Sulfur dioxide percentage
    pressure?: number;      // Atmospheric pressure (for terraforming viability)
    temperature?: number;   // Planet's surface temperature
    clouds?: number;        // Amount of clouds, for weather dynamics
}

export interface MoonComposition extends ElementComposition {
    methane?: number;
    helium3?: number;  // Useful for futuristic energy resources
    ice?: number;      // Ice deposits
    volcanicAsh?: number;
    rareCrystals?: number;  // Special resource
    // More moon-specific resources
  }

export interface AsteroidComposition extends ElementComposition {
  iridium?: number;
  platinum?: number;
  gold?: number;
  nickel?: number;
  cobalt?: number;
  titanium?: number;
  carbonaceousMaterial?: number;
}
  
export interface CometComposition extends ElementComposition {
    waterIce?: number;
    ammonia?: number;
    methane?: number;
    organicCompounds?: number;  // Primitive building blocks of life
  }
  