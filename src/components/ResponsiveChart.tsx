import { ReactNode } from 'react';
import useResizeObserver from 'use-resize-observer';

export interface ResponsiveChartProps {
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  children: (size: { width: number; height: number }) => ReactNode;
}

export function ResponsiveChart(props: ResponsiveChartProps) {
  const { width, height, minWidth, minHeight, maxWidth, maxHeight, children } =
    props;

  const observed = useResizeObserver<HTMLDivElement>();

  return (
    <div
      ref={observed.ref}
      style={{
        flex: 1,
        width: width || '100%',
        height: height || '100%',
        minWidth: minWidth || 0,
        minHeight: minHeight || 0,
        maxWidth,
        maxHeight,
      }}
    >
      {observed.width && observed.height
        ? children({ width: observed.width, height: observed.height })
        : null}
    </div>
  );
}
