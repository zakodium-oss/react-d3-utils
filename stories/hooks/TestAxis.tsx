import { ScaleLinear } from 'd3-scale';
import React from 'react';

import { useLinearPrimaryTicks, useLogTicks } from '../../src';

interface BaseAxis {
  x: number;
  y: number;
}
interface ScaleAxis {
  scale: ScaleLinear<number, number>;
  scientificNotation: boolean;
}
interface TickAxis {
  ticks: Ticks[];
}
interface Horizontal {
  width: number;
}
interface Vertical {
  height: number;
}
interface Ticks {
  label: string;
  position: number;
}

type HorizontalAxisProps = BaseAxis & Horizontal & ScaleAxis;
type VerticalAxisProps = BaseAxis & Vertical & ScaleAxis;
type HorizontalRenderProps = BaseAxis & Horizontal & TickAxis;
type VerticalRenderProps = BaseAxis & Vertical & TickAxis;

function HorizontalAxis({ x, y, width, ticks }: HorizontalRenderProps) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <line x2={width} y1={15} y2={15} stroke="black" />
      {ticks.map(({ label, position }, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <g key={index + label + position}>
          <line x1={position} x2={position} y1={10} y2={15} stroke="black" />
          <text x={position} dominantBaseline="middle" textAnchor="middle">
            {label}
          </text>
        </g>
      ))}
    </g>
  );
}
export function LinearHorizontalAxis(props: HorizontalAxisProps) {
  const { scale, scientificNotation, ...other } = props;
  const ticks = useLinearPrimaryTicks(scale, 'horizontal', {
    scientificNotation,
  });
  return <HorizontalAxis {...other} ticks={ticks} />;
}
export function LogHorizontalAxis(props: HorizontalAxisProps) {
  const { scale, scientificNotation, ...other } = props;
  const ticks = useLogTicks(scale, 'horizontal', {
    scientificNotation,
  });
  return <HorizontalAxis {...other} ticks={ticks} />;
}

function VerticalAxis({ x, y, height, ticks }: VerticalRenderProps) {
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
export function LinearVerticalAxis(props: VerticalAxisProps) {
  const { scale, scientificNotation, ...other } = props;
  const ticks = useLinearPrimaryTicks(scale, 'vertical', {
    scientificNotation,
  });
  return <VerticalAxis {...other} ticks={ticks} />;
}
export function LogVerticalAxis(props: VerticalAxisProps) {
  const { scale, scientificNotation, ...other } = props;
  const ticks = useLogTicks(scale, 'vertical', {
    scientificNotation,
  });
  return <VerticalAxis {...other} ticks={ticks} />;
}
