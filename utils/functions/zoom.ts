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

export const scales: { [key: string]: number } = {
    galaxy: 1,
    starSystem: 4,
    star: 7,
    planet: 10,
    moon: 13,
    asteroidBelt: 10,
    asteroid: 13,
    comet: 10,
}



//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////


export interface ScaleType {
    [key: number]: number;
}

// export const scale: ScaleType = {
//     0: 1/100,
//     1: 5,
//     2: 10,
//     3: 50,
//     4: 500,
//     5: 50000,
//     6: 500000
// }

export const scale = (z: number) => {
    return Math.pow(10, z);
}

export interface ZoomType {
    [key: number]: number;
}

// a star system is around 100AU radius
// a solar system is around 30AU radius

export const approachDistances = {
    0: 10, //100px = 1000AU, galaxy
    1: 10, //250px = 100AU, star system
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