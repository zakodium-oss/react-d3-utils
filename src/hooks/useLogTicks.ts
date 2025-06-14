import type { ScaleContinuousNumeric } from 'd3-scale';
import type { RefObject } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { textDimensions } from '../utils.js';

type Directions = 'horizontal' | 'vertical';

export interface PrimaryLogTicks {
  label: string;
  position: number;
  value: number;
}

interface Options {
  tickFormat?: (d: number) => string;
  minSpace?: number;
}

const TEST_HEIGHT = '+1234567890';

function isMainTick(value: number): number {
  const index = value / 10 ** Math.round(Math.log10(value));
  return Math.floor(index < 1 ? index * 10 : index);
}

function formatTicks(
  ticks: number[],
  scale: ScaleContinuousNumeric<number, number>,
  format: (d: number) => string,
  maxWordSpace: number,
  minSpace: number,
): PrimaryLogTicks[] {
  const scaledTicks = ticks.filter((val) => isMainTick(val) === 1).map(scale);
  const mainTickSpace = Math.abs(
    // TODO: `scaledTicks` might not have a length >1
    (scaledTicks[0] as number) - (scaledTicks[1] as number),
  );
  const mainTickRatio = (maxWordSpace + minSpace) / mainTickSpace;
  const mainTicksStep = mainTickRatio >= 1 ? Math.ceil(mainTickRatio) : 1;

  let mainTickCounter = 0;
  return ticks.map((value) => {
    const position = scale(value);
    let label = '';
    if (isMainTick(value) === 1) {
      label = mainTickCounter === 0 ? format(value) : '';
      mainTickCounter = (mainTickCounter + 1) % mainTicksStep;
    }
    return { label, position, value };
  });
}

export function useLogTicks(
  scale: ScaleContinuousNumeric<number, number>,
  direction: Directions,
  ref: RefObject<SVGGElement | null>,
  options: Options = {},
): PrimaryLogTicks[] {
  const [maxStrSize, setMaxStrSize] = useState(40);

  const range = scale.range();
  if (!range) throw new Error('Range needs to be specified');

  const domain = scale.domain();
  if (!domain) throw new Error('Domain needs to be specified');

  const { minSpace = 8 } = options;
  const format = options?.tickFormat;
  const tickFormat = useCallback(
    (x: number) => (format ? format(x) : String(x)),
    [format],
  );
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
