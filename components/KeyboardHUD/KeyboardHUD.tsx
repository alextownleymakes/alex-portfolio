import React from 'react';
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

const KeyboardHUD: React.FC = () => {

    const state = useSelector((state: RootState) => state.gameState);

    return (
        <ol>
            <li>
                W: thrust
            </li>
            <li>
                S: reverse orientation
            </li>
            <li>
                A: rotate left
            </li>
            <li>
                D: rotate right
            </li>
            <li>
                X: stop
            </li>
            <li>

            </li>
        </ol>
    );
}

export default KeyboardHUD;