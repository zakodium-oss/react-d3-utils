import { ScaleLinear } from 'd3-scale';
import React from 'react';

import { useLinearPrimaryTicks } from '../../src';

interface AxisProps {
  x: number;
  y: number;
  scale: ScaleLinear<number, number>;
  scientificNotation: boolean;
}
interface HorizontalAxisProps extends AxisProps {
  width: number;
}
interface VerticalAxisProps extends AxisProps {
  height: number;
}

export function HorizontalAxis({
  x,
  y,
  width,
  scale,
  scientificNotation,
}: HorizontalAxisProps) {
  const ticks = useLinearPrimaryTicks(scale, 'horizontal', {
    scientificNotation,
  });
  return (
    <g transform={`translate(${x}, ${y})`}>
      <line x2={width} y1={15} y2={15} stroke="black" />
      {ticks.map(({ label, position }) => (
        <g key={label}>
          <line x1={position} x2={position} y1={10} y2={15} stroke="black" />
          <text x={position} dominantBaseline="middle" textAnchor="middle">
            {label}
          </text>
        </g>
      ))}
    </g>
  );
}
export function VerticalAxis({
  x,
  y,
  height,
  scale,
  scientificNotation,
}: VerticalAxisProps) {
  const ticks = useLinearPrimaryTicks(scale, 'vertical', {
    scientificNotation,
  });
  return (
    <g transform={`translate(${x}, ${y})`}>
      <line y2={height} x1={15} x2={15} stroke="black" />
      {ticks.map(({ label, position }) => (
        <g key={label}>
          <line y1={position} y2={position} x1={10} x2={15} stroke="black" />
          <text y={position} dominantBaseline="middle" textAnchor="end">
            {label}
          </text>
        </g>
      ))}
    </g>
  );
}
