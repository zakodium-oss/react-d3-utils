import {
  ScaleLinear,
  scaleLinear,
  scaleLog,
  ScaleLogarithmic,
  scaleTime,
  ScaleTime,
} from 'd3-scale';
import React, { useMemo, useEffect, useState } from 'react';

import { HorizontalAxis, VerticalAxis } from './TestAxis';

const MIN = 50;
const MAX = 500;
export type Scales =
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

interface Props {
  minSize: number;
  maxSize: number;
  minValue: number | Date;
  maxValue: number | Date;
  speedAnimation: number;
  type: 'linear' | 'log' | 'time';
  scientificNotation?: boolean;
}
export function AutomaticHorizontalAxis({
  minSize,
  maxSize,
  minValue,
  maxValue,
  speedAnimation,
  scientificNotation = false,
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
          type={type}
        />
      </svg>
    </div>
  );
}
