import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

interface BodyDataProps {
    name: string;
    type: string;
    x: number;
    y: number;
    miniMap: boolean;
    distanceToPlayer: () => number;
    left: number | string;
    top: number | string;
}

const BodyData: React.FC<BodyDataProps> = ({
    name,
    type,
    x,
    y,
    left = 'calc(100% + 5px)',
    top = 'calc(50% - 1.5rem)',
    miniMap = false,
    distanceToPlayer
}) => {

    const dev = useSelector((state: RootState) => state.keyState.devDisplay.pressed);

    return !miniMap && (
        <div
            style={{
                position: 'absolute',
                left,
                top,
                width: 150,
                color: '#999',
                fontSize: '0.7rem',
                textTransform: 'uppercase',
            }}
        >
            <span style={{ fontWeight: 600 }}>
                {name}
            </span>
            : {type}
            {dev && <br />}
            {dev && `x: ${x}; y: ${y}`}
            {dev && <br />}
            {dev && (` DTP: ${distanceToPlayer().toFixed(0)};`)}
        </div>
    );
}

export default BodyData;