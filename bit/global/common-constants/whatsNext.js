export const WHATS_NEXT_STATES_LIST = [
  'booking',
  'uploadResume',

  // course flow
  'completeCourse',
  'startNewCourse',

  // assessments flow
  'completeAssessment',
  'awaitAssessmentOutcome',
  'startNewAssessment',

  // jobs flow
  'completeProfile',
  'awaitJobApplicationOutcome',
  'startNewJobApplication',
];

export const WHATS_NEXT_STATES = WHATS_NEXT_STATES_LIST.reduce(
  (a, v) => ((a[v] = v), a),
  {}
);
