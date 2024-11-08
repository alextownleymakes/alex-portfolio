import React from 'react';
import useAuCoordinates from '@/hooks/useAuCoordinates';
import StarSystem from '../StarSystem/StarSystem';
import { distanceTo } from '@/utils/functions/calculations';
import { StarSystemType } from '@/utils/types/stellarTypes';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';

interface GalaxySystemProps {
  system: StarSystemType;
  position: { x: number; y: number };
}

const GalaxySystem: React.FC<GalaxySystemProps> = ({ system, position }) => {
  const ratio = useSelector((state: RootState) => state.gameState.ratio);
  const zoom = useSelector((state: RootState) => state.gameState.zoom);
  const { x, y } = useAuCoordinates({ data: { system }, type: 'system', ratio });
  console.log('GalaxySystem.tsx', system.name, x, y);

  if (Number.isNaN(x) || Number.isNaN(y)) return null;

  const distance = distanceTo({ cx: x, cy: y, px: position.x, py: position.y });
  console.log(system.name, '- (c: ', x, y, ') (p: ', position.x, position.y, ') (d: ', distance, ')', zoom);
  // if (distance > 3000) return null;

  return <StarSystem system={system} x={x} y={y} />;
};

export default GalaxySystem;