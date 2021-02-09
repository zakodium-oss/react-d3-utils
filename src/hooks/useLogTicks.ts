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

function isMainTick(value: number): number {
  const index = value / Math.pow(10, Math.round(Math.log10(value)));
  return index < 1 ? index * 10 : index;
}

function formatTicks<Scale extends ScaleContinuousNumeric<number, number>>(
  ticks: number[],
  scale: Scale,
  format: (d: number) => string,
  funcWordSpace: (val: number) => number,
  minSpace: number,
): PrimaryLogTicks[] {
  const maxWordSpace = ticks.reduce(
    (acc, val) => Math.max(acc, funcWordSpace(val)),
    0,
  );
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

  // Function for getting the label space in axis
  const funcWordSpace = (value: number) =>
    direction === 'horizontal'
      ? (fontSize / 1.3) * tickFormat(value).length
      : fontSize * 1.4;

  // Calculates the first paint density
  const defaultTicks = scale.ticks();
  return formatTicks(defaultTicks, scale, tickFormat, funcWordSpace, minSpace);
}
