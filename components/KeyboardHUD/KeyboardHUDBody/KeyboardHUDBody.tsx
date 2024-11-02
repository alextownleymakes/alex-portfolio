import { Key } from "@/state/keyStateSlice";
import styles from '../KeyboardHUD.module.scss';

interface KeyboardHUDBodyProps {
    keys: Key[];
}

const KeyboardHUDBody: React.FC<KeyboardHUDBodyProps> = ({keys}) => {
    return (
        <div>
            {keys.map((key) => {
                const className = key.pressed ? styles['key'] + ' ' + styles['pressed'] : styles['key'];

                return (
                    <div style={{fontSize: '.7rem', lineHeight: '1.5rem'}}key={key.key + 'key-hud'}>
                    <span className={className}>
                        {key.key}
                    </span>
                    {" "}{key.action}
                </div>
                )
            })}
        </div>
     )
}

export default KeyboardHUDBody;