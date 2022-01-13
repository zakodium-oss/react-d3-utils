import { useMemo, ReactNode } from 'react';

import { useBBoxObserver } from '../hooks/useBBoxObserver';

export type Align = 'start' | 'middle' | 'end';

export interface AlignGroupProps {
  x?: number;
  y?: number;
  verticalAlign?: Align;
  horizontalAlign?: Align;
  children: ReactNode | ReactNode[];
  none?: boolean;
}

function calculatePosition(start: number, align: Align, space: number) {
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
    none = false,
  } = props;

  const observed = useBBoxObserver();

  const xPosition = useMemo(
    () =>
      !none
        ? calculatePosition(
            x - observed.x,
            horizontalAlign,
            observed.width || 0,
          )
        : x,
    [none, x, observed.x, observed.width, horizontalAlign],
  );
  const yPosition = useMemo(
    () =>
      !none
        ? calculatePosition(y - observed.y, verticalAlign, observed.height || 0)
        : y,
    [none, y, observed.y, observed.height, verticalAlign],
  );

  return (
    <g ref={observed.ref} transform={`translate(${xPosition}, ${yPosition})`}>
      {children}
    </g>
  );
}
