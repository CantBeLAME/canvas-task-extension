import React, { useState, MouseEvent, useEffect } from 'react';
import styled from 'styled-components';
import RadialChartBar from './bar';
import { ChartData } from './types';
import computeSpaceBetween from './utils/spaceBetween';
import computeStrokeRadius from './utils/strokeRadius';
import computeStrokeWidth from './utils/strokeWidth';

interface WrapperProps {
  height: number;
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${(p) => p.height}px;

  .svg {
    display: block;
    margin: 20px auto;
    max-width: 100%;
  }
`;

const ChartSVG = styled.svg`
  display: block;
  margin: 20px auto;
  max-width: 100%;
`;

const CenteredChildren = styled.div`
  position: absolute;
  text-align: center;
  width: 70px;
`;

interface Props {
  children?: React.ReactNode;
  data: ChartData;
  bgColor?: string;
  onMouseEnter?: (id: number, e: MouseEvent) => void;
  onMouseLeave?: (id: number, e: MouseEvent) => void;
  onSelect?: (id: number, e: MouseEvent) => void;
  selectedBar: number;
  size: number;
}

export default function RadialBarChart({
  data,
  bgColor,
  onMouseEnter,
  onMouseLeave,
  selectedBar,
  onSelect,
  children,
  size,
}: Props): JSX.Element {
  const center = 140;
  const cutout = 50;
  const [currKey, setCurrKey] = useState(0); // update keys so that animations trigger when data changes
  const spaceBetween = computeSpaceBetween(data.bars.length);
  const strokeWidth = computeStrokeWidth(
    data.bars.length,
    center,
    cutout,
    spaceBetween
  );
  const radius = computeStrokeRadius(
    data.bars.length,
    center,
    cutout,
    strokeWidth
  );

  function handleClick(id: number, e: MouseEvent) {
    if (selectedBar === id) {
      if (onSelect) onSelect(-1, e);
    } else {
      if (onSelect) onSelect(id, e);
    }
  }

  function handleMouseEnter(id: number, e: MouseEvent) {
    if (onMouseEnter) onMouseEnter(id, e);
  }
  function handleMouseLeave(id: number, e: MouseEvent) {
    if (onMouseLeave) onMouseLeave(id, e);
  }

  useEffect(() => {
    // probably not necessary but might prevent a memory leak
    if (currKey < 1000) setCurrKey(currKey + 1);
    else setCurrKey(0);
  }, [data]);
  return (
    <Wrapper height={size}>
      <ChartSVG height={size} viewBox="0 0 280 280" width={size}>
        {data.bars.map((bar, i) => (
          <RadialChartBar
            bg={bgColor}
            center={center}
            color={
              selectedBar === -1 || selectedBar === bar.id
                ? bar.color
                : '#f2f2f2'
            }
            id={bar.id}
            key={bar.id + '#' + currKey}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            progress={bar.max != 0 ? bar.value / bar.max : 1}
            radius={cutout + radius * (i + 1)}
            width={strokeWidth}
          />
        ))}
      </ChartSVG>
      <CenteredChildren>{children}</CenteredChildren>
    </Wrapper>
  );
}