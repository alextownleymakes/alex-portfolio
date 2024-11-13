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
    approach: number;
    recede: number;
}

export interface UseApproachReturn {
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
    type,
    approach,
    recede,
}: UseApproachProps):
    UseApproachReturn => {

    const dispatch = useDispatch();
    const playerPosition = useSelector((state: RootState) => state.gameState.position);
    const zoom = useSelector((state: RootState) => state.gameState.zoom);

    const [distance, setDistance] = useState(0);
    const [zoomed, setZoomed] = useState(true);
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

    const evalZoomed = () => {
        if (zoom > scale + 1) setZoomed(true);
        if (zoom > scale - 1) setZoomed(false);
    }

    useEffect(() => {
        if (!mm) {
            console.log('distance', distance);
            if (
                   (systemCenter.x !== 0 && systemCenter.y !== 0) 
                && (distance < approach) 
                && !zoomed 
                && (zoom >= scale - 1 && zoom <= scale + 1)
            ) {
                evalZoomed();
                const payload = setOrbit({type, name});
                dispatch(payload);
                dispatch(zoomIn());
            } else if (
                   (systemCenter.x !== 0 && systemCenter.y !== 0) 
                && (distance > recede)
                && (zoomed && zoom === scale)
            ) {
                evalZoomed();
                const payload = setOrbit({type, name: ''});
                dispatch(payload);
                dispatch(zoomOut());
            }
        }
    }, [distance]);
    return {distanceToPlayer, systemCenter, activeSystem: (zoom >= scale - 1 && zoom <= scale + 1)};

};

export default useApproach;
