import type { ScaleContinuousNumeric, ScaleTime } from 'd3-scale';
import { useEffect } from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';

import { textDimensions } from '../utils.js';

type Directions = 'horizontal' | 'vertical';

export interface Tick<T> {
  /**
   * The formatted label of the tick.
   */
  label: string;
  /**
   * The position in pixel of the tick on the axis.
   */
  position: number;
  /*
   * The untransformed value of the tick in its original format.
   */
  value: T;
}

interface UseTicksResult<T extends number | Date> {
  scale: T extends number
    ? ScaleContinuousNumeric<number, number>
    : ScaleTime<number, number>;
  ticks: Array<Tick<T>>;
}

interface Options<T extends number | Date> {
  tickFormat: (d: T) => string;
  setTicks: Dispatch<SetStateAction<UseTicksResult<T>>>;
  minSpace?: number;
}
const TEST_HEIGHT = '+1234567890';

export function useTicks<T extends number | Date>(
  scale: T extends number
    ? ScaleContinuousNumeric<number, number>
    : ScaleTime<number, number>,
  direction: Directions,
  ref: MutableRefObject<SVGGElement | null>,
  options: Options<T>,
) {
  const range = scale.range();
  if (!range) throw new Error('Range needs to be specified');

  const domain = scale.domain();
  if (!domain) throw new Error('Domain needs to be specified');
  const { minSpace = 8, tickFormat, setTicks } = options;
  const axisLength = Math.abs(range[0] - range[1]);

  // Calculates the tick number that fits in the given space
  useEffect(() => {
    if (ref.current) {
      let tickNumber: number | undefined;
      let ticks: T[] = [];

      if (direction === 'horizontal') {
        while (true) {
          // get next ticks
          ticks = scale.ticks(tickNumber) as T[];
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
      } else {
        const { height } = textDimensions(TEST_HEIGHT, ref);
        while (true) {
          // get next ticks
          ticks = scale.ticks(tickNumber) as T[];
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
      }

      setTicks({
        ticks: ticks.map((value) => ({
          label: tickFormat(value),
          position: scale(value),
          value,
        })),
        scale,
      });
    }
  }, [axisLength, direction, minSpace, ref, scale, setTicks, tickFormat]);
}
