// StarSystemView.tsx (Zoomed-in Star System View)
import React from 'react';
import StarSystem from '../StarSystem/StarSystem';
import { StarSystem as StarSystemType } from '../../utils/types/stellarBodies';

interface StarSystemViewProps {
  system: StarSystemType;
}

const StarSystemView: React.FC<StarSystemViewProps> = ({ system }) => {
  console.log('StarSystemView rendering');
  return (
      <StarSystem stars={system.stars} />
  );
};

export default StarSystemView;
