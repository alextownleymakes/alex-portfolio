export const bodyRatios: { [key: string]: number } = {
    1: 432287/1,
    2: 432287/10,
    3: 432287/50,
    4: 432287/100,
    5: 432287/500,
    6: 432287/1000,
    7: 432287/5000,
    8: 432287/10000,
    9: 432287/50000,
    10: 432287/100000,
}

export const ratios: { [key: string]: number } = {
    0: 1,
    1: 2,
    2: 4,
    3: 16,
    4: 32,
    5: 128,
}

export const scales: { [key: string]: number } = {
    galaxy: 0,
    starSystem: 1,
    star: 2,
    planet: 3,
    moon: 4,
    asteroid: 5,
}

export const scaleDistances: { [key: string]: number } = {
    0: 800,
    1: 300,
    2: 200,
    3: 50,
    4: 10,
    5: 2,
}

export type ScalesType = typeof scales;


//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////


export interface ScaleType {
    [key: number]: number;
}

export const scale: ScaleType = {
    0: 1/100,
    1: 5,
    2: 10,
    3: 50,
    4: 500,
    5: 50000,
    6: 500000
}
export interface ZoomType {
    [key: number]: number;
}

export const zoom: ZoomType = {
    0: scale[0],
    1: scale[1],
    2: scale[2],
    3: scale[3],
    4: scale[4],
    5: scale[5],
    6: scale[6]
}

// a star system is around 100AU radius
// a solar system is around 30AU radius

export const approachDistances = {
    0: 100, //100px = 1000AU, galaxy
    1: 100, //250px = 100AU, star system
    2: 200, //500px = 100AU, star 1
    3: 50,
    4: 10,
    5: 2
}

export const recedeDistances = {
    0: 707,
    1: 300,
    2: 200,
    3: 50,
    4: 10,
    5: 2
}