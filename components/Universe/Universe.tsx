import React from "react";

import { setWindowSize } from '@/state/gameStateSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/state/store';
import { useEffect } from 'react';
import { useLowestOrbit } from '@/hooks/useLowestOrbit';

interface UniverseProps {
    children: React.ReactNode,
}
const Universe: React.FC<UniverseProps> = ({
    children
}) => {

    const windowSize = useSelector((state: RootState) => state.gameState.windowSize);
    const universeRef = React.useRef<HTMLDivElement>(null);
    const orbit = useSelector((state: RootState) => state.gameState.orbit);
    const dispatch = useDispatch();

    useLowestOrbit(orbit);

    useEffect(() => {
        if (universeRef.current) {
            const { clientWidth, clientHeight } = universeRef.current;
            const windowSize = { x: clientWidth, y: clientHeight };
            const jeans = setWindowSize(windowSize);
            dispatch(jeans);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [universeRef]);

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