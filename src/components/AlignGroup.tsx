import React, {
  useLayoutEffect,
  useRef,
  useMemo,
  useState,
  ReactNode,
} from 'react';

type Align = 'start' | 'middle' | 'end';

export interface AlignGroupProps {
  x?: number;
  y?: number;
  verticalAlign?: Align;
  horizontalAlign?: Align;
  children: ReactNode | ReactNode[];
}

function calculatePosition(start: number, align: Align, space: number) {
  switch (align) {
    case 'start': {
      return start;
    }
    case 'end': {
      return start - space;
    }
    case 'middle': {
      return start - space / 2;
    }
    default: {
      throw new Error(`Unkwnown alignment ${JSON.stringify(align)}`);
    }
  }
}

export function AlignGroup(props: AlignGroupProps) {
  const {
    x = 0,
    y = 0,
    verticalAlign = 'start',
    horizontalAlign = 'start',
    children,
  } = props;

  const groupRef = useRef<SVGGElement>(null);
  const [state, setState] = useState({ height: 0, width: 0, x: 0, y: 0 });
  useLayoutEffect(() => {
    const { height = 0, width = 0, x = 0, y = 0 } =
      groupRef?.current?.getBBox() || {};
    setState({ height, width, x, y });
  }, []);

  const xPosition = useMemo(
    () => calculatePosition(x - state.x, horizontalAlign, state.width),
    [x, horizontalAlign, state.width, state.x],
  );
  const yPosition = useMemo(
    () => calculatePosition(y - state.y, verticalAlign, state.height),
    [y, verticalAlign, state.height, state.y],
  );

  return (
    <g ref={groupRef} transform={`translate(${xPosition}, ${yPosition})`}>
      {children}
    </g>
  );
}
