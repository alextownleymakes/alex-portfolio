import React from 'react';
import useAuCoordinates from '@/hooks/useAuCoordinates';
import StarSystem from '../StarSystem/StarSystem';
import { distanceTo } from '@/utils/functions/calculations';
import { StarSystemType } from '@/utils/types/stellarTypes';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';

interface GalaxySystemProps {
  system: StarSystemType;
  mm: boolean;
}

const GalaxySystem: React.FC<GalaxySystemProps> = ({ system, mm }) => {
  const position = useSelector((state: RootState) => state.gameState.position);
  const { x, y } = useAuCoordinates({ data: { system }, type: 'system' });
  const dc = { cx: x, cy: y, px: position.x, py: position.y };
  const distance = distanceTo(dc);

  return mm ? <StarSystem system={system} x={x} y={y} /> : ((distance > 3000) ? null : <StarSystem system={system} x={x} y={y} />);
};

export default GalaxySystem;