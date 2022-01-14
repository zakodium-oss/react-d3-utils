import { Meta } from '@storybook/react';
import { ScaleLinear, scaleLinear } from 'd3-scale';
import { useEffect, useState } from 'react';

import { TimeHorizontalAxis, TimeVerticalAxis } from './TestAxis';

export default {
  title: 'Hooks/static/useTimeTicks',
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
  domain: [Date | number, Date | number];
}
interface VerticalOrientation {
  orientation?: 'left' | 'right';
}

interface HorizontalOrientation {
  orientation?: 'top' | 'bottom';
}
function HorizontalExample({
  domain,
  orientation,
}: ExampleProps & HorizontalOrientation) {
  const [state, setState] = useState<HorizontalState[]>([]);

  useEffect(() => {
    let state: HorizontalState[] = [];
    for (let i = MIN; i <= MAX; i += 50) {
      const scale = scaleLinear().range([0, i]).domain(domain);
      state.push({ scale, width: i });
    }
    setState(state);
  }, [domain]);

  return (
    <div>
      <svg style={{ overflow: 'visible' }} width={600} height={600}>
        {state.map(({ scale, width }) => (
          <TimeHorizontalAxis
            orientation={orientation}
            key={width}
            x={10}
            y={width - 40}
            scale={scale}
            width={width}
          />
        ))}
      </svg>
    </div>
  );
}

export function HorizontalCentaines() {
  return (
    <HorizontalExample
      domain={[new Date(2000, 0, 1, 16), new Date(2000, 0, 1, 17)]}
    />
  );
}
HorizontalCentaines.storyName = 'Horizontal centaines';
export function HorizontalCentainesBottom() {
  return (
    <HorizontalExample
      domain={[new Date(2000, 0, 1, 16), new Date(2000, 0, 1, 17)]}
      orientation="bottom"
    />
  );
}
HorizontalCentainesBottom.storyName = 'Horizontal centaines bottom';

function VerticalExample({
  domain,

  orientation,
}: ExampleProps & VerticalOrientation) {
  const [state, setState] = useState<VerticalState[]>([]);

  useEffect(() => {
    let state = [];
    for (let i = MIN; i <= MAX; i += 50) {
      const scale = scaleLinear().range([i, 0]).domain(domain);
      state.push({ scale, height: i });
    }
    setState(state);
  }, [domain]);

  return (
    <div>
      <svg style={{ overflow: 'visible' }} width={600} height={600}>
        {state.map(({ scale, height }) => (
          <TimeVerticalAxis
            orientation={orientation}
            key={height}
            x={height * 2 - 40}
            y={10}
            scale={scale}
            height={height}
          />
        ))}
      </svg>
    </div>
  );
}

export function VerticalCentaines() {
  return (
    <VerticalExample
      domain={[new Date(2000, 0, 1, 16), new Date(2000, 0, 1, 17)]}
    />
  );
}
VerticalCentaines.storyName = 'Vertical centaines';
export function VerticalCentainesRight() {
  return (
    <VerticalExample
      domain={[new Date(2000, 0, 1, 16), new Date(2000, 0, 1, 17)]}
      orientation="right"
    />
  );
}
VerticalCentainesRight.storyName = 'Vertical centaines right';
