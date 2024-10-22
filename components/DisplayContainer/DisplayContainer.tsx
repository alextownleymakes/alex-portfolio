interface DisplayContainerProps {
    top?: number,
    left?: number,
    right?: number,
    bottom?: number,
    height?: number,
    width?: number,
    padding?: number,
    margin?: number,
    children: React.ReactNode,
}
const DisplayContainer: React.FC<DisplayContainerProps> = ({
    top: top = 'auto',
    left: left = 'auto',
    right: right = 'auto',
    bottom: bottom = 'auto',
    height: height = 300,
    width: width = 300,
    padding: padding = 10,
    margin: margin = 10,
    children
}) => {
    return (
        <div style={{
            position: "absolute",
            top,
            left,
            bottom,
            right,
            padding,
            margin,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "white",
            borderRadius: 5,
            zIndex: 1000,
            width,
            height,
            overflow: 'hidden',
        }}>
            {children}
        </div>
    );
}

export default DisplayContainer;