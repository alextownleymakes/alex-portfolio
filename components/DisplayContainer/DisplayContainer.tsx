interface DisplayContainerProps {
    top?: number,
    left?: number,
    right?: number,
    bottom?: number,
    height?: number,
    width?: number,
    padding?: number,
    margin?: number,
    id?: string,
    backgroundColor?: string,
    children: React.ReactNode,
    border?: string,
    borderRadius?: number | string,
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
    backgroundColor: backgroundColor = "rgba(255, 255, 255, 0.1)",
    id: id = 'display-container',
    border: border = 'none',
    borderRadius: borderRadius = 5,
    children
}) => {
    return (
        <div
            id={id}
            style={{
                position: "absolute",
                top,
                left,
                bottom,
                right,
                padding,
                margin,
                backgroundColor,
                color: "white",
                zIndex: 1000,
                width,
                height,
                border,
                borderRadius,
                overflow: 'hidden',
            }}>
            {children}
        </div>
    );
}

export default DisplayContainer;