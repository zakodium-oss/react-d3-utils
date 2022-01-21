import { Meta } from '@storybook/react';
import React from 'react';

import { HorizontalExample, VerticalExample } from './StoryExamples';

export default {
  title: 'Hooks/static/useTimeTicks',
  parameters: {
    docs: { inlineStories: true },
  },
} as Meta;

interface Props {
  domain: [number | Date, number | Date];
}
export function HorizontalCentaines(props: Props) {
  return <HorizontalExample {...props} type="time" />;
}
HorizontalCentaines.args = {
  domain: [Date.now(), Date.now() + 24 * 60 * 60 * 1000],
};
HorizontalCentaines.storyName = 'Horizontal centaines';
export function HorizontalCentainesBottom() {
  return (
    <HorizontalExample
      domain={[new Date(2000, 0, 1, 16), new Date(2000, 0, 1, 20)]}
      orientation="bottom"
      type="time"
    />
  );
}
HorizontalCentainesBottom.storyName = 'Horizontal centaines bottom';
export function VerticalCentaines() {
  return (
    <VerticalExample
      domain={[new Date(2000, 0, 1, 16), new Date(2000, 0, 1, 19)]}
      type="time"
    />
  );
}
VerticalCentaines.storyName = 'Vertical centaines';
export function VerticalCentainesRight() {
  return (
    <VerticalExample
      domain={[new Date(2000, 0, 1, 16), new Date(2000, 0, 1, 17)]}
      orientation="right"
      type="time"
    />
  );
}
VerticalCentainesRight.storyName = 'Vertical centaines right';
