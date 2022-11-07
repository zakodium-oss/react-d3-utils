import { useMemo, ReactNode, CSSProperties } from 'react';

import { useBBoxObserver } from '../hooks/useBBoxObserver.js';

export type Align = 'start' | 'middle' | 'end' | 'none';

export interface AlignGroupProps {
  x?: number;
  y?: number;
  style?: CSSProperties;
  verticalAlign?: Align;
  horizontalAlign?: Align;
  children: ReactNode | ReactNode[];
}

function calculatePosition(
  start: number,
  align: Align,
  space: number,
  value: number,
) {
  switch (align) {
    case 'start': {
      return start;
    }
    case 'end': {
      return start - space;
    }
    case 'middle': {
      return start - space / 2;
    }
    case 'none': {
      return value;
    }
    default: {
      throw new Error(`Unkwnown alignment ${JSON.stringify(align)}`);
    }
  }
}

export function AlignGroup(props: AlignGroupProps) {
  const {
    x = 0,
    y = 0,
    verticalAlign = 'start',
    horizontalAlign = 'start',
    children,
    style = {},
  } = props;

  const observed = useBBoxObserver();

  const xPosition = useMemo(
    () =>
      calculatePosition(
        x - observed.x,
        horizontalAlign,
        observed.width || 0,
        x,
      ),
    [x, observed.x, observed.width, horizontalAlign],
  );
  const yPosition = useMemo(
    () =>
      calculatePosition(y - observed.y, verticalAlign, observed.height || 0, y),
    [y, observed.y, observed.height, verticalAlign],
  );

  return (
    <g
      style={style}
      ref={observed.ref}
      transform={`translate(${xPosition}, ${yPosition})`}
    >
      {children}
    </g>
  );
}
