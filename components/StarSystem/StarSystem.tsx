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
  const scale = useSelector((state: RootState) => state.gameState.zoom);

  const dispatch = useDispatch();
  const systemRef = useRef<HTMLDivElement>(null);
  const systemContainer = systemRef.current;

  const position = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const baseSize = 500;
  const baseDistance = 600;

  const [containerSize, setContainerSize] = useState(0);
  const [useableContainerSize, setUseableContainerSize] = useState(0);
  const [systemPosition, setSystemPosition] = useState<{ x: number, y: number } | undefined>(undefined);
  const [activeSystem, setActiveSystem] = useState(false);

  useEffect(() => {
    const containerSize = baseSize * ratios[scale];
    if (!activeSystem && scale === 0) setContainerSize(containerSize);
    if (activeSystem) setContainerSize(containerSize);
  }, [scale]);

  useEffect(() => {
    if (containerSize) {
      const newX = (
        ((system.position.x - ((containerSize) / 2))
          -
          (playerPosition.x))
        +
        (window.innerWidth / 2)
      );
      const newY = (
        (system.position.y - ((containerSize) / 2))
        -
        (playerPosition.y)
        +
        (window.innerHeight / 2)
      );

      const smoothingFactor = 0.1;
      if (systemPosition) {
        const systemVelocity = {
          x: (newX - systemPosition.x) * smoothingFactor,
          y: (newY - systemPosition.y) * smoothingFactor,
        };

        const posWithVelocity = {
          x: systemPosition.x + (systemVelocity.x - (playerVelocity.x * (.1))),
          y: systemPosition.y + (systemVelocity.y - (playerVelocity.y * (.1)))
        };

        const smoothedContainerSize = useableContainerSize + ((containerSize - (useableContainerSize)) * smoothingFactor);
        setUseableContainerSize(smoothedContainerSize);
        setSystemPosition(posWithVelocity);
        return;
      }
      setUseableContainerSize(containerSize);
      setSystemPosition({ x: newX, y: newY });
    };

  }, [playerVelocity]);


  useEffect(() => {
    const distance = systemContainer ? Math.sqrt(Math.pow(position.x - (systemContainer.offsetLeft + (systemContainer.offsetWidth / 2)), 2) + Math.pow(position.y - (systemContainer.offsetTop + (systemContainer.offsetHeight / 2)), 2)) : 10000;
    if (distance < baseDistance && scale < 1) {
      setActiveSystem(true);
      dispatch(zoomIn());
    } else if (activeSystem && distance > baseDistance && scale > 0) {
      dispatch(zoomOut());
      setActiveSystem(false);
    }
    //eslint disable-next-line
  }, [position]);

  return (
    <div
      ref={systemRef}
      style={{
        top: systemPosition?.y ?? 0,
        left: systemPosition?.x ?? 0,
        width: useableContainerSize + 'px',
        height: useableContainerSize + 'px',
        // border: '1px solid white',
        position: 'absolute',
        overflow: 'hidden',
        visibility: systemPosition ? 'visible' : 'hidden'
      }}>
      {system.stars.map((star) => (
        <Star
          key={star.name} // Using name as the key since ID isn't in the interface
          star={star} // Pass the entire Star object
          active={activeSystem} // Pass active state to the star
          onFlyNear={() => onFlyNearStar?.(star.id)} // Trigger view change when flying near a star
        />
      ))}
    </div>
  );
};

export default StarSystem;
