import type { ScaleContinuousNumeric } from 'd3-scale';
import { MutableRefObject } from 'react';

import { useTicks } from './useTick';

type Directions = 'horizontal' | 'vertical';

export interface PrimaryLinearTicks {
  label: string;
  position: number;
  value: number;
}

interface Options {
  tickFormat?: (d: number) => string;
  minSpace?: number;
}

export function useLinearPrimaryTicks<
  Scale extends ScaleContinuousNumeric<number, number>,
>(
  scale: Scale,
  direction: Directions,
  ref: MutableRefObject<SVGGElement | null>,
  options: Options = {},
): PrimaryLinearTicks[] {
  const { tickFormat = (x) => String(x) } = options;
  options.tickFormat = tickFormat;
  const ticks = useTicks<number, ScaleContinuousNumeric<number, number>>(
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
