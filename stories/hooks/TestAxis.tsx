import {
  ScaleTime,
  ScaleLinear,
  scaleLinear,
  scaleLog,
  ScaleLogarithmic,
  scaleTime,
} from 'd3-scale';
import { forwardRef, useMemo, useRef, useEffect, useState } from 'react';

import { useLinearPrimaryTicks, useLogTicks, useTimeTicks } from '../../src';

interface BaseAxis {
  x: number;
  y: number;
}
interface ScaleAxis<T> {
  scale: T;
  scientificNotation?: boolean;
  onlyMainTicks?: boolean;
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

type HorizontalAxisProps<T> = BaseAxis & Horizontal & ScaleAxis<T>;
type VerticalAxisProps<T> = BaseAxis & Vertical & ScaleAxis<T>;
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
        <g key={position}>
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
      <g key={position}>
        <line x1={position} x2={position} y1={-10} y2={-15} stroke="black" />
        <text x={position} dominantBaseline="middle" textAnchor="middle">
          {label}
        </text>
      </g>
    ))}
  </g>
));
function HorizontalAxis(
  props: HorizontalAxisProps<Scales> &
    HorizontalOrientation & {
      type: 'linear' | 'log' | 'time';
    },
) {
  const { scale, type, ...other } = props;
  switch (type) {
    case 'linear':
      return (
        <LinearHorizontalAxis
          scale={scale as ScaleLinear<number, number>}
          {...other}
        />
      );
    case 'log':
      return (
        <LogHorizontalAxis
          scale={scale as ScaleLogarithmic<number, number>}
          {...other}
        />
      );
    case 'time':
      return (
        <TimeHorizontalAxis
          scale={scale as ScaleTime<number, number>}
          {...other}
        />
      );
    default:
      return null;
  }
}
function LinearHorizontalAxis(
  props: HorizontalAxisProps<ScaleLinear<number, number>> &
    HorizontalOrientation,
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
function TimeHorizontalAxis(
  props: HorizontalAxisProps<ScaleTime<number, number>> & HorizontalOrientation,
) {
  const { scale, orientation = 'top', ...other } = props;
  const ref = useRef<SVGGElement>(null);
  const ticks = useTimeTicks(scale, 'horizontal', ref, {});
  if (orientation === 'top') {
    return <HorizontalAxisTop {...other} ticks={ticks} ref={ref} />;
  }
  if (orientation === 'bottom') {
    return <HorizontalAxisBottom {...other} ticks={ticks} ref={ref} />;
  }
  return null;
}
function LogHorizontalAxis(
  props: HorizontalAxisProps<ScaleLogarithmic<number, number>> &
    HorizontalOrientation,
) {
  const {
    scale,
    scientificNotation,
    orientation = 'top',
    onlyMainTicks = false,
    ...other
  } = props;
  const ref = useRef<SVGGElement>(null);
  const tickFormat = useMemo(
    () => (scientificNotation ? toExponential : undefined),
    [scientificNotation],
  );
  const ticks = useLogTicks(scale, 'horizontal', ref, {
    tickFormat,
    onlyMainTicks,
  });
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
        <g key={position}>
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
          <g key={position}>
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
function VerticalAxis(
  props: VerticalAxisProps<Scales> &
    VerticalOrientation & {
      type: 'linear' | 'log' | 'time';
    },
) {
  const { scale, type, ...other } = props;
  const Axis = useMemo(() => {
    switch (type) {
      case 'linear':
        return (
          <LinearVerticalAxis
            scale={scale as ScaleLinear<number, number>}
            {...other}
          />
        );
      case 'log':
        return (
          <LogVerticalAxis
            scale={scale as ScaleLogarithmic<number, number>}
            {...other}
          />
        );
      case 'time':
        return (
          <TimeVerticalAxis
            scale={scale as ScaleTime<number, number>}
            {...other}
          />
        );
      default:
        return null;
    }
  }, [other, scale, type]);
  return Axis;
}
function LinearVerticalAxis(
  props: VerticalAxisProps<ScaleLinear<number, number>> & VerticalOrientation,
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
function TimeVerticalAxis(
  props: VerticalAxisProps<ScaleTime<number, number>> & VerticalOrientation,
) {
  const { scale, orientation = 'left', ...other } = props;
  const ref = useRef<SVGGElement>(null);
  const ticks = useTimeTicks(scale, 'vertical', ref, {});
  if (orientation === 'left') {
    return <VerticalAxisLeft {...other} ticks={ticks} ref={ref} />;
  }
  if (orientation === 'right') {
    return <VerticalAxisRight {...other} ticks={ticks} ref={ref} />;
  }
  return null;
}
function LogVerticalAxis(
  props: VerticalAxisProps<ScaleLogarithmic<number, number>> &
    VerticalOrientation,
) {
  const {
    scale,
    scientificNotation,
    orientation = 'left',
    onlyMainTicks = false,
    ...other
  } = props;
  const ref = useRef<SVGGElement>(null);
  const tickFormat = useMemo(
    () => (scientificNotation ? toExponential : undefined),
    [scientificNotation],
  );
  const ticks = useLogTicks(scale, 'vertical', ref, {
    tickFormat,
    onlyMainTicks,
  });
  if (orientation === 'left') {
    return <VerticalAxisLeft {...other} ticks={ticks} ref={ref} />;
  }
  if (orientation === 'right') {
    return <VerticalAxisRight {...other} ticks={ticks} ref={ref} />;
  }
  return null;
}
//Stories

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
  domain: readonly [number | Date, number | Date];
  type: 'linear' | 'log' | 'time';
  scientificNotation?: boolean;
  onlyMainTicks?: boolean;
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
  onlyMainTicks = false,
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
            onlyMainTicks={onlyMainTicks}
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
  onlyMainTicks,
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
            onlyMainTicks={onlyMainTicks}
            height={height}
            type={type}
          />
        ))}
      </svg>
    </div>
  );
}

interface Props {
  minSize: number;
  maxSize: number;
  minValue: number | Date;
  maxValue: number | Date;
  speedAnimation: number;
  type: 'linear' | 'log' | 'time';
  scientificNotation?: boolean;
  onlyMainTicks?: boolean;
}
export function AutomaticHorizontalAxis({
  minSize,
  maxSize,
  minValue,
  maxValue,
  speedAnimation,
  scientificNotation = false,
  onlyMainTicks = false,
  type,
}: Props) {
  const [width, setWidth] = useState(minSize);
  const [isDown, setIsDown] = useState(true);
  const scale = useMemo(() => {
    switch (type) {
      case 'linear':
        return scaleLinear().range([0, width]).domain([minValue, maxValue]);
      case 'log':
        return scaleLog().range([0, width]).domain([minValue, maxValue]);
      case 'time':
        return scaleTime().range([0, width]).domain([minValue, maxValue]);
      default:
        throw Error('type error');
    }
  }, [maxValue, minValue, type, width]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setWidth((prevWidth) => {
        if (prevWidth <= minSize && isDown) {
          setIsDown(false);
        } else if (prevWidth >= maxSize && !isDown) {
          setIsDown(true);
        }
        return isDown ? prevWidth - speedAnimation : prevWidth + speedAnimation;
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [width, isDown, minSize, maxSize, speedAnimation]);

  return (
    <div>
      <svg style={{ overflow: 'visible' }} width={maxSize + 20} height={60}>
        <HorizontalAxis
          x={10}
          y={10}
          scale={scale}
          width={width}
          scientificNotation={scientificNotation}
          onlyMainTicks={onlyMainTicks}
          type={type}
        />
      </svg>
    </div>
  );
}

export function AutomaticVerticalAxis({
  minSize,
  maxSize,
  minValue,
  maxValue,
  speedAnimation,
  scientificNotation,
  onlyMainTicks = false,
  type,
}: Props) {
  const [height, setHeight] = useState(minSize);
  const [isDown, setIsDown] = useState(true);
  const scale = useMemo(() => {
    switch (type) {
      case 'linear':
        return scaleLinear().range([height, 0]).domain([minValue, maxValue]);
      case 'log':
        return scaleLog().range([height, 0]).domain([minValue, maxValue]);
      case 'time':
        return scaleTime().range([height, 0]).domain([minValue, maxValue]);
      default:
        throw Error('type error');
    }
  }, [height, maxValue, minValue, type]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setHeight((prevHeight) => {
        if (prevHeight <= minSize && isDown) {
          setIsDown(false);
        } else if (prevHeight >= maxSize && !isDown) {
          setIsDown(true);
        }
        return isDown
          ? prevHeight - speedAnimation
          : prevHeight + speedAnimation;
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [height, isDown, minSize, maxSize, speedAnimation]);

  return (
    <div>
      <svg style={{ overflow: 'visible' }} height={maxSize + 20} width={60}>
        <VerticalAxis
          x={40}
          y={10}
          scale={scale}
          height={height}
          scientificNotation={scientificNotation}
          onlyMainTicks={onlyMainTicks}
          type={type}
        />
      </svg>
    </div>
  );
}
