import { Meta } from '@storybook/react';
import { ScaleLogarithmic, scaleLog } from 'd3-scale';
import { useEffect, useState } from 'react';

import { LogHorizontalAxis, LogVerticalAxis } from './TestAxis';

export default {
  title: 'Hooks/static/useLogTicks',
} as Meta;

const MIN = 50;
const MAX = 500;

interface HorizontalState {
  scale: ScaleLogarithmic<number, number>;
  width: number;
}
interface VerticalState {
  scale: ScaleLogarithmic<number, number>;
  height: number;
}
interface ExampleProps {
  domain: [number, number];
  scientificNotation: boolean;
}

function HorizontalExample({ domain, scientificNotation }: ExampleProps) {
  const [state, setState] = useState<HorizontalState[]>([]);

  useEffect(() => {
    let state = [];
    for (let i = MIN; i <= MAX; i += 50) {
      const scale = scaleLog().range([0, i]).domain(domain);
      state.push({ scale, width: i });
    }
    setState(state);
  }, [domain, scientificNotation]);

  return (
    <div>
      <svg style={{ overflow: 'visible' }} width={600} height={600}>
        {state.map(({ scale, width }) => (
          <LogHorizontalAxis
            key={width}
            x={10}
            y={width - 40}
            scale={scale}
            scientificNotation={scientificNotation}
            width={width}
          />
        ))}
      </svg>
    </div>
  );
}

export function HorizontalCentaines() {
  return <HorizontalExample domain={[10, 100000]} scientificNotation={false} />;
}
HorizontalCentaines.storyName = 'Horizontal positive powers';

export function HorizontalDecimals() {
  return (
    <HorizontalExample domain={[0.0000001, 100]} scientificNotation={false} />
  );
}
HorizontalDecimals.storyName = 'Horizontal negative values';

export function HorizontalScientificCentaines() {
  return <HorizontalExample domain={[10, 100000]} scientificNotation />;
}
HorizontalScientificCentaines.storyName =
  'Horizontal scientific positive powers';

export function HorizontalScientificDecimals() {
  return <HorizontalExample domain={[0.0000001, 100]} scientificNotation />;
}
HorizontalScientificDecimals.storyName =
  'Horizontal scientific negative values';

function VerticalExample({ domain, scientificNotation }: ExampleProps) {
  const [state, setState] = useState<VerticalState[]>([]);

  useEffect(() => {
    let state = [];
    for (let i = MIN; i <= MAX; i += 50) {
      const scale = scaleLog().range([i, 0]).domain(domain);
      state.push({ scale, height: i });
    }
    setState(state);
  }, [domain, scientificNotation]);

  return (
    <div>
      <svg style={{ overflow: 'visible' }} width={600} height={600}>
        {state.map(({ scale, height }) => (
          <LogVerticalAxis
            key={height}
            x={height * 2 - 40}
            y={10}
            scale={scale}
            scientificNotation={scientificNotation}
            height={height}
          />
        ))}
      </svg>
    </div>
  );
}

export function VerticalCentaines() {
  return <VerticalExample domain={[10, 100000]} scientificNotation={false} />;
}
VerticalCentaines.storyName = 'Vertical positive powers';

export function VerticalDecimals() {
  return (
    <VerticalExample domain={[0.0000001, 100]} scientificNotation={false} />
  );
}
VerticalDecimals.storyName = 'Vertical negative values';

export function VerticalScientificCentaines() {
  return <VerticalExample domain={[10, 100000]} scientificNotation />;
}
VerticalScientificCentaines.storyName = 'Vertical scientific positive powers';

export function VerticalScientificDecimals() {
  return <VerticalExample domain={[0.0000001, 100]} scientificNotation />;
}
VerticalScientificDecimals.storyName = 'Vertical scientific negative values';
