import React from 'react';
import useAuCoordinates from '@/hooks/useAuCoordinates';
import StarSystem from '../StarSystem/StarSystem';
import { distanceTo } from '@/utils/functions/calculations';
import { StarSystemType } from '@/utils/types/stellarTypes';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';

interface GalaxySystemProps {
  system: StarSystemType;
}

const GalaxySystem: React.FC<GalaxySystemProps> = ({ system }) => {
  const position = useSelector((state: RootState) => state.gameState.position);
  const ratio = useSelector((state: RootState) => state.gameState.scale);
  const { x, y } = useAuCoordinates({ data: { system }, type: 'system', ratio });

  if (Number.isNaN(x) || Number.isNaN(y)) return null;

  const distance = distanceTo({ cx: x, cy: y, px: position.x, py: position.y });
  // if (distance > 3000) return null;

  return <StarSystem system={system} x={x} y={y} />;
};

export default GalaxySystem;