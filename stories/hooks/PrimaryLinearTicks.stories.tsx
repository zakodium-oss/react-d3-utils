import { Meta } from '@storybook/react';
import { scaleLinear } from 'd3-scale';
import { useEffect, useState } from 'react';

import { usePrimaryLinearTicks } from '../../src';

interface Props {
  minWidth: number;
  maxWidth: number;
  speedAnimation: number;
}

export default {
  title: 'Hooks/usePrimaryLinearTicks',
  args: {
    minWidth: 50,
    maxWidth: 500,
    speedAnimation: 0.75,
  },
} as Meta;

export function Control({ minWidth, maxWidth, speedAnimation }: Props) {
  const [width, setWidth] = useState(minWidth);
  const [isDown, setIsDown] = useState(true);

  const scale = scaleLinear().range([0, width]).domain([0, 100]);
  const ticks = usePrimaryLinearTicks(scale, 'horizontal');

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
