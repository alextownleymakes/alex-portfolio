interface DisplayContainerProps {
    top?: number,
    left?: number,
    right?: number,
    bottom?: number,
    height?: number,
    width?: number,
    children: React.ReactNode,
}
const DisplayContainer: React.FC<DisplayContainerProps> = ({
    top: top = 'auto',
    left: left = 'auto',
    right: right = 'auto',
    bottom: bottom = 'auto',
    height: height = 300,
    width: width = 300,
    children
}) => {
    return (
        <div style={{
            position: "absolute",
            top: top,
            left: left,
            bottom: bottom,
            right: right,
            padding: 10,
            margin: 10,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "white",
            borderRadius: 5,
            zIndex: 1000,
            width: width + 'px',
            height: height + 'px',
            overflow: 'hidden',
        }}>
            {children}
        </div>
    );
}

export default DisplayContainer;