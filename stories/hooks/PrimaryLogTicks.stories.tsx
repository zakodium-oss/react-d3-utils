import { Meta } from '@storybook/react';
import { scaleLog } from 'd3-scale';
import { useEffect, useState } from 'react';

import { usePrimaryLogTicks } from '../../src';

interface Props {
  minWidth: number;
  maxWidth: number;
  speedAnimation: number;
  scientificNotation: boolean;
}

export default {
  title: 'Hooks/usePrimaryLogTicks',
  args: {
    minWidth: 50,
    maxWidth: 500,
    speedAnimation: 0.75,
    scientificNotation: false,
  },
} as Meta;

export function HorizontalAxis({
  minWidth,
  maxWidth,
  speedAnimation,
  scientificNotation,
}: Props) {
  const [width, setWidth] = useState(minWidth);
  const [isDown, setIsDown] = useState(true);

  const scale = scaleLog().range([0, width]).domain([10, 100000]);
  const ticks = usePrimaryLogTicks(scale, 'horizontal', { scientificNotation });

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setWidth((prevWidth) => {
        if (prevWidth <= minWidth && isDown) {
          setIsDown(false);
        } else if (prevWidth >= maxWidth && !isDown) {
          setIsDown(true);
        }
        return isDown ? prevWidth - speedAnimation : prevWidth + speedAnimation;
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [width, isDown, minWidth, maxWidth, speedAnimation]);

  return (
    <div>
      <svg style={{ overflow: 'visible' }} width={maxWidth + 20} height={60}>
        <g transform="translate(10, 10)">
          <line x2={width} y1={15} y2={15} stroke="black" />
          {ticks.map(({ label, position }, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <g key={index + label + position}>
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
