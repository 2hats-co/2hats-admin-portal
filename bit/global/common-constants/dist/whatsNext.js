'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
var WHATS_NEXT_STATES_LIST = (exports.WHATS_NEXT_STATES_LIST = [
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
]);

var WHATS_NEXT_STATES = (exports.WHATS_NEXT_STATES = WHATS_NEXT_STATES_LIST.reduce(
  function(a, v) {
    return (a[v] = v), a;
  },
  {}
));

//# sourceMappingURL=whatsNext.js.map
