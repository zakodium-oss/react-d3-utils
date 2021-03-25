import type { ScaleContinuousNumeric } from 'd3-scale';
import { MutableRefObject, useEffect, useState } from 'react';

import { textDimensions } from '../utils';

type Directions = 'horizontal' | 'vertical';

export interface PrimaryLinearTicks {
  label: string;
  position: number;
}

interface Options {
  tickFormat?: (d: number) => string;
  minSpace?: number;
}

const TEST_HEIGHT = '+1234567890';
const MAX_ITERATION = 20;

export function useLinearPrimaryTicks<
  Scale extends ScaleContinuousNumeric<number, number>
>(
  scale: Scale,
  direction: Directions,
  ref: MutableRefObject<SVGGElement | null>,
  options: Options = {},
): PrimaryLinearTicks[] {
  const [ticks, setTicks] = useState<number[]>([]);

  const range = scale.range();
  if (!range) throw new Error('Range needs to be specified');

  const domain = scale.domain();
  if (!domain) throw new Error('Domain needs to be specified');

  const { minSpace = 4 } = options;
  const tickFormat = options.tickFormat || ((x) => JSON.stringify(x));

  const axisLength = Math.abs(range[0] - range[1]);

  // Calculates the tick number that fits in the given space
  useEffect(() => {
    if (ref.current) {
      let tickNumber: number | undefined;
      let ticks: number[] = [];

      if (direction === 'horizontal') {
        for (let count = 0; count < MAX_ITERATION; count++) {
          // get next ticks
          ticks = scale.ticks(tickNumber);
          const tickFormat = options.tickFormat || ((x) => JSON.stringify(x));
          const formatedTicks = ticks.map(tickFormat);
          tickNumber = Math.min(ticks.length, tickNumber || Infinity);

          // get the current tick space
          const { width } = textDimensions(formatedTicks.join(''), ref);
          const size = width + (ticks.length - 1) * minSpace;

          // repeats if the size is bigger than current space
          if (size > axisLength && tickNumber > 1) {
            tickNumber = tickNumber - 1;
          } else {
            break;
          }
        }

        setTicks(ticks);
      } else {
        const { height } = textDimensions(TEST_HEIGHT, ref);
        for (let count = 0; count < MAX_ITERATION; count++) {
          // get next ticks
          ticks = scale.ticks(tickNumber);
          tickNumber = Math.min(ticks.length, tickNumber || Infinity);

          // get the current tick space
          const size = ticks.length * (height + minSpace) - minSpace;

          // repeats if the size is bigger than current space
          if (size > axisLength && tickNumber > 1) {
            tickNumber = tickNumber - 1;
          } else {
            break;
          }
        }

        setTicks(ticks);
      }
    }
  }, [axisLength, direction, minSpace, ref, scale, options.tickFormat]);

  return ticks.map((val) => ({ label: tickFormat(val), position: scale(val) }));
}
