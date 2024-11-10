import React from "react";
import styles from "./DisplayContainer.module.scss";

interface DisplayContainerProps extends React.CSSProperties {
    id?: string;
    children: React.ReactNode;
    styles?: React.CSSProperties;
    className?: string;
}

const DisplayContainer: React.FC<DisplayContainerProps> = ({
    id = 'display-container',
    children,
    styles: extraStyles = {},
    className = '',
    ...rest
}) => {
    // Only apply dynamic or absolutely necessary styles inline
    const inlineStyles: React.CSSProperties = {
        ...extraStyles, // Apply only dynamic styles
        ...rest,       // Spread any other props passed
    };

    return (
        <div
            id={id}
            style={inlineStyles}  // Use inline styles only for dynamic properties
            className={`${styles[className]} ${className}`}  // Merge SCSS module class with any passed className
        >
            {children}
        </div>
    );
}

export default DisplayContainer;
