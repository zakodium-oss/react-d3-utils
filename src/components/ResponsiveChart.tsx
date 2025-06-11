import type { ReactNode } from 'react';

import { useResizeObserver } from '../hooks/use_resize_observer.js';

export interface ResponsiveChartProps {
  width?: number | `${number}%`;
  height?: number | `${number}%`;
  minWidth?: number | `${number}%`;
  minHeight?: number | `${number}%`;
  maxWidth?: number | `${number}%`;
  maxHeight?: number | `${number}%`;
  children: (size: { width: number; height: number }) => ReactNode;
}

export function ResponsiveChart(props: ResponsiveChartProps) {
  const { width, height, minWidth, minHeight, maxWidth, maxHeight, children } =
    props;

  const [observedRef, observedSize] = useResizeObserver();

  return (
    <div
      ref={observedRef}
      style={{
        position: 'relative',
        flex: 1,
        width: width || '100%',
        height: height || '100%',
        minWidth: minWidth || 0,
        minHeight: minHeight || 0,
        maxWidth,
        maxHeight,
      }}
    >
      <div
        style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
      >
        {observedSize
          ? children({ width: observedSize.width, height: observedSize.height })
          : null}
      </div>
    </div>
  );
}
