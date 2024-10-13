import type { ScaleTime } from 'd3-scale';
import { type MutableRefObject, useState } from 'react';

import { useTicks } from './useTick.js';

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

export function useTimeTicks(
  scale: ScaleTime<number, number>,
  direction: Directions,
  ref: MutableRefObject<SVGGElement | null>,
  options: Options,
): TimeTicks[] {
  const { tickFormat = scale.tickFormat() } = options;
  const [ticks, setTicks] = useState<TimeTicks[]>([]);
  useTicks<Date>(scale, direction, ref, {
    ...options,
    setTicks,
    tickFormat,
  });
  return ticks;
}
