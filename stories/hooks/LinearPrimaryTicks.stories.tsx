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
  title: 'Hooks/useLinearPrimaryTicks',
  component: AutomaticVerticalAxis || AutomaticHorizontalAxis,
  args: {
    minSize: 50,
    maxSize: 500,
    minValue: 0,
    maxValue: 100,
    speedAnimation: 0.75,
    scientificNotation: false,
  },
} as Meta;

export function HorizontalAxis(props: Props) {
  return <AutomaticHorizontalAxis {...props} type="linear" />;
}
HorizontalAxis.storyName = 'Automatic horizontal axis';

export function VerticalAxis(props: Props) {
  return <AutomaticVerticalAxis {...props} type="linear" />;
}
VerticalAxis.storyName = 'Automatic vertical axis';
