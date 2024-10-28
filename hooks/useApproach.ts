// a custom hook that returns new positions of an object relative to the player position, considering the zoom level

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Coords, setOrbit, zoomIn, zoomOut } from "@/state/gameStateSlice";
import { ratios, scaleDistances } from "@/utils/functions/zoom";
import { StellarBodyType } from "@/utils/types/stellarBodies";

export interface UseApproachProps {
    ref: React.RefObject<HTMLElement>;
    coords: Coords;
    scale: number;
    miniMap?: boolean;
    name?: string;
    type?: StellarBodyType;
}

export interface UseApproachReturn {
    approachDistance: number;
    distanceToPlayer: () => number;
    systemCenter: Coords;
    activeSystem: boolean;
}

const useApproach = ({
    ref,
    coords,
    scale,
    miniMap = false,
    name,
    type
}: UseApproachProps):
    UseApproachReturn => {

    const dispatch = useDispatch();
    const playerPosition = useSelector((state: RootState) => state.gameState.zoomedPosition);
    const zoom = useSelector((state: RootState) => state.gameState.zoom);
    const approachDistance = scaleDistances[scale];


    const [systemCenter, setSystemCenter] = useState({
        x: ref.current ? coords.x : 0,
        y: ref.current ? coords.y : 0,
    });


    useEffect(() => {
        setSystemCenter({
            x: ref.current ? coords.x : 0,
            y: ref.current ? coords.y : 0,
        });

    }, [ref.current]);

    const [zoomed, setZoomed] = useState(false);

    const distanceToPlayer = () => {
        return Math.sqrt(Math.pow(playerPosition.x - coords.x, 2) + Math.pow(playerPosition.y - coords.y, 2));
    }

    useEffect(() => {
        if (!miniMap) {
            if ((systemCenter.x !== 0 && systemCenter.y !== 0) && distanceToPlayer() < (approachDistance * ratios[zoom]) && !zoomed && zoom === scale - 1) {
                setZoomed(true);
                dispatch(setOrbit({type, name}));
                dispatch(zoomIn({ scale }));
            } else if ((systemCenter.x !== 0 && systemCenter.y !== 0) && distanceToPlayer() > ((approachDistance * ratios[zoom]) * 2) && zoomed && zoom === scale) {
                setZoomed(false);
                dispatch(setOrbit({type: undefined, name: undefined}));
                dispatch(zoomOut({ scale: scale - 1 }));
            }
        }
    }, [distanceToPlayer()]);
    return { approachDistance, distanceToPlayer, systemCenter, activeSystem: zoomed };

};

export default useApproach;
