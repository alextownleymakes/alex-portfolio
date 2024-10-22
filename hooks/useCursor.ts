import { useEffect, useState, RefObject } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

export const useCursor = (divRef: RefObject<HTMLDivElement>): CursorPosition | null => {
  const [cursorPosition, setCursorPosition] = useState<CursorPosition | null>(null);

  useEffect(() => {
    const divElement = divRef.current;
    
    if (!divElement) return; // If ref not found, do nothing

    const handleMouseMove = (event: MouseEvent) => {
      const rect = divElement.getBoundingClientRect();
      
      // Calculate the x and y coordinates where (0, 0) is the center of the div
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      setCursorPosition({ x, y });
    };

    divElement.addEventListener("mousemove", handleMouseMove);

    return () => {
      divElement.removeEventListener("mousemove", handleMouseMove);
    };
  }, [divRef]);

  return cursorPosition;
};
