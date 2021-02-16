import { Meta } from '@storybook/react';
import { ScaleLinear, scaleLinear } from 'd3-scale';
import { useEffect, useState } from 'react';

import { HorizontalAxis, VerticalAxis } from './TestAxis';

export default {
  title: 'Hooks/useLinearPrimaryTicks',
} as Meta;

const MIN = 50;
const MAX = 500;

interface HorizontalState {
  scale: ScaleLinear<number, number>;
  width: number;
}
interface VerticalState {
  scale: ScaleLinear<number, number>;
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
      const scale = scaleLinear().range([0, i]).domain(domain);
      state.push({ scale, width: i });
    }
    setState(state);
  }, [domain, scientificNotation]);

  return (
    <div>
      <svg style={{ overflow: 'visible' }} width={600} height={600}>
        {state.map(({ scale, width }) => (
          <HorizontalAxis
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
  return <HorizontalExample domain={[-100, 500]} scientificNotation={false} />;
}
HorizontalCentaines.storyName = 'Horizontal centaines';

export function HorizontalDecimals() {
  return (
    <HorizontalExample domain={[-0.0001, 0.00005]} scientificNotation={false} />
  );
}
HorizontalDecimals.storyName = 'Horizontal decimals';

export function HorizontalScientificCentaines() {
  return <HorizontalExample domain={[-100, 500]} scientificNotation />;
}
HorizontalScientificCentaines.storyName = 'Horizontal scientific centaines';

export function HorizontalScientificDecimals() {
  return <HorizontalExample domain={[-0.0001, 0.00005]} scientificNotation />;
}
HorizontalScientificDecimals.storyName = 'Horizontal scientific decimals';

function VerticalExample({ domain, scientificNotation }: ExampleProps) {
  const [state, setState] = useState<VerticalState[]>([]);

  useEffect(() => {
    let state = [];
    for (let i = MIN; i <= MAX; i += 50) {
      const scale = scaleLinear().range([i, 0]).domain(domain);
      state.push({ scale, height: i });
    }
    setState(state);
  }, [domain, scientificNotation]);

  return (
    <div>
      <svg style={{ overflow: 'visible' }} width={600} height={600}>
        {state.map(({ scale, height }) => (
          <VerticalAxis
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
  return <VerticalExample domain={[-100, 500]} scientificNotation={false} />;
}
VerticalCentaines.storyName = 'Vertical centaines';

export function VerticalDecimals() {
  return (
    <VerticalExample domain={[-0.0001, 0.00005]} scientificNotation={false} />
  );
}
VerticalDecimals.storyName = 'Vertical decimals';

export function VerticalScientificCentaines() {
  return <VerticalExample domain={[-100, 500]} scientificNotation />;
}
VerticalScientificCentaines.storyName = 'Vertical scientific centaines';

export function VerticalScientificDecimals() {
  return <VerticalExample domain={[-0.0001, 0.00005]} scientificNotation />;
}
VerticalScientificDecimals.storyName = 'Vertical scientific decimals';
