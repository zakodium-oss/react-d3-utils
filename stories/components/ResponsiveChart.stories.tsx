import type { Meta } from '@storybook/react';
import { type ReactNode, useEffect, useState } from 'react';

import { ResponsiveChart, type ResponsiveChartProps } from '../../src/index.js';

export default {
  title: 'components/ResponsiveChart',
  component: ResponsiveChart,
} as Meta;

function TestChart(props: { width: number; height: number }) {
  return (
    <svg width={props.width} height={props.height}>
      <rect x="0" y="0" width={props.width} height={props.height} fill="blue" />
      <text x="5" y="5" dominantBaseline="hanging" fill="white">
        {props.width} x {props.height}
      </text>
    </svg>
  );
}

function VariableDiv(props: { children: ReactNode }) {
  const [isDown, setIsDown] = useState(true);
  const [size, setSize] = useState(250);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setSize((previousSize) => {
        if (previousSize <= 0 && isDown) {
          setIsDown(false);
        } else if (previousSize >= 250 && !isDown) {
          setIsDown(true);
        }
        return isDown ? previousSize - 2 : previousSize + 2;
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [size, isDown]);
  return (
    <div style={{ width: size, height: size, backgroundColor: 'yellow' }}>
      {props.children}
    </div>
  );
}

export function Control({
  parentWidth,
  parentHeight,
  siblingWidth,
  ...args
}: ResponsiveChartProps & {
  parentWidth: number;
  parentHeight: number;
  siblingWidth: number;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: parentHeight,
        width: parentWidth,
      }}
    >
      <ResponsiveChart {...args}>
        {({ width, height }) => <TestChart width={width} height={height} />}
      </ResponsiveChart>
      <div
        style={{
          backgroundColor: 'red',
          height: '100%',
          color: 'white',
          width: siblingWidth,
        }}
      >
        Hi!
      </div>
    </div>
  );
}

Control.args = {
  parentWidth: 600,
  parentHeight: 400,
  siblingWidth: 200,
};

export function ParentFixed() {
  return (
    <div style={{ width: 200, height: 100 }}>
      <ResponsiveChart>
        {({ width, height }) => <TestChart width={width} height={height} />}
      </ResponsiveChart>
    </div>
  );
}

ParentFixed.storyName = 'Parent with fixed size';

export function ParentVariable() {
  return (
    <VariableDiv>
      <ResponsiveChart>
        {({ width, height }) => <TestChart width={width} height={height} />}
      </ResponsiveChart>
    </VariableDiv>
  );
}

ParentVariable.storyName = 'Parent with variable size';

export function SiblingVariable() {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'row', height: 100, width: 500 }}
    >
      <div style={{ flex: 2, height: 100, backgroundColor: 'yellow' }} />
      <ResponsiveChart>
        {({ width, height }) => <TestChart width={width} height={height} />}
      </ResponsiveChart>
      <VariableDiv>
        <div style={{ backgroundColor: 'red', height: '100%', color: 'white' }}>
          Hi!
        </div>
      </VariableDiv>
    </div>
  );
}

SiblingVariable.storyName = 'Flex siblings with variable size';

export function Max() {
  return (
    <VariableDiv>
      <ResponsiveChart maxWidth={100} maxHeight={50}>
        {({ width, height }) => <TestChart width={width} height={height} />}
      </ResponsiveChart>
    </VariableDiv>
  );
}

Max.storyName = 'With max width and height';

export function FixedHeight() {
  return (
    <VariableDiv>
      <ResponsiveChart height={50}>
        {({ width, height }) => <TestChart width={width} height={height} />}
      </ResponsiveChart>
    </VariableDiv>
  );
}

FixedHeight.storyName = 'With fixed height';
