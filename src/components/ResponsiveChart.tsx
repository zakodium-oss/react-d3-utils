import { ReactNode } from 'react';
import useResizeObserver from 'use-resize-observer';

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

  // @ts-expect-error use-resize-observer types are wrong
  // See https://github.com/microsoft/TypeScript/issues/49189
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
