import type { ScaleTime } from 'd3-scale';
import { type MutableRefObject, useState } from 'react';

import { type Tick, useTicks } from './useTicks.js';

type Directions = 'horizontal' | 'vertical';

export interface UseTimeTicksResult {
  /**
   * The scale used to generate the ticks' position.
   * This is not necessarily the same as the one passed to the hook, and may be
   * the scale passed to a previous call to the hook.
   * If you need to do additional processing with the ticks, for example to
   * compute the position of secondary ticks, you should use this scale, and not
   * the one you passed to the hook.
   */
  scale: ScaleTime<number, number>;
  /**
   * The ticks generated by the hook.
   * The number of ticks account for the space available based on the dom
   * reference passed to the hook, as well as the space required to render the
   * formatted tick labels.
   */
  ticks: Array<Tick<Date>>;
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
