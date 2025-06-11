import type { Meta } from '@storybook/react-vite';

import { HorizontalExample, VerticalExample } from './TestAxis.js';

export default {
  title: 'Hooks/static/useLogTicks',
  component: HorizontalExample || VerticalExample,
} as Meta;

interface Props {
  domain: [number, number];
  scientificNotation: boolean;
}
export function HorizontalCentaines(props: Props) {
  return <HorizontalExample {...props} type="log" />;
}
HorizontalCentaines.args = {
  domain: [10, 100000],
  scientificNotation: false,
};
HorizontalCentaines.storyName = 'Horizontal positive powers';

export function HorizontalDecimals() {
  return (
    <HorizontalExample
      domain={[0.0000001, 100]}
      scientificNotation={false}
      type="log"
    />
  );
}
HorizontalDecimals.storyName = 'Horizontal negative values';

export function HorizontalScientificCentaines() {
  return (
    <HorizontalExample domain={[10, 100000]} scientificNotation type="log" />
  );
}
HorizontalScientificCentaines.storyName =
  'Horizontal scientific positive powers';

export function HorizontalScientificDecimals() {
  return (
    <HorizontalExample
      domain={[0.0000001, 100]}
      scientificNotation
      type="log"
    />
  );
}
HorizontalScientificDecimals.storyName =
  'Horizontal scientific negative values';
export function VerticalCentaines() {
  return (
    <VerticalExample
      domain={[10, 100000]}
      scientificNotation={false}
      type="log"
    />
  );
}
VerticalCentaines.storyName = 'Vertical positive powers';

export function VerticalDecimals() {
  return (
    <VerticalExample
      domain={[0.0000001, 100]}
      scientificNotation={false}
      type="log"
    />
  );
}
VerticalDecimals.storyName = 'Vertical negative values';

export function VerticalScientificCentaines() {
  return (
    <VerticalExample domain={[10, 100000]} scientificNotation type="log" />
  );
}
VerticalScientificCentaines.storyName = 'Vertical scientific positive powers';

export function VerticalScientificDecimals() {
  return (
    <VerticalExample domain={[0.0000001, 100]} scientificNotation type="log" />
  );
}
VerticalScientificDecimals.storyName = 'Vertical scientific negative values';
