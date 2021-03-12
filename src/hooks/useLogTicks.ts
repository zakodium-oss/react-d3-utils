import type { ScaleContinuousNumeric } from 'd3-scale';
import { MutableRefObject, useEffect, useState } from 'react';

import { textDimentions } from '../utils';

type Directions = 'horizontal' | 'vertical';

export interface PrimaryLogTicks {
  label: string;
  position: number;
}

interface Options {
  tickFormat?: (d: number) => string;
  scientificNotation?: boolean;
  minSpace?: number;
}

const TEST_HEIGHT = '+1234567890';

function isMainTick(value: number): number {
  const index = value / Math.pow(10, Math.round(Math.log10(value)));
  return index < 1 ? index * 10 : index;
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
  const wordsBetweenTicks = Math.floor(mainTickSpace / maxWordSpace);
  const mainTicksStep = Math.floor((maxWordSpace + minSpace) / mainTickSpace);

  let mainTickCounter = 0;
  return ticks.map((val) => {
    const position = scale(val);
    let label = '';
    if (wordsBetweenTicks === 0 && isMainTick(val) === 1) {
      label = mainTickCounter === 0 ? format(val) : '';
      mainTickCounter = (mainTickCounter + 1) % mainTicksStep;
    } else if (isMainTick(val) <= wordsBetweenTicks) {
      label = format(val);
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
  const [fontSize, setFontSize] = useState(40);

  const range = scale.range();
  if (!range) throw new Error('Range needs to be specified');

  const domain = scale.domain();
  if (!domain) throw new Error('Domain needs to be specified');

  const {
    scientificNotation = false,
    minSpace = 16,
    tickFormat = scientificNotation
      ? (x) => x.toExponential(2)
      : (x) => JSON.stringify(x),
  } = options;

  // Calculates the word density
  useEffect(() => {
    if (ref.current) {
      if (direction === 'horizontal') {
        const minFormated = tickFormat(domain[0]);
        const maxFormated = tickFormat(domain[1]);
        const maxLenWord =
          minFormated.length > maxFormated.length ? minFormated : maxFormated;
        const { width } = textDimentions(maxLenWord, ref);
        setFontSize(Math.ceil(width));
      } else {
        const { height } = textDimentions(TEST_HEIGHT, ref);
        setFontSize(Math.ceil(height));
      }
    }
  }, [direction, domain, tickFormat, ref]);

  // Calculates the first paint density
  const defaultTicks = scale.ticks();
  return formatTicks(defaultTicks, scale, tickFormat, fontSize, minSpace);
}
