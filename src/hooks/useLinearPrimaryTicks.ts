import type { ScaleContinuousNumeric } from 'd3-scale';
import { MutableRefObject, useEffect, useState } from 'react';

import { textDimentions } from '../utils';

type Directions = 'horizontal' | 'vertical';

export interface PrimaryLinearTicks {
  label: string;
  position: number;
}

interface Options {
  tickFormat?: (d: number) => string;
  scientificNotation?: boolean;
  minSpace?: number;
}

const TEST_HEIGHT = '+1234567890';

function formatTicks<Scale extends ScaleContinuousNumeric<number, number>>(
  ticks: number[],
  scale: Scale,
  format: (d: number) => string,
): PrimaryLinearTicks[] {
  return ticks.map((val) => ({ label: format(val), position: scale(val) }));
}

export function useLinearPrimaryTicks<
  Scale extends ScaleContinuousNumeric<number, number>
>(
  scale: Scale,
  direction: Directions,
  ref: MutableRefObject<SVGGElement | null>,
  options: Options = {},
): PrimaryLinearTicks[] {
  const [fontSize, setFontSize] = useState(8);
  const range = scale.range();
  if (!range) throw new Error('Range needs to be specified');

  const domain = scale.domain();
  if (!domain) throw new Error('Domain needs to be specified');
  const {
    scientificNotation = false,
    minSpace = 4,
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
        setFontSize(Math.ceil(width / maxLenWord.length));
      } else {
        const { height } = textDimentions(TEST_HEIGHT, ref);
        setFontSize(Math.ceil(height));
      }
    }
  }, [direction, domain, tickFormat, ref]);

  const defaultTicks = scale.ticks();
  const defaultLabels = defaultTicks.map(tickFormat);

  const defaultLenght =
    direction === 'horizontal'
      ? defaultLabels.reduce(
          (acc, curr) => acc + minSpace + fontSize * curr.length,
          -1 * minSpace,
        )
      : defaultLabels.length * (fontSize + minSpace) - minSpace;

  // Checks if the space is clear enought
  const defaultNumTicks = defaultTicks.length;
  const axisLength = Math.abs(range[0] - range[1]);
  if (axisLength >= defaultLenght || defaultNumTicks < 2) {
    return formatTicks(defaultTicks, scale, tickFormat);
  }

  // Gets number of ticks
  const numTicks = Math.floor((defaultNumTicks * axisLength) / defaultLenght);
  const calculatedTicks = scale.ticks(Math.max(2, numTicks - 1));
  return formatTicks(calculatedTicks, scale, tickFormat);
}
