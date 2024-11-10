// a custom hook that returns new positions of an object relative to the player position, considering the zoom level

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Coords, setOrbit, zoomIn, zoomOut } from "@/state/gameStateSlice";
import { approachDistances, recedeDistances } from "@/utils/functions/zoom";
import { distanceTo } from "@/utils/functions/calculations";
import { OrbitTypes } from "@/state/gameStateSlice";

export interface UseApproachProps {
    ref: React.RefObject<HTMLElement>;
    coords: Coords;
    scale: number;
    mm?: boolean;
    name: string;
    type: OrbitTypes;
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
    mm = false,
    name,
    type
}: UseApproachProps):
    UseApproachReturn => {

    const dispatch = useDispatch();
    const playerPosition = useSelector((state: RootState) => state.gameState.position);
    const zoom = useSelector((state: RootState) => state.gameState.zoom);
    const approachDistance = approachDistances[scale as keyof typeof approachDistances];
    const recedeDistance = recedeDistances[scale as keyof typeof recedeDistances];

    const [distance, setDistance] = useState(0);
    const [zoomed, setZoomed] = useState(0);
    const [systemCenter, setSystemCenter] = useState({
        x: ref.current ? coords.x : 0,
        y: ref.current ? coords.y : 0,
    });

    useEffect(() => {

        const values = {
            px: Number(playerPosition.x),
            py: playerPosition.y,
            cx: coords.x,
            cy: coords.y,
        }

        setDistance(distanceTo(values));

    }, [playerPosition, coords]);

    useEffect(() => {
        setSystemCenter({
            x: ref.current ? coords.x : 0,
            y: ref.current ? coords.y : 0,
        });

    }, [ref.current]);

    const distanceToPlayer = () => distanceTo({
        px: Number(playerPosition.x),
        py: playerPosition.y,
        cx: coords.x,
        cy: coords.y,
    });

    useEffect(() => {
        if (!mm && distance !== 0) {
            if (distance < (100 / (zoomed+1)) && zoomed < 2 
            ) {
                setZoomed(zoomed+1);
                zoom === 0 && type && name && dispatch(setOrbit({type, name}));
                dispatch(zoomIn());
            } else if (distance > 300 && zoomed > 0) {
                setZoomed(zoomed-1);
                zoom === 1 && type && dispatch(setOrbit({type, name: ''}));
                dispatch(zoomOut());
            }
        }
    }, [distance]);
    return { approachDistance, distanceToPlayer, systemCenter, activeSystem: zoomed > 0};

};

export default useApproach;
