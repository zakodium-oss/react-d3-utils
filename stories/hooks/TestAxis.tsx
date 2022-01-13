import { ScaleLinear } from 'd3-scale';
import React, { forwardRef, useMemo, useRef } from 'react';

import { useLinearPrimaryTicks, useLogTicks, useTimeTicks } from '../../src';

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
interface HorizontalOrientation {
  orientation?: 'top' | 'bottom';
}
interface Vertical {
  height: number;
}
interface VerticalOrientation {
  orientation?: 'left' | 'right';
}
interface Ticks {
  label: string;
  position: number;
}

type HorizontalAxisProps = BaseAxis & Horizontal & ScaleAxis;
type VerticalAxisProps = BaseAxis & Vertical & ScaleAxis;
type HorizontalRenderProps = BaseAxis & Horizontal & TickAxis;
type VerticalRenderProps = BaseAxis & Vertical & TickAxis;

function toExponential(x: number) {
  return x.toExponential(2);
}

const HorizontalAxisTop = forwardRef<SVGGElement | null, HorizontalRenderProps>(
  ({ x, y, width, ticks }, ref) => (
    <g ref={ref} transform={`translate(${x}, ${y})`}>
      <line x2={width} y1={15} y2={15} stroke="black" />
      {ticks.map(({ label, position }) => (
        <g key={label + position}>
          <line x1={position} x2={position} y1={10} y2={15} stroke="black" />
          <text x={position} dominantBaseline="middle" textAnchor="middle">
            {label}
          </text>
        </g>
      ))}
    </g>
  ),
);
const HorizontalAxisBottom = forwardRef<
  SVGGElement | null,
  HorizontalRenderProps
>(({ x, y, width, ticks }, ref) => (
  <g ref={ref} transform={`translate(${x}, ${y})`}>
    <line x2={width} y1={-15} y2={-15} stroke="black" />
    {ticks.map(({ label, position }) => (
      <g key={label + position}>
        <line x1={position} x2={position} y1={-10} y2={-15} stroke="black" />
        <text x={position} dominantBaseline="middle" textAnchor="middle">
          {label}
        </text>
      </g>
    ))}
  </g>
));
export function LinearHorizontalAxis(
  props: HorizontalAxisProps & HorizontalOrientation,
) {
  const { scale, scientificNotation, orientation = 'top', ...other } = props;
  const ref = useRef<SVGGElement>(null);
  const tickFormat = useMemo(
    () => (scientificNotation ? toExponential : undefined),
    [scientificNotation],
  );
  const ticks = useLinearPrimaryTicks(scale, 'horizontal', ref, { tickFormat });
  if (orientation === 'top') {
    return <HorizontalAxisTop {...other} ticks={ticks} ref={ref} />;
  }
  if (orientation === 'bottom') {
    return <HorizontalAxisBottom {...other} ticks={ticks} ref={ref} />;
  }
  return null;
}
export function TimeHorizontalAxis(
  props: HorizontalAxisProps & HorizontalOrientation,
) {
  const { scale, scientificNotation, orientation = 'top', ...other } = props;
  const ref = useRef<SVGGElement>(null);
  const tickFormat = useMemo(
    () => (scientificNotation ? toExponential : undefined),
    [scientificNotation],
  );
  const ticks = useTimeTicks(scale, 'horizontal', ref, { tickFormat });
  if (orientation === 'top') {
    return <HorizontalAxisTop {...other} ticks={ticks} ref={ref} />;
  }
  if (orientation === 'bottom') {
    return <HorizontalAxisBottom {...other} ticks={ticks} ref={ref} />;
  }
  return null;
}
export function LogHorizontalAxis(
  props: HorizontalAxisProps & HorizontalOrientation,
) {
  const { scale, scientificNotation, orientation = 'top', ...other } = props;
  const ref = useRef<SVGGElement>(null);
  const tickFormat = useMemo(
    () => (scientificNotation ? toExponential : undefined),
    [scientificNotation],
  );
  const ticks = useLogTicks(scale, 'horizontal', ref, { tickFormat });
  if (orientation === 'top') {
    return <HorizontalAxisTop {...other} ticks={ticks} ref={ref} />;
  }
  if (orientation === 'bottom') {
    return <HorizontalAxisBottom {...other} ticks={ticks} ref={ref} />;
  }
  return null;
}

const VerticalAxisLeft = forwardRef<SVGGElement | null, VerticalRenderProps>(
  ({ x, y, height, ticks }, ref) => (
    <g ref={ref} transform={`translate(${x}, ${y})`}>
      <line y2={height} x1={15} x2={15} stroke="black" />
      {ticks.map(({ label, position }) => (
        <g key={label + position}>
          <line y1={position} y2={position} x1={10} x2={15} stroke="black" />
          <text y={position} dominantBaseline="middle" textAnchor="end">
            {label}
          </text>
        </g>
      ))}
    </g>
  ),
);
const VerticalAxisRight = forwardRef<SVGGElement | null, VerticalRenderProps>(
  ({ x, y, height, ticks }, ref) => (
    <g ref={ref} transform={`translate(${x}, ${y})`}>
      <line y2={height} x1={-15} x2={-15} stroke="black" />
      {ticks.map(({ label, position }) => {
        return (
          <g key={label + position}>
            <line
              y1={position}
              y2={position}
              x1={-10}
              x2={-15}
              stroke="black"
            />
            <text y={position} dominantBaseline="middle" textAnchor="start">
              {label}
            </text>
          </g>
        );
      })}
    </g>
  ),
);
export function LinearVerticalAxis(
  props: VerticalAxisProps & VerticalOrientation,
) {
  const { scale, scientificNotation, orientation = 'left', ...other } = props;
  const ref = useRef<SVGGElement>(null);
  const tickFormat = useMemo(
    () => (scientificNotation ? toExponential : undefined),
    [scientificNotation],
  );
  const ticks = useLinearPrimaryTicks(scale, 'vertical', ref, { tickFormat });
  if (orientation === 'left') {
    return <VerticalAxisLeft {...other} ticks={ticks} ref={ref} />;
  }
  if (orientation === 'right') {
    return <VerticalAxisRight {...other} ticks={ticks} ref={ref} />;
  }
  return null;
}
export function TimeVerticalAxis(
  props: VerticalAxisProps & VerticalOrientation,
) {
  const { scale, scientificNotation, orientation = 'left', ...other } = props;
  const ref = useRef<SVGGElement>(null);
  const tickFormat = useMemo(
    () => (scientificNotation ? toExponential : undefined),
    [scientificNotation],
  );
  const ticks = useTimeTicks(scale, 'vertical', ref, { tickFormat });
  if (orientation === 'left') {
    return <VerticalAxisLeft {...other} ticks={ticks} ref={ref} />;
  }
  if (orientation === 'right') {
    return <VerticalAxisRight {...other} ticks={ticks} ref={ref} />;
  }
  return null;
}
export function LogVerticalAxis(
  props: VerticalAxisProps & VerticalOrientation,
) {
  const { scale, scientificNotation, orientation = 'left', ...other } = props;
  const ref = useRef<SVGGElement>(null);
  const tickFormat = useMemo(
    () => (scientificNotation ? toExponential : undefined),
    [scientificNotation],
  );
  const ticks = useLogTicks(scale, 'vertical', ref, { tickFormat });
  if (orientation === 'left') {
    return <VerticalAxisLeft {...other} ticks={ticks} ref={ref} />;
  }
  if (orientation === 'right') {
    return <VerticalAxisRight {...other} ticks={ticks} ref={ref} />;
  }
  return null;
}
