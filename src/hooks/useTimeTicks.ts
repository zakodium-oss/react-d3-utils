import type { ScaleTime } from 'd3-scale';
import { type MutableRefObject, useState } from 'react';

import { useTicks } from './useTick.js';

type Directions = 'horizontal' | 'vertical';

export interface TimeTicks {
  label: string;
  position: number;
  value: Date;
}

export interface UseTimeTicksResult {
  scale: ScaleTime<number, number>;
  ticks: TimeTicks[];
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
): UseTimeTicksResult {
  const { tickFormat = scale.tickFormat() } = options;
  const [ticks, setTicks] = useState<UseTimeTicksResult>(() => ({
    ticks: [],
    scale,
  }));
  useTicks<Date>(scale, direction, ref, {
    ...options,
    setTicks,
    tickFormat,
  });
  return ticks;
}
