import { Meta } from '@storybook/react';
import React from 'react';

import {
  AutomaticHorizontalAxis,
  AutomaticVerticalAxis,
} from './StoryExamples';

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
  args: {
    minSize: 50,
    maxSize: 500,
    minValue: 10,
    maxValue: 10000,
    speedAnimation: 0.75,
    scientificNotation: false,
  },
  parameters: {
    docs: { inlineStories: true },
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
