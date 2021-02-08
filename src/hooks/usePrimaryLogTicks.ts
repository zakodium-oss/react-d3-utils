import type { ScaleContinuousNumeric } from 'd3-scale';

type Directions = 'horizontal' | 'vertical';

export interface PrimaryLogTicks {
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
): PrimaryLogTicks[] {
  const mapper = (val: number, index: number) => {
    const position = scale(val);
    const label =
      index + 1 < ticks.length && scale(ticks[index + 1]) - position < 16
        ? ''
        : format(val);
    return { label, position };
  };
  return ticks.map(mapper);
}

export function usePrimaryLogTicks<
  Scale extends ScaleContinuousNumeric<number, number>
>(
  scale: Scale,
  direction: Directions,
  options: Options = {},
): PrimaryLogTicks[] {
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
  let defaultLenght =
    direction === 'horizontal'
      ? (fontSize / 2) * tickFormat(defaultTicks[0]).length
      : fontSize;

  for (let i = 1; i < defaultTicks.length; i++) {
    const wordLength =
      direction === 'horizontal'
        ? (fontSize / 2) * tickFormat(defaultTicks[i]).length
        : fontSize;
    const minDistance = Math.max(
      minSpace,
      scale(defaultTicks[i]) - scale(defaultTicks[i - 1]) - wordLength,
    );
    defaultLenght += wordLength + minDistance;
  }

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
