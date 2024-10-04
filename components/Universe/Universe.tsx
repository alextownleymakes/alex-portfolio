import { StarSystem } from '../../utils/types/stellarBodies';
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

interface UniverseProps {
    children: React.ReactNode,
    systems: StarSystem[]
}
const Universe: React.FC<UniverseProps> = ({
    children,
    systems
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
                <div>
                    Player Position: {playerState.position.x}, {playerState.position.y}
                </div>
            </div>
        );
    }

export default Universe;