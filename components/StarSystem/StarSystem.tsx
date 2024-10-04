// StarSystem.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Star from '../Star/Star';
import { StarSystem as StarSystemType } from '../../utils/types/stellarBodies';
import { ratios } from '../../utils/functions/zoom';
import { RootState } from '../../state/store';
import { zoomIn, zoomOut } from '../../state/gameStateSlice';


interface StarSystemProps {
  system: StarSystemType;
  key: string;
  onFlyNearStar?: (starId: number) => void; // Callback when flying near a star
}

const StarSystem: React.FC<StarSystemProps> = ({ system, onFlyNearStar }) => {
  const playerVelocity = useSelector((state: RootState) => state.gameState.velocity);
  const playerPosition = useSelector((state: RootState) => state.gameState.position);
  const position = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  
  const baseSize = 100;

  const scale = useSelector((state: RootState) => state.gameState.zoom);

  // system position is set relative to player position

  // playerPosition at 0,0
  // window.innerwidth being 2000, /2 = 1000
  // window.innerHeight being 1500, /2 = 750
  // player renders at 1000,750
  // system.position being 500,500
  // system should render at 1500,1250
  // formula should be:
  // system.position.x - playerPosition.x + window.innerWidth / 2
  // system.position.y - playerPosition.y + window.innerHeight / 2
  // however, console logs { x: 1418.5, y: 909.5 }
  // and system renders at 1418.5,909.5
  // so the formula needs to be changed to:
  // system.position.x - playerPosition.x + window.innerWidth / 2
  // just kidding that's the same thing
  // here's the fix:
  // system.position.x - playerPosition.x + window.innerWidth / 2 - baseSize / 2


  const sysPos = {
    x: system.position.x - playerPosition.x + window.innerWidth / 2,
    y: system.position.y - playerPosition.y + window.innerHeight / 2
  }
  console.log('system.position.x (', system.position.x, ') - playerPosition.x (', playerPosition.x, ') + window.innerWidth / 2 (', window.innerWidth / 2, ') - baseSize / 2 (', baseSize / 2, ') = ', sysPos.x);
  console.log('system.position.y (', system.position.y, ') - playerPosition.y (', playerPosition.y, ') + window.innerHeight / 2 (', window.innerHeight / 2, ') - baseSize / 2 (', baseSize / 2, ') = ', sysPos.y);
  console.log('sysPos', sysPos);
  const [systemPosition, setSystemPosition] = useState(sysPos);
  const [ratio, setRatio] = useState(ratios[scale]);
  const [containerSize, setContainerSize] = useState(baseSize * ratio + 'px');


  const systemRef = useRef<HTMLDivElement>(null);
  const systemContainer = systemRef.current;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('scale', scale);
    setRatio(ratios[scale]);
  }, [scale]);

  useEffect(() => {
    console.log('ratio', ratio);
    setContainerSize(baseSize * ratio + 'px');
  }, [ratio]);

  useEffect(() => {
    setSystemPosition((sysPos) => {
        const newX = (system.position.x - playerPosition.x + window.innerWidth / 2);
        const newY = (system.position.y - playerPosition.y + window.innerHeight / 2);

        const posWithVelocity = {
          x: newX - (playerVelocity.x * 2 * ratio),
          y: newY - (playerVelocity.y * 2 * ratio)
        };
        
        console.log('newX', newX, 'vX', posWithVelocity.x, 'newY', newY, 'vY', posWithVelocity.y);


        return posWithVelocity;
    });
}, [playerVelocity]);


useEffect(() => {
  const distance = systemContainer ? Math.sqrt(Math.pow(position.x - (systemContainer.offsetLeft + (systemContainer.offsetWidth/2)), 2) + Math.pow(position.y - (systemContainer.offsetTop + (systemContainer.offsetHeight/2)), 2)) : 10000;
  if (distance < 250) {
      dispatch(zoomIn());
      //systemPosition updates to be: relative to the player's position, twice as far from the player position at the angle it currently is at
      if (systemContainer) {
        const systemCenter = { x: systemContainer.offsetLeft + (systemContainer.offsetWidth/2), y: systemContainer.offsetTop + (systemContainer.offsetHeight/2) };
        const angle = Math.atan2(systemCenter.y - position.y, systemCenter.x - position.x);
        const newX = position.x - (Math.cos(angle) * distance * 2);
        const newY = position.y - (Math.sin(angle) * distance * 2);
        setSystemPosition({ x: newX, y: newY });
      }

      setSystemPosition({ x: system.position.x, y: system.position.y });
  } else if (distance > 500) {
      dispatch(zoomOut());
  }
}, [position]);

  return (
    <div 
      ref={systemRef}
      style={{
      top: systemPosition.y,
      left: systemPosition.x,
      width: containerSize,
      height: containerSize,
      border: '1px solid white',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {system.stars.map((star) => (
        <Star
          key={star.name} // Using name as the key since ID isn't in the interface
          star={star} // Pass the entire Star object
          onFlyNear={() => onFlyNearStar?.(star.id)} // Trigger view change when flying near a star
        />
      ))}
    </div>
  );
};

export default StarSystem;
