import { useEffect, useRef, useState, useCallback } from 'react';

export const useResizeObserver = () => {
  const [dimensions, setDimensions] = useState(null);
  const frameId = useRef(null);
  const ref = useRef(null);

  const measure = useCallback(() => {
    frameId.current = requestAnimationFrame(() => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setDimensions(rect);
      }
    });
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(measure);
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      resizeObserver.disconnect();
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, [measure]);

  return [ref, dimensions];
};