import { ScaleLinear } from 'd3-scale';
import React, { forwardRef, MutableRefObject, useRef } from 'react';

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
  ref: MutableRefObject<SVGGElement | null>;
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

const HorizontalAxis = forwardRef<SVGGElement | null, HorizontalRenderProps>(
  ({ x, y, width, ticks }, ref) => (
    <g ref={ref} transform={`translate(${x}, ${y})`}>
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
  ),
);
export function LinearHorizontalAxis(props: HorizontalAxisProps) {
  const { scale, scientificNotation, ...other } = props;
  const ref = useRef<SVGGElement>(null);
  const ticks = useLinearPrimaryTicks(scale, 'horizontal', ref, {
    scientificNotation,
  });
  return <HorizontalAxis {...other} ticks={ticks} ref={ref} />;
}
export function LogHorizontalAxis(props: HorizontalAxisProps) {
  const { scale, scientificNotation, ...other } = props;
  const ref = useRef<SVGGElement>(null);
  const ticks = useLogTicks(scale, 'horizontal', ref, {
    scientificNotation,
  });
  return <HorizontalAxis {...other} ticks={ticks} ref={ref} />;
}

const VerticalAxis = forwardRef<SVGGElement | null, VerticalRenderProps>(
  ({ x, y, height, ticks }, ref) => (
    <g ref={ref} transform={`translate(${x}, ${y})`}>
      <line y2={height} x1={15} x2={15} stroke="black" />
      {ticks.map(({ label, position }, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <g key={index + label + position}>
          <line y1={position} y2={position} x1={10} x2={15} stroke="black" />
          <text y={position} dominantBaseline="middle" textAnchor="end">
            {label}
          </text>
        </g>
      ))}
    </g>
  ),
);
export function LinearVerticalAxis(props: VerticalAxisProps) {
  const { scale, scientificNotation, ...other } = props;
  const ref = useRef<SVGGElement>(null);
  const ticks = useLinearPrimaryTicks(scale, 'vertical', ref, {
    scientificNotation,
  });
  return <VerticalAxis {...other} ticks={ticks} ref={ref} />;
}
export function LogVerticalAxis(props: VerticalAxisProps) {
  const { scale, scientificNotation, ...other } = props;
  const ref = useRef<SVGGElement>(null);
  const ticks = useLogTicks(scale, 'vertical', ref, {
    scientificNotation,
  });
  return <VerticalAxis {...other} ticks={ticks} ref={ref} />;
}
