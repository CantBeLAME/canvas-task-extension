// JSON response from /api/v1/planner/items
interface PlannerAssignment {
  id?: string | number; // returned by POST /api/v1/planner_notes
  color?: string;
  course_id?: string | number;
  plannable_id?: string | number;
  plannable_type?: AssignmentType;
  planner_override?: {
    id: string;
    marked_complete: boolean;
    dismissed: boolean;
  } | null;
  plannable_date?: string;
  submissions?:
    | {
        submitted?: boolean;
        excused?: boolean;
        graded?: boolean;
        missing?: boolean;
        late?: boolean;
        needs_grading?: boolean;
        redo_request?: boolean;
        posted_at?: string;
      }
    | false;
  plannable: {
    assignment_id?: string | number; // use this for graphql requests
    id: string | number;
    title: string;
    details?: string;
    due_at?: string;
    todo_date?: string; // for custom planner notes
    points_possible?: number;
    course_id?: string; // for custom planner notes
    linked_object_html_url?: string; // for custom planner notes
    read_state?: string; // for announcements
  };
  html_url?: string;
}

// JSON response from /api/v1/users/self/todo
export interface TodoAssignment {
  id: string;
  due_at: string;
  needs_grading_count?: number;
  html_url: string;
  name: string;
  course_id: string;
  points_possible?: number;
  is_quiz_assignment?: boolean;
}

interface TodoResponse {
  assignment?: TodoAssignment;
  needs_grading_count?: number;
}

// JSON response from /api/v1/users/self/missing_submissions
export interface MissingAssignment {
  id: string | number;
  html_url: string;
  course_id: string | number;
  name: string;
  due_at?: string;
  lock_at?: string;
  points_possible?: number;
  planner_override: {
    id: string | number;
    marked_complete?: boolean;
    dismissed?: boolean;
    plannable_type: AssignmentType;
    plannable_id?: string | number;
  } | null;
  is_quiz_assignment?: boolean;
  quiz_id?: string | number;
  original_quiz_id?: string | number;
  submission_types?: (
    | 'discussion_topic'
    | 'online_quiz'
    | 'on_paper'
    | 'none'
    | 'external_tool'
    | 'online_text_entry'
    | 'online_url'
    | 'online_upload'
    | 'media_recording'
    | 'student_annotation'
  )[];
}

// Immutable object representation used in our code
interface FinalAssignment {
  // color: string; // color assigned to course
  html_url: string; // link to assignment page
  name: string; // title of assignment
  points_possible: number;
  due_at: string;
  course_id: string; // course the assignment belongs to
  id: string; // id of the assignment
  plannable_id: string; // id of planner item for marking complete
  override_id?: string; // id of existing planner override
  submitted: boolean; // has the user submitted it?
  graded: boolean; // has the teacher graded it?
  graded_at: string; // date the teacher graded (if graded)
  score: number; // grade assigned, 0 if ungraded or unsubmitted
  grade?: string; // grade displayed (letter scale or point scale)
  type: AssignmentType;
  // course_name: string; // via useCourseName
  marked_complete: boolean; // marked complete in the sidebar or through the planner
  // position: number;
  needs_grading_count?: number;
  total_submissions?: number;
}

interface Assignment {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  due_at: string | null;
  lock_at: string | null;
  unlock_at: string | null;
  has_overrides: boolean;
  all_dates: any | null;
  course_id: number;
  html_url: string;
  submissions_download_url: string;
  assignment_group_id: number;
  due_date_required: boolean;
  allowed_extensions: string[];
  max_name_length: number;
  turnitin_enabled?: boolean;
  vericite_enabled?: boolean;
  turnitin_settings?: {
    originality_report_visibility?:
      | 'immediate'
      | 'after_grading'
      | 'after_due_date'
      | 'never';
    exclude_small_matches_type?: 'percent' | 'words' | null;
    exclude_small_matches_value?: number | null;
  } | null;
  grade_group_students_individually: boolean;
  external_tool_tag_attributes?: {
    url: string;
    new_tab: boolean;
  } | null;
  peer_reviews: boolean;
  automatic_peer_reviews: boolean;
  peer_review_count?: number;
  peer_reviews_assign_at?: string;
  intra_group_peer_reviews: boolean;
  group_category_id?: number | null;
  needs_grading_count?: number;
  needs_grading_count_by_section?: {
    section_id: string;
    needs_grading_count: number;
  }[];
  position: number;
  post_to_sis?: boolean;
  integration_id?: string;
  integration_data?: Record<string, string>;
  points_possible: number;
  submission_types: string[];
  has_submitted_submissions: boolean;
  grading_type:
    | 'pass_fail'
    | 'percent'
    | 'letter_grade'
    | 'gpa_scale'
    | 'points';
  grading_standard_id?: number | null;
  published: boolean;
  unpublishable: boolean;
  only_visible_to_overrides: boolean;
  locked_for_user: boolean;
  lock_info?: any;
  lock_explanation?: string;
  quiz_id?: number;
  anonymous_submissions?: boolean;
  discussion_topic?: any | null;
  freeze_on_copy?: boolean;
  frozen?: boolean;
  frozen_attributes?: string[];
  submission?: any | null;
  use_rubric_for_grading?: boolean;
  rubric_settings?: {
    points_possible: string;
  } | null;
  rubric?: any | null;
  assignment_visibility?: number[];
  overrides?: any | null;
  omit_from_final_grade?: boolean;
  hide_in_gradebook?: boolean;
  moderated_grading?: boolean;
  grader_count?: number;
  final_grader_id?: number;
  grader_comments_visible_to_graders?: boolean;
  graders_anonymous_to_graders?: boolean;
  grader_names_visible_to_final_grader?: boolean;
  anonymous_grading?: boolean;
  allowed_attempts?: number;
  post_manually?: boolean;
  score_statistics?: any | null;
  can_submit?: boolean;
  ab_guid?: string[];
  annotatable_attachment_id?: number | null;
  anonymize_students?: boolean;
  require_lockdown_browser?: boolean;
  important_dates?: boolean;
  muted?: boolean;
  anonymous_peer_reviews?: boolean;
  anonymous_instructor_annotations?: boolean;
  graded_submissions_exist?: boolean;
  is_quiz_assignment?: boolean;
  in_closed_grading_period?: boolean;
  can_duplicate?: boolean;
  original_course_id?: number;
  original_assignment_id?: number;
  original_lti_resource_link_id?: number;
  original_assignment_name?: string;
  original_quiz_id?: number;
  workflow_state: string;
}
// possible values from plannable_type field
enum AssignmentType {
  ASSIGNMENT = 'assignment',
  QUIZ = 'quiz',
  DISCUSSION = 'discussion_topic',
  NOTE = 'planner_note',
  ANNOUNCEMENT = 'announcement',
  EVENT = 'calender_event',
  GRADESCOPE = 'gradescope',
}

enum AssignmentStatus {
  UNFINISHED = 'unfinished',
  COMPLETE = 'complete',
  DELETED = 'deleted',
  SEEN = 'seen',
}

export {
  TodoResponse,
  PlannerAssignment,
  FinalAssignment,
  AssignmentType,
  AssignmentStatus,
  Assignment,
};
