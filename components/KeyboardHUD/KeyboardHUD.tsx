import React from 'react';
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import styles from './KeyboardHUD.module.scss';
import { Key } from '@/state/keyStateSlice';

const KeyboardHUD: React.FC = () => {

    const keyState = useSelector((state: RootState) => state.keyState);

    const keysArray: Key[] = Object.values(keyState);

    interface KeyLisProps {
        singleKey: Key;
    }

    const KeyLi: React.FC<KeyLisProps> = ({ singleKey }) => {
            const className = singleKey.pressed ? styles['key'] + ' ' + styles['pressed'] : styles['key'];
            return (
                <li key={singleKey.key + 'key-hud'}>
                    <span className={className}>
                        {singleKey.key}
                    </span>
                    {" "}{singleKey.action}
                </li>
            );
    };


    return (
        <ol style={{ fontSize: '.7rem', lineHeight: '1.5rem' }}>
            {keysArray.map((key) => (
                <KeyLi key={key.key} singleKey={key} />
            ))}
        </ol>
    );
}

export default KeyboardHUD;