export const calculateDistance = (pos1: { x: number; y: number }, pos2: { x: number; y: number }): number => {
    return Math.sqrt((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2);
};
