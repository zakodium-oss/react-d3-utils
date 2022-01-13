import type { ScaleContinuousNumeric } from 'd3-scale';
import { MutableRefObject, useEffect, useMemo, useState } from 'react';

import { textDimensions } from '../utils';

type Directions = 'horizontal' | 'vertical';

export interface TimeTicks {
  label: string;
  position: number;
  value: number;
}

interface Options {
  tickFormat?: (d: number) => string;
  minSpace?: number;
}

const TEST_HEIGHT = '+1234567890';

export function useTimeTicks<
  Scale extends ScaleContinuousNumeric<number, number>,
>(
  scale: Scale,
  direction: Directions,
  ref: MutableRefObject<SVGGElement | null>,
  options: Options = {},
): TimeTicks[] {
  const [ticks, setTicks] = useState<number[]>([]);

  const range = scale.range();
  if (!range) throw new Error('Range needs to be specified');

  const domain = scale.domain();
  if (!domain) throw new Error('Domain needs to be specified');

  const { minSpace = 8 } = options;
  const format = options?.tickFormat;
  const tickFormat = useMemo(
    () => (format ? (x: number) => format(x) : scale.tickFormat()),
    [format, scale],
  );

  const axisLength = Math.abs(range[0] - range[1]);

  // Calculates the tick number that fits in the given space
  useEffect(() => {
    if (ref.current) {
      let tickNumber: number | undefined;
      let ticks: number[] = [];

      if (direction === 'horizontal') {
        while (true) {
          // get next ticks
          ticks = scale.ticks(tickNumber);
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
        while (true) {
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
  }, [axisLength, direction, minSpace, ref, scale, tickFormat]);

  return ticks.map((value) => ({
    label: tickFormat(value),
    position: scale(value),
    value,
  }));
}
