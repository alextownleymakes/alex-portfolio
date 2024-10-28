import React from 'react';
import Drawer from '../Drawer/Drawer';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

const FlightDataHUD: React.FC = () => {

    const gameState = useSelector((state: RootState) => state.gameState);

    return (
        <Drawer name="flightData" position="top">
            <div>
                <h1>Flight Data</h1>
                <p>Currently Orbiting: {gameState.lowestOrbit.name} {gameState.lowestOrbit.type && `(${gameState.lowestOrbit.type})`}</p>
                <p>Altitude: 0</p>
                <p>Heading: 0</p>
            </div>
        </Drawer>

    );
}
export default FlightDataHUD;