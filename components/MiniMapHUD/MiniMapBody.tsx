import { StarSystem } from "@/utils/types/stellarBodies";
import MiniMapStarSystem from "../MiniMapStarSystem/MiniMapStarSystem";
import Player from "../Player/Player";
import styles from './Minimap.module.scss';

interface MiniMapBodyProps {
    galaxyRef: React.RefObject<HTMLDivElement>;
    galaxySize: number;
    galaxyPosX: string;
    galaxyPosY: string;
    visibleSystems: StarSystem[];
}

const MiniMapBody: React.FC<MiniMapBodyProps> = ({
    galaxyRef,
    galaxySize,
    galaxyPosX,
    galaxyPosY,
    visibleSystems
}) => {

    return (
        <div className={styles['minimap-body']}>
            <div
                ref={galaxyRef}
                id="minimap"
                style={{
                    width: galaxySize,
                    height: galaxySize,
                    position: 'absolute',
                    left: galaxyPosX,
                    top: galaxyPosY,
                }}>
                {visibleSystems.map((system) => (
                    <MiniMapStarSystem
                        key={system.name + '-minimap'}
                        system={system}
                    />
                ))}
            </div>
            <Player miniMap={true} />
        </div>
    );
}

export default MiniMapBody;
