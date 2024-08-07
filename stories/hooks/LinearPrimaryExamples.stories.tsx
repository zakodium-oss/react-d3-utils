import { Meta } from '@storybook/react';
import { useState } from 'react';

import { HorizontalExample, VerticalExample } from './TestAxis';

export default {
  title: 'Hooks/static/useLinearPrimaryTicks',
} as Meta;
interface Props {
  domain: [number, number];
  scientificNotation: boolean;
}
export function HorizontalCentaines(props: Props) {
  return <HorizontalExample {...props} type="linear" />;
}
HorizontalCentaines.args = {
  domain: [-100, 500],
  scientificNotation: false,
};
HorizontalCentaines.storyName = 'Horizontal centaines';
export function HorizontalCentainesBottom(props: Props) {
  return <HorizontalExample {...props} orientation="bottom" type="linear" />;
}

HorizontalCentainesBottom.args = {
  domain: [-100, 500],
  scientificNotation: false,
};
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

export function HorizontalToggleDomain() {
  const domain1 = [-1, 1] as const;
  const domain2 = [0, 0] as const;
  const [which, setWhich] = useState(1);

  return (
    <div>
      <HorizontalExample
        domain={which === 1 ? domain1 : domain2}
        type="linear"
      />
      <button type="button" onClick={() => setWhich((w) => (w === 1 ? 2 : 1))}>
        Toggle domain
      </button>
    </div>
  );
}
HorizontalToggleDomain.storyName = 'Horizontal toggle domain';

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
