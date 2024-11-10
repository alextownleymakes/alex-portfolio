import { Key } from "@/state/keyStateSlice";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import styles from './KeyboardHUD.module.scss';
import { HUDPieceProps } from '../HUD/HUDPiece';

const KeyboardHUDBody: React.FC = () => {

    const keyState = useSelector((state: RootState) => state.keyState);
    const keysArray: Key[] = Object.values(keyState);
    return (
        <div className={styles['keyboard-body']}>
            {keysArray.map((key) => {
                const className = key.pressed ? styles['key'] + ' ' + styles['pressed'] : styles['key'];

                return (
                    <div style={{ fontSize: '.7rem', lineHeight: '1.5rem' }} key={key.key + 'key-hud'}>
                        <span className={className}>
                            {key.key}
                        </span>
                        {" "}{key.action}
                    </div>
                )
            })}
        </div>
    );
};

export const keyboardProps: HUDPieceProps = {
    name: 'controls',
    position: 'left',
    styles: {
        height: 'auto',
        width: 'auto',
        top: 10
    },
    className: 'hud',
    children: <KeyboardHUDBody/>
}
