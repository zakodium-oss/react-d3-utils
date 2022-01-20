import { Meta } from '@storybook/react';
import { scaleTime } from 'd3-scale';
import { useEffect, useState } from 'react';

import { HorizontalAxis, VerticalAxis } from './TestAxis';

interface Props {
  minSize: number;
  maxSize: number;
  minValue: number | Date;
  maxValue: number | Date;
  speedAnimation: number;
}

export default {
  title: 'Hooks/useTimeTicks',
  args: {
    minSize: 50,
    maxSize: 500,
    minValue: new Date(2002, 18, 1, 16),
    maxValue: new Date(2002, 18, 1, 17),
    speedAnimation: 0.75,
  },
} as Meta;

export function AutomaticHorizontalAxis({
  minSize,
  maxSize,
  minValue,
  maxValue,
  speedAnimation,
}: Props) {
  const [width, setWidth] = useState(minSize);
  const [isDown, setIsDown] = useState(true);

  const scale = scaleTime().range([0, width]).domain([minValue, maxValue]);

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
      <svg
        style={{ overflow: 'visible', marginLeft: '50px' }}
        width={maxSize + 20}
        height={60}
      >
        <HorizontalAxis x={10} y={10} scale={scale} width={width} type="time" />
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
}: Props) {
  const [height, setHeight] = useState(minSize);
  const [isDown, setIsDown] = useState(true);

  const scale = scaleTime().range([height, 0]).domain([minValue, maxValue]);

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
      <svg
        style={{ overflow: 'visible', marginLeft: '50px' }}
        height={maxSize + 20}
        width={60}
      >
        <VerticalAxis x={10} y={10} scale={scale} height={height} type="time" />
      </svg>
    </div>
  );
}
AutomaticVerticalAxis.storyName = 'Automatic vertical axis';
