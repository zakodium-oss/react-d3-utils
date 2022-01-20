import {
  ScaleLinear,
  scaleLinear,
  scaleLog,
  ScaleLogarithmic,
  scaleTime,
  ScaleTime,
} from 'd3-scale';
import { useEffect, useState, useMemo } from 'react';

import { HorizontalAxis, VerticalAxis } from './TestAxis';

const MIN = 50;
const MAX = 500;
type Scales =
  | ScaleLinear<number, number>
  | ScaleTime<number, number>
  | ScaleLogarithmic<number, number>;
interface HorizontalState {
  scale: Scales;
  width: number;
}
interface VerticalState {
  scale: Scales;
  height: number;
}
interface ExampleProps {
  domain: [number | Date, number | Date];
  type: 'linear' | 'log' | 'time';
  scientificNotation?: boolean;
}
interface VerticalOrientation {
  orientation?: 'left' | 'right';
}

interface HorizontalOrientation {
  orientation?: 'top' | 'bottom';
}
export function HorizontalExample({
  domain,
  scientificNotation = false,
  orientation,
  type,
}: ExampleProps & HorizontalOrientation) {
  const [state, setState] = useState<HorizontalState[]>([]);
  const scaleType = useMemo(() => {
    switch (type) {
      case 'linear':
        return (i: number) => scaleLinear().range([0, i]).domain(domain);
      case 'log':
        return (i: number) => scaleLog().range([0, i]).domain(domain);
      case 'time':
        return (i: number) => scaleTime().range([0, i]).domain(domain);
      default:
        throw Error('type error');
    }
  }, [domain, type]);
  useEffect(() => {
    let state = [];
    for (let i = MIN; i <= MAX; i += 50) {
      const scale = scaleType(i);
      state.push({ scale, width: i });
    }
    setState(state);
  }, [domain, scaleType, scientificNotation]);

  return (
    <div>
      <svg style={{ overflow: 'visible' }} width={600} height={600}>
        {state.map(({ scale, width }) => (
          <HorizontalAxis
            orientation={orientation}
            key={width}
            x={10}
            y={width - 40}
            scale={scale}
            scientificNotation={scientificNotation}
            width={width}
            type={type}
          />
        ))}
      </svg>
    </div>
  );
}
export function VerticalExample({
  domain,
  scientificNotation,
  orientation,
  type,
}: ExampleProps & VerticalOrientation) {
  const [state, setState] = useState<VerticalState[]>([]);
  const scaleType = useMemo(() => {
    switch (type) {
      case 'linear':
        return (i: number) => scaleLinear().range([0, i]).domain(domain);
      case 'log':
        return (i: number) => scaleLog().range([0, i]).domain(domain);
      case 'time':
        return (i: number) => scaleTime().range([0, i]).domain(domain);
      default:
        throw Error('type error');
    }
  }, [domain, type]);
  useEffect(() => {
    let state = [];
    for (let i = MIN; i <= MAX; i += 50) {
      const scale = scaleType(i);
      state.push({ scale, height: i });
    }
    setState(state);
  }, [domain, scaleType, scientificNotation]);

  return (
    <div>
      <svg style={{ overflow: 'visible' }} width={600} height={600}>
        {state.map(({ scale, height }) => (
          <VerticalAxis
            orientation={orientation}
            key={height}
            x={height * 2 - 40}
            y={10}
            scale={scale}
            scientificNotation={scientificNotation}
            height={height}
            type={type}
          />
        ))}
      </svg>
    </div>
  );
}
