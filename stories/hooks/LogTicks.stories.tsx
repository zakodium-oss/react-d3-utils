import type { Meta } from '@storybook/react-vite';

import { AutomaticHorizontalAxis, AutomaticVerticalAxis } from './TestAxis.js';

interface Props {
  minSize: number;
  maxSize: number;
  minValue: number;
  maxValue: number;
  speedAnimation: number;
  scientificNotation: boolean;
}

export default {
  title: 'Hooks/useLogTicks',

  component: AutomaticVerticalAxis || AutomaticHorizontalAxis,
  args: {
    minSize: 50,
    maxSize: 500,
    minValue: 10,
    maxValue: 10000,
    speedAnimation: 0.75,
    scientificNotation: false,
  },
} as Meta;

export function HorizontalAxis(props: Props) {
  return <AutomaticHorizontalAxis {...props} type="log" />;
}
HorizontalAxis.storyName = 'Automatic horizontal axis';

export function VerticalAxis(props: Props) {
  return <AutomaticVerticalAxis {...props} type="log" />;
}
VerticalAxis.storyName = 'Automatic vertical axis';
