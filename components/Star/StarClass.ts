// StarClass.ts

export enum StarPhase {
    MainSequence,
    RedGiant,
    BlueGiant,
    WhiteDwarf,
    NeutronStar,
    Supernova,
}

export interface Star {
    id: number;
    name: string;
    mass: number;
    chemicalComposition: { H: number; He: number; metals: number };
    phase: StarPhase;
    density: number;
    luminosity: number;
    color: string;
    temperature: number;
    age: number;
    radius: number;
    position: { x: number; y: number };
}