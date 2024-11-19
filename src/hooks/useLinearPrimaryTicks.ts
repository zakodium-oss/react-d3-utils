import type { ScaleContinuousNumeric } from 'd3-scale';
import { type MutableRefObject, useState } from 'react';

import { type Ticks, useTicks } from './useTick.js';

type Directions = 'horizontal' | 'vertical';

export interface PrimaryLinearTicks {
  label: string;
  position: number;
  value: number;
}

export interface UseLinearPrimaryTicksResult {
  scale: ScaleContinuousNumeric<number, number>;
  ticks: Array<Ticks<number>>;
}

interface Options {
  tickFormat?: (d: number) => string;
  minSpace?: number;
}

export function useLinearPrimaryTicks(
  scale: ScaleContinuousNumeric<number, number>,
  direction: Directions,
  ref: MutableRefObject<SVGGElement | null>,
  options: Options = {},
): UseLinearPrimaryTicksResult {
  const [ticks, setTicks] = useState<UseLinearPrimaryTicksResult>(() => ({
    ticks: [],
    scale,
  }));
  const { tickFormat = String } = options;
  useTicks<number>(scale, direction, ref, { ...options, tickFormat, setTicks });
  return ticks;
}
