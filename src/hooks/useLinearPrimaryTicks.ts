import type { ScaleContinuousNumeric } from 'd3-scale';
import { MutableRefObject, useState } from 'react';

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
  const [ticks, setTicks] = useState<number[]>([]);
  const { tickFormat = String } = options;
  useTicks<number, ScaleContinuousNumeric<number, number>>(
    scale,
    direction,
    ref,
    { ...options, tickFormat, setTicks },
  );
  return ticks.map((value) => ({
    label: tickFormat(value),
    position: scale(value),
    value,
  }));
}
