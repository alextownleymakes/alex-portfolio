// a custom hook that returns new positions of an object relative to the player position, considering the zoom level

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Coords, zoomIn, zoomOut } from "@/state/gameStateSlice";
import { baseSize } from "@/components/Galaxy/Galaxy";
import { ratios, scaleDistances } from "@/utils/functions/zoom";

const useApproach = (ref: React.RefObject<HTMLElement>, coords: Coords, scale: number): { approachDistance: number, distanceToPlayer: () => number, systemCenter: { x: number, y: number }, activeSystem: boolean } => {

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

        console.log(ref.current?.id, 'System center', systemCenter, coords, 'approach distance', approachDistance * ratios[zoom], 'zoom', zoom);
    }, [ref.current]);

    useEffect(() => {
        console.log(ref.current?.id, 'System center', systemCenter, coords, 'approach distance', approachDistance * ratios[zoom], 'zoom', zoom, 'scale', scale);
    }, [zoom]);

    

    const [zoomed, setZoomed] = useState(false);

    const distanceToPlayer = () => {
        return Math.sqrt(Math.pow(playerPosition.x - coords.x, 2) + Math.pow(playerPosition.y - coords.y, 2));
    }

    useEffect(() => {
        if ((systemCenter.x !== 0 && systemCenter.y !== 0) && distanceToPlayer() < (approachDistance * ratios[zoom] ) && !zoomed && zoom === scale - 1) {
            setZoomed(true);
            dispatch(zoomIn({scale}));
        } else if ( (systemCenter.x !== 0 && systemCenter.y !== 0) && distanceToPlayer() > (approachDistance * ratios[zoom] ) && zoomed && zoom === scale) {
            setZoomed(false);
            dispatch(zoomOut({scale: scale - 1}));
        }
    }, [distanceToPlayer()]);
    return { approachDistance, distanceToPlayer, systemCenter, activeSystem: zoomed };

};

export default useApproach;