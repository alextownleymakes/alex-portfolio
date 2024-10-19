import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

interface UniverseProps {
    children: React.ReactNode,
}
const Universe: React.FC<UniverseProps> = ({
    children
}) => {

        const playerState = useSelector((state: RootState) => state.gameState);

        return (
            <div
                style={{
                    position: "relative",
                    overflow: "hidden",
                    width: "100vw",
                    height: "100vh",
                }}
            >
                {children}
            </div>
        );
    }

export default Universe;