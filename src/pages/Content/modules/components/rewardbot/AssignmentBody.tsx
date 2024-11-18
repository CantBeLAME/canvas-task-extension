import styled from 'styled-components';
import { DarkProps } from '../../types/props';
import React, { useEffect, useState } from 'react';
import { getAssignmentsRequest } from '../../hooks/useAssignments';
// import { Assignment } from '../../types';
import { SubtitleText, TitleText } from '../radial-bar-chart/example';
import { AssignmentType } from '../../types';

const TitleDiv = styled.div<DarkProps>`
  ${(props) =>
    props.dark ? 'var(--tfc-dark-mode-text-secondary)' : 'rgb(199, 205, 209)'};
  color: ${(props) =>
    props.dark ? 'var(--tfc-dark-mode-text-primary)' : 'inherit'};
  height: 30px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 5px;
`;

export interface HeaderProps {
  dark?: boolean;
}

const typeMap: Record<string, AssignmentType> = {
  assignments: AssignmentType.ASSIGNMENT,
  quizzes: AssignmentType.QUIZ,
  discussion_topics: AssignmentType.DISCUSSION,
};

async function getAssignments() {
  const path = window.location.pathname.split('/');
  const course_id = path.length >= 3 && path[1] === 'courses' ? path[2] : null;
  const assigment_id = path.length >= 5 ? path[4] : null;
  if (course_id && assigment_id) {
    return await getAssignmentsRequest(course_id, assigment_id, typeMap[path[3]]);
  }
  return null;
}

export default function AssignmentBody({ dark }: HeaderProps): JSX.Element {
  const [days, setDays] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [hasSummisionTypes, setHasSummisionTypes] = useState<boolean>(false);
  // const []

  useEffect(() => {
    getAssignments().then((res) => {
      setDays(
        Math.floor(
          (new Date(res?.due_at ?? '').getTime() - Date.now()) /
            (1000 * 60 * 60 * 24)
        )
      );
      setSubmitted(res?.submitted ?? false);
      setCanSubmit(res?.can_submit ?? false);
      setHasSummisionTypes(
        (res?.submission_types?.length === 1 &&
          res?.submission_types[0] === 'none') ??
          false
      );
    });
    
  }, []);

  const message: () => { title: string; subtitle: string } = () => {
    if (hasSummisionTypes) {
      return {
        title: 'No submission required',
        subtitle: 'This assignment does not require any submission.',
      };
    }

    if (submitted) {
      return {
        title: 'Congratulations',
        subtitle: 'You have already submitted this assignment.',
      };
    }
    if (days < 0) {
      if (!canSubmit) {
        return {
          title: 'Assignment not available',
          subtitle:
            'Don’t worry, every effort helps you grow! You’ll do even better next time!',
        };
      }
      return {
        title: 'Due date passed',
        subtitle:
          "Assignment is overdue. But don't worry, you can still submit it.",
      };
    } else if (days === 0) {
      return {
        title: 'Due today',
        subtitle: "Submit your assignment to earn you're rewards.",
      };
    } else {
      return {
        title: `Due in ${days} days`,
        subtitle: 'Ready to submit? You are early!!',
      };
    }
  };

  return (
    <TitleDiv dark={dark}>
      <TitleText>{message().title}</TitleText>
      <SubtitleText>{message().subtitle}</SubtitleText>
    </TitleDiv>
  );
}
