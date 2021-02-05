import { Meta } from '@storybook/react';

import { AlignGroup, AlignGroupProps } from '../../src';

const DEBUG_COLOR = 'yellow';

export default {
  title: 'Components/AlignGroup',
  component: AlignGroup,
  args: {
    x: 100,
    y: 100,
    verticalAlign: 'start',
    horizontalAlign: 'start',
  },
} as Meta;

export function Control(props: Omit<AlignGroupProps, 'children'>) {
  return (
    <div>
      <svg style={{ overflow: 'visible' }} width={200} height={200}>
        <line x1={100} x2={100} y1={0} y2={200} stroke={DEBUG_COLOR} />
        <line x1={0} x2={200} y1={100} y2={100} stroke={DEBUG_COLOR} />

        <AlignGroup {...props}>
          <rect fill="red" width={10} height={10} />
          <text>lorem ipsum</text>
        </AlignGroup>
      </svg>
    </div>
  );
}
