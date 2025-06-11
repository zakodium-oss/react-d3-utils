import type { Meta } from '@storybook/react-vite';
import { useEffect, useState } from 'react';

import type { AlignGroupProps } from '../../src/index.js';
import { AlignGroup, useBBoxObserver } from '../../src/index.js';

const DEBUG_COLOR = 'yellow';

export default {
  title: 'Components/AlignGroup',
  component: AlignGroup,
} as Meta;

const lorem = 'lorem ipsum';

export function Control(props: Omit<AlignGroupProps, 'children'>) {
  return (
    <div>
      <svg style={{ overflow: 'visible' }} width={200} height={200}>
        <line x1={100} x2={100} y1={0} y2={200} stroke={DEBUG_COLOR} />
        <line x1={0} x2={200} y1={100} y2={100} stroke={DEBUG_COLOR} />

        <AlignGroup {...props}>
          <rect fill="red" width={10} height={10} />
          <text>lorem</text>
        </AlignGroup>
      </svg>
    </div>
  );
}

Control.args = {
  x: 100,
  y: 100,
  verticalAlign: 'start',
  horizontalAlign: 'start',
  style: { fontSize: '20px' },
};

function VariableText() {
  const [text, setText] = useState(lorem);
  useEffect(() => {
    const interval = setInterval(
      () => setText(lorem.slice(Math.round(Math.random() * lorem.length))),
      500,
    );
    return () => clearInterval(interval);
  }, []);
  return <text fill="white">{text}</text>;
}

export function VariableSize() {
  const { ref, ...size } = useBBoxObserver();
  return (
    <div>
      <svg style={{ overflow: 'visible' }} width={200} height={200}>
        <line x1={100} x2={100} y1={0} y2={200} stroke={DEBUG_COLOR} />
        <line x1={0} x2={200} y1={100} y2={100} stroke={DEBUG_COLOR} />

        <AlignGroup x={100} y={100} horizontalAlign="end" verticalAlign="end">
          <rect fill="green" {...size} />
          <g ref={ref}>
            <rect fill="red" width={10} height={10} />
            <VariableText />
          </g>
        </AlignGroup>
      </svg>
    </div>
  );
}

VariableSize.storyName = 'Variable size is repositioned';
