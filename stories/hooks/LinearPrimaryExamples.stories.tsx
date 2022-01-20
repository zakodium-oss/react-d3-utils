import { Meta } from '@storybook/react';

import { HorizontalExample, VerticalExample } from './StoryExamples';

export default {
  title: 'Hooks/static/useLinearPrimaryTicks',
} as Meta;

export function HorizontalCentaines() {
  return (
    <HorizontalExample
      domain={[-100, 500]}
      scientificNotation={false}
      type="linear"
    />
  );
}
HorizontalCentaines.storyName = 'Horizontal centaines';
export function HorizontalCentainesBottom() {
  return (
    <HorizontalExample
      domain={[-100, 500]}
      scientificNotation={false}
      orientation="bottom"
      type="linear"
    />
  );
}
HorizontalCentainesBottom.storyName = 'Horizontal centaines bottom';
export function HorizontalDecimals() {
  return (
    <HorizontalExample
      domain={[-0.0001, 0.00005]}
      scientificNotation={false}
      type="linear"
    />
  );
}
HorizontalDecimals.storyName = 'Horizontal decimals';

export function HorizontalScientificCentaines() {
  return (
    <HorizontalExample domain={[-100, 500]} scientificNotation type="linear" />
  );
}
HorizontalScientificCentaines.storyName = 'Horizontal scientific centaines';

export function HorizontalScientificDecimals() {
  return (
    <HorizontalExample
      domain={[-0.0001, 0.00005]}
      scientificNotation
      type="linear"
    />
  );
}
HorizontalScientificDecimals.storyName = 'Horizontal scientific decimals';

export function VerticalCentaines() {
  return (
    <VerticalExample
      domain={[-100, 500]}
      scientificNotation={false}
      type="linear"
    />
  );
}
VerticalCentaines.storyName = 'Vertical centaines';
export function VerticalCentainesRight() {
  return (
    <VerticalExample
      domain={[-100, 500]}
      scientificNotation={false}
      orientation="right"
      type="linear"
    />
  );
}
VerticalCentainesRight.storyName = 'Vertical centaines right';
export function VerticalDecimals() {
  return (
    <VerticalExample
      domain={[-0.0001, 0.00005]}
      scientificNotation={false}
      type="linear"
    />
  );
}
VerticalDecimals.storyName = 'Vertical decimals';

export function VerticalScientificCentaines() {
  return (
    <VerticalExample domain={[-100, 500]} scientificNotation type="linear" />
  );
}
VerticalScientificCentaines.storyName = 'Vertical scientific centaines';

export function VerticalScientificDecimals() {
  return (
    <VerticalExample
      domain={[-0.0001, 0.00005]}
      scientificNotation
      type="linear"
    />
  );
}
VerticalScientificDecimals.storyName = 'Vertical scientific decimals';
