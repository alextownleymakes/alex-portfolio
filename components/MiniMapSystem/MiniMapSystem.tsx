import React from 'react';
import useAuCoordinates from '@/hooks/useAuCoordinates';
// import MiniMapStarComponent from './MiniMapStarComponent';
import { StarSystemType } from '@/utils/types/stellarTypes';

interface MiniMapSystemProps {
  system: StarSystemType;
}

const MiniMapSystem: React.FC<MiniMapSystemProps> = ({ system }) => {
  const { x, y } = useAuCoordinates({ data: { system }, type: 'system' });
  if (Number.isNaN(x) || Number.isNaN(y)) return null;

  return (
    <div
      id={system.id + '-minimap'}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        width: 0,
        height: 0,
      }}
    >
      {system.stars.map((star) => (
        // <MiniMapStarComponent key={star.name} system={system} star={star} ratio={ratio} />
        <div></div>
      ))}
    </div>
  );
};

export default MiniMapSystem;
