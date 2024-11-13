import React from 'react';
import useAuCoordinates from '@/hooks/useAuCoordinates';
import System from '../System/System';
import { distanceTo } from '@/utils/functions/calculations';
// import { StarSystemType } from '@/utils/types/stellarTypes';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { StellarBodyType } from '@/utils/types/stellarTypes';

interface SystemComponentProps {
  system: StellarBodyType;
  mm: boolean;
}

const SystemComponent: React.FC<SystemComponentProps> = ({ system, mm }) => {
  const position = useSelector((state: RootState) => state.gameState.position);
  const { x, y } = useAuCoordinates({ data: { system }, type: 'system' });
  const dc = { cx: x, cy: y, px: position.x, py: position.y };
  const distance = distanceTo(dc);

  return (
    mm
      ?
      <System
        system={system}
        x={x}
        y={y}
        mm={mm}
        type={system.type}
      />
      :
      (
        distance > 3000
      )
        ?
        null
        :
        <System
          system={system}
          x={x}
          y={y}
          type={system.type}
        />
  )
};

export default SystemComponent;