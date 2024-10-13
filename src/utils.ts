import type { MutableRefObject } from 'react';

export function textDimensions(
  word: string,
  ref: MutableRefObject<SVGGElement | null>,
) {
  const textContent = document.createTextNode(word);
  const textElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'text',
  );
  textElement.setAttribute('class', 'test');
  textElement.appendChild(textContent);
  ref.current?.appendChild(textElement);
  const box: DOMRect = textElement.getBBox();
  ref.current?.removeChild(textElement);
  return box;
}
