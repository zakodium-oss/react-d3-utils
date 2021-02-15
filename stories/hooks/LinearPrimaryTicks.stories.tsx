import { Meta } from '@storybook/react';
import { scaleLinear } from 'd3-scale';
import { useEffect, useState } from 'react';

import { useLinearPrimaryTicks } from '../../src';

interface Props {
  minSize: number;
  maxSize: number;
  minValue: number;
  maxValue: number;
  speedAnimation: number;
  scientificNotation: boolean;
}

export default {
  title: 'Hooks/useLinearPrimaryTicks',
  args: {
    minSize: 50,
    maxSize: 500,
    minValue: 0,
    maxValue: 100,
    speedAnimation: 0.75,
    scientificNotation: false,
  },
} as Meta;

export function AutomaticHorizontalAxis({
  minSize,
  maxSize,
  minValue,
  maxValue,
  speedAnimation,
  scientificNotation,
}: Props) {
  const [width, setWidth] = useState(minSize);
  const [isDown, setIsDown] = useState(true);

  const scale = scaleLinear().range([0, width]).domain([minValue, maxValue]);
  const ticks = useLinearPrimaryTicks(scale, 'horizontal', {
    scientificNotation,
  });

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
        <g transform="translate(10, 10)">
          <line x2={width} y1={15} y2={15} stroke="black" />
          {ticks.map(({ label, position }) => (
            <g key={label}>
              <line
                x1={position}
                x2={position}
                y1={10}
                y2={15}
                stroke="black"
              />
              <text x={position} dominantBaseline="middle" textAnchor="middle">
                {label}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
AutomaticHorizontalAxis.storyName = 'Automatic horizontal axis';

export function AutomaticVerticalAxis({
  minSize,
  maxSize,
  minValue,
  maxValue,
  speedAnimation,
  scientificNotation,
}: Props) {
  const [height, setHeight] = useState(minSize);
  const [isDown, setIsDown] = useState(true);

  const scale = scaleLinear().range([height, 0]).domain([minValue, maxValue]);
  const ticks = useLinearPrimaryTicks(scale, 'vertical', {
    scientificNotation,
  });

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
        <g transform="translate(10, 10)">
          <line y2={height} x1={15} x2={15} stroke="black" />
          {ticks.map(({ label, position }) => (
            <g key={label}>
              <line
                y1={position}
                y2={position}
                x1={10}
                x2={15}
                stroke="black"
              />
              <text y={position} dominantBaseline="middle" textAnchor="end">
                {label}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
AutomaticVerticalAxis.storyName = 'Automatic vertical axis';

