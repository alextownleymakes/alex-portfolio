import { StylesType } from "@/utils/types/components";

interface DisplayContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    position?: "absolute" | "relative" | "fixed",
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
    zIndex?: number,
    transform?: string,
    transition?: string,
    styles?: StylesType,
}
const DisplayContainer: React.FC<DisplayContainerProps> = ({
    position: position = 'absolute',
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
    children,
    styles
}) => {

    const styleProps = {
        position,
        top,
        left,
        right,
        bottom,
        height,
        width,
        padding,
        margin,
        backgroundColor,
        id,
        border,
        borderRadius,
        zIndex: 1000,
        overflow: 'hidden',
    }

    const stylesObj = {...styles };

    const finalStyles = {
        ...styleProps,
        ...stylesObj
    };

    return (
        <div
            id={id}
            style={finalStyles}>
            {children}
        </div>
    );
}

export default DisplayContainer;