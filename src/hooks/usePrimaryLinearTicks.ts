import type { ScaleContinuousNumeric } from 'd3-scale';

type Directions = 'horizontal' | 'vertical';

export interface PrimaryLinearTicks {
  label: string;
  position: number;
}

interface Options {
  tickFormat?: (d: number) => string;
  scientificNotation?: boolean;
  minSpace?: number;
  fontSize?: number;
}

function formatTicks<Scale extends ScaleContinuousNumeric<number, number>>(
  ticks: number[],
  scale: Scale,
  format: (d: number) => string,
): PrimaryLinearTicks[] {
  return ticks.map((val) => ({ label: format(val), position: scale(val) }));
}

export function usePrimaryLinearTicks<
  Scale extends ScaleContinuousNumeric<number, number>
>(
  scale: Scale,
  direction: Directions,
  options: Options = {},
): PrimaryLinearTicks[] {
  const range = scale.range();
  if (!range) throw new Error('Range needs to be specified');

  const {
    scientificNotation = false,
    minSpace = 16,
    fontSize = 16,
    tickFormat = scientificNotation
      ? (x) => x.toExponential(2)
      : (x) => JSON.stringify(x),
  } = options;

  const axisLength = Math.abs(range[0] - range[1]);

  // Calculates the first paint density
  const defaultTicks = scale.ticks();
  const defaultLabels = defaultTicks.map(tickFormat);

  const defaultLenght =
    direction === 'horizontal'
      ? defaultLabels.reduce(
          (acc, curr) => acc + minSpace + (fontSize / 2) * curr.length,
          -1 * minSpace,
        )
      : defaultLabels.length * (fontSize + minSpace) - minSpace;

  // Checks if the space is clear enought
  const defaultNumTicks = defaultTicks.length;
  if (axisLength >= defaultLenght || defaultNumTicks < 2) {
    return formatTicks(defaultTicks, scale, tickFormat);
  }

  // Gets number of ticks
  const numTicks = Math.floor((defaultNumTicks * axisLength) / defaultLenght);
  const calculatedTicks = scale.ticks(numTicks);
  return formatTicks(calculatedTicks, scale, tickFormat);
}
