import type { Meta } from '@storybook/react';
import { type ScaleContinuousNumeric, scaleLinear } from 'd3-scale';
import React, { forwardRef, useRef, useState } from 'react';

import type { Ticks } from '../../src/hooks/useTick.js';
import {
  type PrimaryLinearTicks,
  useLinearPrimaryTicks,
} from '../../src/index.js';

export default {
  title: 'Hooks/Advanced Ticks',
} as Meta;

const LARGE_RANGE = [0, 600];
const SMALL_RANGE = [0, 40];
const DOMAIN_LARGE = [0, 100];
const DOMAIN_SMALL = [50, 50.0001];

export function AdvancedCustomTicks() {
  const ref = useRef<SVGGElement>(null);
  const [range, setRange] = useState(LARGE_RANGE);
  const [domain, setDomain] = useState(DOMAIN_LARGE);
  const scale = scaleLinear().range(range).domain(domain);
  const primaryTicks = useLinearPrimaryTicks(scale, 'horizontal', ref);
  const ticks = computeLinearTicks(primaryTicks.ticks, primaryTicks.scale);

  return (
    <div>
      <svg
        width={range[1]}
        height={100}
        style={{ margin: 40, overflow: 'visible' }}
      >
        <HorizontalAxis ref={ref} x={0} y={50} width={range[1]} ticks={ticks} />
      </svg>
      <div style={{ display: 'flex', gap: 2 }}>
        <button type="button" onClick={() => setDomain(DOMAIN_SMALL)}>
          Zoom in
        </button>
        <button type="button" onClick={() => setDomain(DOMAIN_LARGE)}>
          Zoom out
        </button>
      </div>
      <div style={{ display: 'flex', gap: 2 }}>
        <button type="button" onClick={() => setRange(SMALL_RANGE)}>
          Small
        </button>
        <button type="button" onClick={() => setRange(LARGE_RANGE)}>
          Large
        </button>
      </div>
    </div>
  );
}

interface Tick extends Ticks<number> {
  size: number;
}

function computeLinearTicks(
  primaryTicks: PrimaryLinearTicks[],
  xAccessor: ScaleContinuousNumeric<number, number>,
  options: {
    noSecondaryTicks?: boolean;
    primaryTickSize?: number;
    secondaryTickSize?: number;
  } = {},
): Tick[] {
  const viewport = xAccessor.domain();
  const ticks: Tick[] = [];
  const {
    noSecondaryTicks = false,
    primaryTickSize = 9,
    secondaryTickSize = 6,
  } = options;
  if (primaryTicks.length < 2 || noSecondaryTicks) {
    return primaryTicks.map((primaryTick) => ({
      label: primaryTick.label,
      size: primaryTickSize,
      value: primaryTick.value,
      position: primaryTick.position,
    }));
  }

  const firstPrimaryTick = primaryTicks[0];
  const secondPrimaryTick = primaryTicks[1];
  const lastPrimaryTick = primaryTicks.at(-1);
  assert(firstPrimaryTick);
  assert(secondPrimaryTick);
  assert(lastPrimaryTick);
  const offsetStart = firstPrimaryTick.value - viewport[0];
  const offsetEnd = viewport[1] - lastPrimaryTick.value;
  const xInterval = secondPrimaryTick.value - firstPrimaryTick.value;

  let nSubTicks = 5;
  if (xInterval % 30 === 0 || xInterval % 15 === 0) nSubTicks = 3;
  else if (xInterval % 10 === 0) nSubTicks = 10;
  else if (xInterval % 5 === 0) nSubTicks = 5;

  if (xInterval <= 1) {
    nSubTicks = 2;
  }

  const nStart = Math.floor((offsetStart / xInterval) * nSubTicks);
  const nEnd = Math.floor((offsetEnd / xInterval) * nSubTicks);
  for (
    let n = -nStart;
    n < (primaryTicks.length - 1) * nSubTicks + nEnd + 1;
    n++
  ) {
    const isPrimaryTick = n % nSubTicks === 0;
    const primaryTickIndex = isPrimaryTick ? n / nSubTicks : -1;
    const value = firstPrimaryTick.value + n * (xInterval / nSubTicks);
    ticks.push({
      value,
      position: xAccessor(value),
      label: primaryTicks[primaryTickIndex]?.label ?? null,
      size: n % nSubTicks === 0 ? primaryTickSize : secondaryTickSize,
    });
  }
  return ticks;
}

function assert(value: unknown, message?: string): asserts value {
  if (!value) {
    throw new Error(`unreachable${message ? `: ${message}` : ''}`);
  }
}

interface HorizontalAxisProps {
  x: number;
  y: number;
  width: number;
  ticks: Tick[];
}

const HorizontalAxis = forwardRef<SVGGElement | null, HorizontalAxisProps>(
  ({ x, y, width, ticks }, ref) => (
    <g ref={ref} transform={`translate(${x}, ${y})`}>
      <line x2={width} y1={-15} y2={-15} stroke="black" />
      {ticks.map(({ label, position }) => (
        <g key={position}>
          <line x1={position} x2={position} y1={-10} y2={-15} stroke="black" />
          <text x={position} dominantBaseline="middle" textAnchor="middle">
            {label}
          </text>
        </g>
      ))}
    </g>
  ),
);
