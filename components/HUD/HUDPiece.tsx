import React from 'react';
import Drawer, { DrawerProps } from '../common/Drawer/Drawer';

export interface HUDPieceProps extends DrawerProps {
    className?: 'hud';
}

const HUDPiece: React.FC<HUDPieceProps> = (props) => <Drawer { ...props }/>;

export default HUDPiece;