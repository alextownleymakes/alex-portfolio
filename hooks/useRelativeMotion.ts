// a custom hook that returns new positions of an object relative to the player position, considering the zoom level

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { ratios } from "../utils/functions/zoom";

interface RelativeMotion {
    x: number;
    y: number;
}

const useRelativeMotion = (ref: React.RefObject<HTMLElement>): void => {
    const playerPosition = useSelector((state: RootState) => state.gameState.position);
    const playerVelocity = useSelector((state: RootState) => state.gameState.velocity);
    const playerRotation = useSelector((state: RootState) => state.gameState.rotation);

    const [position, setPosition] = useState(ref.current ? { x: ref.current.offsetLeft, y: ref.current.offsetTop } : { x: 0, y: 0 });

    const rateOfTravel = {
        x: playerVelocity.x * Math.cos(playerRotation),
        y: playerVelocity.y * Math.sin(playerRotation),
    }

    useEffect(() => {
        setPosition({
            x: position.x + (playerVelocity.x * Math.cos(playerRotation)),
            y: position.y + (playerVelocity.y * Math.sin(playerRotation)),
        });
    }
    , [playerPosition, playerVelocity, playerRotation]);

    useEffect(() => {
        if (ref.current) {
            ref.current.style.left = `${position.x}px`;
            ref.current.style.top = `${position.y}px`;
        }
    }, [position]);

};

export default useRelativeMotion;