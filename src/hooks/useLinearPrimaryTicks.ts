import type { ScaleContinuousNumeric } from 'd3-scale';
import { type MutableRefObject, useState } from 'react';

import { useTicks } from './useTick.js';

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

export function useLinearPrimaryTicks(
  scale: ScaleContinuousNumeric<number, number>,
  direction: Directions,
  ref: MutableRefObject<SVGGElement | null>,
  options: Options = {},
): PrimaryLinearTicks[] {
  const [ticks, setTicks] = useState<PrimaryLinearTicks[]>([]);
  const { tickFormat = String } = options;
  useTicks<number>(scale, direction, ref, { ...options, tickFormat, setTicks });
  return ticks;
}
