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
    0: 1/1,
    1: 2/1,
    2: 4/1,
    3: 8/1,
    4: 16/1,
    5: 32/1,
    6: 64/1,
    7: 128/1,
    8: 256/2,
    9: 562/1,
}

export const scales: { [key: string]: number } = {
    Galaxy: 0,
    StarSystem: 1,
    Star: 2,
    Planet: 3,
    Moon: 4,
    Asteroid: 5,
}

export const scaleDistances: { [key: string]: number } = {
    0: 802,
    1: 401,
    2: 200,
    3: 50,
    4: 25,
    5: 10,
}

export type ScalesType = typeof scales;



export const zoom = (scale: number, x: number, y: number) => {
    const ratio = bodyRatios[scale];
    return {
        x: x * ratio,
        y: y * ratio,
    };
}

export const getGraphCenter = (width: number, height: number) => ({
    x: width / 2,
    y: height / 2,
});

export const translatePoint = (centerX: number, centerY: number, pointX: number, pointY: number, scale: number) => ({
    left: `${centerX + pointX * scale}px`,
    top: `${centerY - pointY * scale}px`,
});