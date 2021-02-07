import { useMemo, ReactNode } from 'react';

import { useBBoxObserver } from '../hooks/useBBoxObserver';

export type Align = 'start' | 'middle' | 'end';

export interface AlignGroupProps {
  x?: number;
  y?: number;
  verticalAlign?: Align;
  horizontalAlign?: Align;
  children: ReactNode | ReactNode[];
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
  } = props;

  const observed = useBBoxObserver();

  const xPosition = useMemo(
    () =>
      calculatePosition(x - observed.x, horizontalAlign, observed.width || 0),
    [x, horizontalAlign, observed.x, observed.width],
  );
  const yPosition = useMemo(
    () =>
      calculatePosition(y - observed.y, verticalAlign, observed.height || 0),
    [y, verticalAlign, observed.y, observed.height],
  );

  return (
    <g ref={observed.ref} transform={`translate(${xPosition}, ${yPosition})`}>
      {children}
    </g>
  );
}
