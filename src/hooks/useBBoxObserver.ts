import { RefCallback, useCallback, useRef, useState } from 'react';

const initialSize = { x: 0, y: 0, width: 0, height: 0 };

export function useBBoxObserver<ElementType extends SVGGraphicsElement>() {
  // Actual current size of the observed element
  const [size, setSize] = useState(initialSize);

  // Previous size to compare in the observer and avoid unnecessary rerenders.
  const previousSize = useRef(initialSize);

  // Contains a function to cleanup the previous observer when the observed element changes.
  const cleanupPrevious = useRef<() => void>();

  // Ref callback to do the observation.
  const ref: RefCallback<ElementType> = useCallback((element) => {
    if (cleanupPrevious.current) {
      cleanupPrevious.current();
    }
    if (element !== null) {
      // @ts-expect-error: ResizeObserver will only in `lib.dom.d.ts` in TypeScript 4.2
      const observer = new ResizeObserver(([entry]) => {
        const bbox = (entry.target as ElementType).getBBox();
        const previous = previousSize.current;
        if (
          previous.x !== bbox.x ||
          previous.y !== bbox.y ||
          previous.width !== bbox.width ||
          previous.height !== bbox.height
        ) {
          // Only update the size if any of the values has changed.
          const newSize = {
            x: bbox.x,
            y: bbox.y,
            width: bbox.width,
            height: bbox.height,
          };
          previousSize.current = newSize;
          setSize(newSize);
        }
      });
      observer.observe(element);
      cleanupPrevious.current = () => {
        observer.unobserve(element);
      };
    }
  }, []);
  return { ref, ...size };
}
