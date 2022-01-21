import { Meta } from '@storybook/react';
import React from 'react';

import {
  AutomaticHorizontalAxis,
  AutomaticVerticalAxis,
} from './StoryExamples';

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
  parameters: {
    docs: { inlineStories: true },
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
