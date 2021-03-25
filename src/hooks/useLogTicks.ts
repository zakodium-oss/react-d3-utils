import type { ScaleContinuousNumeric } from 'd3-scale';
import { MutableRefObject, useEffect, useMemo, useState } from 'react';

import { textDimensions } from '../utils';

type Directions = 'horizontal' | 'vertical';

export interface PrimaryLogTicks {
  label: string;
  position: number;
}

interface Options {
  tickFormat?: (d: number) => string;
  minSpace?: number;
}

const TEST_HEIGHT = '+1234567890';

function isMainTick(value: number): number {
  const index = value / Math.pow(10, Math.round(Math.log10(value)));
  return Math.floor(index < 1 ? index * 10 : index);
}

function formatTicks<Scale extends ScaleContinuousNumeric<number, number>>(
  ticks: number[],
  scale: Scale,
  format: (d: number) => string,
  maxWordSpace: number,
  minSpace: number,
): PrimaryLogTicks[] {
  const scaledTicks = ticks.filter((val) => isMainTick(val) === 1).map(scale);
  const mainTickSpace = Math.abs(scaledTicks[0] - scaledTicks[1]);
  const mainTickRatio = (maxWordSpace + minSpace) / mainTickSpace;
  const mainTicksStep = mainTickRatio >= 1 ? Math.ceil(mainTickRatio) : 1;

  let mainTickCounter = 0;
  return ticks.map((val) => {
    const position = scale(val);
    let label = '';
    if (isMainTick(val) === 1) {
      label = mainTickCounter === 0 ? format(val) : '';
      mainTickCounter = (mainTickCounter + 1) % mainTicksStep;
    }
    return { label, position };
  });
}

export function useLogTicks<
  Scale extends ScaleContinuousNumeric<number, number>
>(
  scale: Scale,
  direction: Directions,
  ref: MutableRefObject<SVGGElement | null>,
  options: Options = {},
): PrimaryLogTicks[] {
  const [maxStrSize, setMaxStrSize] = useState(40);

  const range = scale.range();
  if (!range) throw new Error('Range needs to be specified');

  const domain = scale.domain();
  if (!domain) throw new Error('Domain needs to be specified');

  const { minSpace = 5, tickFormat = (x) => JSON.stringify(x) } = options;
  const ticks = useMemo(() => scale.ticks(), [scale]);

  // Calculates the word density
  useEffect(() => {
    if (ref.current) {
      if (direction === 'horizontal') {
        const maxLenWord = ticks
          .filter((val) => isMainTick(val) === 1)
          .map(tickFormat)
          .reduce((acc, curr) => (acc.length < curr.length ? curr : acc), '');
        const { width } = textDimensions(maxLenWord, ref);
        setMaxStrSize(Math.ceil(width));
      } else {
        const { height } = textDimensions(TEST_HEIGHT, ref);
        setMaxStrSize(Math.ceil(height));
      }
    }
  }, [direction, domain, tickFormat, ref, ticks]);

  // Calculates the first paint density
  return formatTicks(ticks, scale, tickFormat, maxStrSize, minSpace);
}
