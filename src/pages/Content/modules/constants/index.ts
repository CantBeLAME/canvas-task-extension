import {
  AnnouncementIcon,
  AssignmentIcon,
  DiscussionIcon,
  NoteIcon,
  QuizIcon,
  NeedsGradingIcon,
} from '../icons';
import GradescopeIcon from '../icons/gradescope';
import { AssignmentType, FinalAssignment, Options, Submission } from '../types';

import JSONAssignmentDefaults from './defaults/assignmentDefaults.json';
import JSONOptionsDefaults from './defaults/optionsDefaults.json';
import JSONSubmissionDefaults from './defaults/submissonDefaults.json';

export const MAX_MARKED_ASSIGNMENTS = 400;

export const ASSIGNMENT_ICON: Record<AssignmentType | 'ungraded', JSX.Element> =
  {
    [AssignmentType.ASSIGNMENT]: AssignmentIcon,
    [AssignmentType.DISCUSSION]: DiscussionIcon,
    [AssignmentType.QUIZ]: QuizIcon,
    [AssignmentType.NOTE]: NoteIcon,
    [AssignmentType.ANNOUNCEMENT]: AnnouncementIcon,
    [AssignmentType.EVENT]: AssignmentIcon,
    [AssignmentType.GRADESCOPE]: GradescopeIcon,
    ungraded: NeedsGradingIcon,
  };

export const AssignmentDefaults = JSONAssignmentDefaults as FinalAssignment;
export const OptionsDefaults = JSONOptionsDefaults as Options;
export const SubmissionDefaults = JSONSubmissionDefaults as Submission;

// export const THEME_COLOR = '#ec412d';
export const THEME_COLOR = 'var(--ic-brand-global-nav-bgd)';
export const THEME_COLOR_LIGHT = 'rgba(199, 205, 209)';

export const CLIENT_ID_LENGTH = 9;

export const HOME_WEBSITE = 'http://localhost:3000';
export const UNINSTALL_URL = 'http://localhost:3000/uninstall';
export const INSTALL_URL = 'http://localhost:3000/home';
export const EXPERIMENT_CONFIG_URL =
  'https://canvas-task-static.onrender.com/live.json';
