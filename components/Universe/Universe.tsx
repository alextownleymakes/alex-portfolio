import React from "react";

import { Coords, setWindowSize } from '@/state/gameStateSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/state/store';
import { useEffect } from 'react';

interface UniverseProps {
    children: React.ReactNode,
}
const Universe: React.FC<UniverseProps> = ({
    children
}) => {

    const windowSize = useSelector((state: RootState) => state.gameState.windowSize);
    const universeRef = React.useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (universeRef.current) {
            const { clientWidth, clientHeight } = universeRef.current;
            const windowSize = { x: clientWidth, y: clientHeight };
            const jeans = setWindowSize(windowSize);
            dispatch(jeans);
        }
    }, [universeRef.current]);

    return (
        <div
            ref={universeRef}
            style={{
                position: "relative",
                overflow: "hidden",
                width: "100vw",
                height: "100vh",
            }}
        >
            {(windowSize.x > 0 && windowSize.y > 0) && children}
        </div>
    );
}

export default Universe;