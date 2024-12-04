import styled from 'styled-components';
import { DarkProps } from '../../types/props';
import React, { useEffect, useState } from 'react';
import { getAssignmentsRequest } from '../../hooks/useAssignments';
// import { Assignment } from '../../types';
import { SubtitleText, TitleText } from '../radial-bar-chart/example';
import { AssignmentType } from '../../types';
import { Submission } from '../../types/assignment';

const TitleDiv = styled.div<DarkProps>`
  ${(props) =>
    props.dark ? 'var(--tfc-dark-mode-text-secondary)' : 'rgb(199, 205, 209)'};
  color: ${(props) =>
    props.dark ? 'var(--tfc-dark-mode-text-primary)' : 'inherit'};
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
    return await getAssignmentsRequest(
      course_id,
      assigment_id,
      typeMap[path[3]]
    );
  }
  return undefined;
}

export default function AssignmentBody({ dark }: HeaderProps): JSX.Element {
  const [days, setDays] = useState<number>(0);
  const [submission, setSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    const result = getAssignments();
    if (result) {
      result.then((res) => {
        setDays(
          Math.floor(
            (new Date(res?.due_at ?? '').getTime() - Date.now()) /
              (1000 * 60 * 60 * 24)
          )
        );
        setSubmission(res ?? null);
      });
    }
  }, []);

  if (!submission) {
    return <></>;
  } else if (submission === undefined) {
    return (
      <TitleDiv dark={dark}>
        <TitleText>Loading...</TitleText>
      </TitleDiv>
    );
  }

  const message: () => { title: string; subtitle: string } = () => {
    if (submission.missing) {
      return {
        title: 'Assignment missing',
        subtitle: 'You have not submitted this assignment yet.',
      };
    } else if (submission.submitted) {
      const submittedDate = new Date(submission.submitted_at ?? '');
      const dueDate = new Date(submission.due_at ?? '');
      const earlyDays = Math.floor(
        (dueDate.getTime() - submittedDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (earlyDays > 0) {
        return {
          title: 'Congratulations',
          subtitle: `You submitted ${earlyDays} day${
            earlyDays > 1 ? 's' : ''
          } early.`,
        };
      } else {
        return {
          title: 'Congratulations',
          subtitle: 'You have already submitted this assignment.',
        };
      }
    } else if (isNaN(days)) {
      return {
        title: 'No due date',
        subtitle: 'This assignment does not have a due date.',
      };
    } else {
      if (days < 0) {
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
          title: `Due in ${days} day${days > 1 ? 's' : ''}`,
          subtitle: 'Ready to submit? You are early!!',
        };
      }
    }
  };

  return (
    <TitleDiv dark={dark}>
      <TitleText>{message().title}</TitleText>
      <SubtitleText>{message().subtitle}</SubtitleText>
    </TitleDiv>
  );
}
