import type { ScaleTime } from 'd3-scale';
import { MutableRefObject } from 'react';

import { useTicks } from './useTick';

type Directions = 'horizontal' | 'vertical';

export interface TimeTicks {
  label: string;
  position: number;
  value: Date;
}

interface Options {
  tickFormat?: (d: Date) => string;
  minSpace?: number;
}

export function useTimeTicks<Scale extends ScaleTime<number, number>>(
  scale: Scale,
  direction: Directions,
  ref: MutableRefObject<SVGGElement | null>,
  options: Options,
): TimeTicks[] {
  const { tickFormat = scale.tickFormat() } = options;

  const ticks = useTicks<Date, ScaleTime<number, number>>(
    scale,
    direction,
    ref,
    { ...options, tickFormat },
  );
  return ticks.map((value) => ({
    label: tickFormat(value),
    position: scale(value),
    value,
  }));
}
