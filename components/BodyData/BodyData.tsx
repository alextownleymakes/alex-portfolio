interface BodyDataProps {
    name: string;
    type: string;
    x: number;
    y: number;
    dev: boolean;
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
    dev,
    left = 'calc(100% + 5px)',
    top = 'calc(50% - 1.5rem)',
    miniMap = false,
    distanceToPlayer
}) => !miniMap && (
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
        : {type}<br />
        {(`x: ${x}; y: ${y}`)}
        <br />
        {dev && (` DTP: ${distanceToPlayer().toFixed(0)};`)}
    </div>)

export default BodyData;