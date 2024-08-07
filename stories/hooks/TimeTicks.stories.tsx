import { Meta } from '@storybook/react';

import { AutomaticHorizontalAxis, AutomaticVerticalAxis } from './TestAxis';

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

export function HorizontalAxis(props: Props) {
  return <AutomaticHorizontalAxis {...props} type="time" />;
}
HorizontalAxis.storyName = 'Automatic horizontal axis';

export function VerticalAxis(props: Props) {
  return <AutomaticVerticalAxis {...props} type="time" />;
}
VerticalAxis.storyName = 'Automatic vertical axis';
