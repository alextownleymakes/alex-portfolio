import { Key } from "@/state/keyStateSlice";
import styles from '../KeyboardHUD.module.scss';

interface KeyboardHUDBodyProps {
    keys: Key[];
}

const KeyboardHUDBody: React.FC<KeyboardHUDBodyProps> = ({keys}) => {
    return (
        <ol style={{ fontSize: '.7rem', lineHeight: '1.5rem' }}>
            {keys.map((key) => {
                const className = key.pressed ? styles['key'] + ' ' + styles['pressed'] : styles['key'];

                return (
                    <li key={key.key + 'key-hud'}>
                    <span className={className}>
                        {key.key}
                    </span>
                    {" "}{key.action}
                </li>
                )
            })}
        </ol>
     )
}

export default KeyboardHUDBody;