// a custom hook that returns new positions of an object relative to the player position, considering the zoom level

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Coords, zoomIn, zoomOut } from "@/state/gameStateSlice";
import { baseSize } from "@/components/Galaxy/Galaxy";
import { ratios } from "@/utils/functions/zoom";

const useApproach = (ref: React.RefObject<HTMLElement>, coords: Coords): { approachDistance: number, distanceToPlayer: () => number, systemCenter: { x: number, y: number }, zoomed: boolean } => {

    const dispatch = useDispatch();
    const playerPosition = useSelector((state: RootState) => state.gameState.zoomedPosition);
    const universeSize = useSelector((state: RootState) => state.gameState.universeSize);
    const zoom = useSelector((state: RootState) => state.gameState.zoom);
    const approachDistance = useSelector((state: RootState) => state.gameState.approachDistance);
    
    const [systemCenter, setSystemCenter] = useState({
        x: ref.current ? (ref.current.offsetLeft + (ref.current.offsetWidth / 2)) - ((universeSize * ratios[zoom] )/2) : 0,
        y: ref.current ? (ref.current.offsetTop + (ref.current.offsetHeight / 2)) - ((universeSize * ratios[zoom] )/2) : 0,
    });

    useEffect(() => {
        setSystemCenter({
            x: ref.current ? (ref.current.offsetLeft + (ref.current.offsetWidth / 2)) - ((universeSize * ratios[zoom] )/2) : 0,
            y: ref.current ? (ref.current.offsetTop + (ref.current.offsetHeight / 2)) - ((universeSize * ratios[zoom] )/2) : 0,
        });
    }, [ref.current?.offsetLeft]);

    const [zoomed, setZoomed] = useState(false);

    const distanceToPlayer = () => {
        return Math.sqrt(Math.pow(playerPosition.x - coords.x, 2) + Math.pow(playerPosition.y - coords.y, 2));
    }

    useEffect(() => {
        if ((systemCenter.x !== 0 && systemCenter.y !== 0) && distanceToPlayer() < (approachDistance * ratios[zoom]) && !zoomed) {
            setZoomed(true);
            dispatch(zoomIn());
        } else if ( (systemCenter.x !== 0 && systemCenter.y !== 0) && distanceToPlayer() > (approachDistance * ratios[zoom]) && zoomed) {
            setZoomed(false);
            dispatch(zoomOut());
        }
    }, [distanceToPlayer()]);
    return { approachDistance, distanceToPlayer, systemCenter, zoomed };

};

export default useApproach;