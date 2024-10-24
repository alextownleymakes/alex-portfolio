import React from 'react';
import Drawer from '../Drawer/Drawer';

const FlightDataHUD: React.FC = () => {
    return (
        <Drawer name="flightData" position="top">
            <div>
                <h1>Flight Data</h1>
                <p>Speed: 0</p>
                <p>Altitude: 0</p>
                <p>Heading: 0</p>
            </div>
        </Drawer>

    );
}
export default FlightDataHUD;