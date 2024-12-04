import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { RobotIcon } from '../../icons';
import { FinalAssignment } from '../../types';
import { OptionsDefaults } from '../../constants';
import useSelectChartData from '../task-chart/hooks/useBar';
import useChartData from '../task-chart/hooks/useChartData';
import useCourseStore from '../../hooks/useCourseStore';
import { ChartData } from '../radial-bar-chart';
import { SubtitleText, TitleText } from '../radial-bar-chart/example';

export interface ChartBotProps {
  assignments: FinalAssignment[];
  courses: string[];
  colorOverride?: string;
  loading?: boolean;
  onCoursePage?: boolean;
  selectedCourseId: string;
  setCourse: (id: string) => void;
  showConfetti?: boolean;
  themeColor?: string;
  weekKey?: string;
}

// Define the styled component outside the function
const Wrapper = styled.div`
  padding: 10px
  width: 80%;
  height: 256px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  gap: 20px;
  margin: 0 auto; 
`;

const TextWrapper = styled.div`
  padding: 10px
  margin-top: 10px;
  width: 100%;
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  gap: 5px;
  margin: 0 auto; 
`;

export default function ChartBot({
  assignments,
  courses,
  colorOverride,
  loading,
  selectedCourseId = '',
  themeColor = OptionsDefaults.theme_color,
  weekKey = '',
}: ChartBotProps): JSX.Element {
  const courseStore = useCourseStore();
  /* useMemo so it doesn't animate the bars when switching courses. */
  const [chartData, setChartData] = useState<ChartData>({
    bars: [{ id: '0', value: 0, max: 1, color: colorOverride || themeColor }],
    key: '-1',
  });

  function compareData(a: ChartData, b: ChartData) {
    if (a.bars.length !== b.bars.length) return false;
    return a.bars.reduce(
      (prev, curr, i) =>
        prev &&
        b.bars[i].color === curr.color &&
        b.bars[i].id === curr.id &&
        b.bars[i].max === curr.max &&
        b.bars[i].value === curr.value,
      true
    );
  }

  useEffect(() => {
    // if assignments is same but weekkey different just change currkey
    // else update assignments
    // in order for everything to re-animate when weeks change, the key has to change at the same time as the data
    if (loading) return;
    const newData = useChartData(
      assignments,
      courses,
      courseStore,
      colorOverride || themeColor,
      weekKey
    );
    if (chartData.key !== newData.key || !compareData(chartData, newData))
      setChartData(newData);
  }, [assignments, courses, courseStore, loading, weekKey]);

  const [done, total, _] = useMemo(
    () => useSelectChartData(selectedCourseId, chartData),
    [selectedCourseId, chartData]
  );

  return (
    <Wrapper>
      <RobotIcon />
      <TextWrapper>
        {total - done === 0 ? (
          <div>
            <TitleText>Congratulations!</TitleText>
            <SubtitleText>You have completed all tasks.</SubtitleText>
          </div>
        ) : (
          <div>
            <TitleText>Keep Going!</TitleText>
            <SubtitleText>{total - done} assignment(s) to go !!</SubtitleText>
          </div>
        )}
      </TextWrapper>
    </Wrapper>
  );
}
