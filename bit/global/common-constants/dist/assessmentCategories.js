'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
var ASSESSMENT_CATEGORIES = (exports.ASSESSMENT_CATEGORIES = [
  { label: 'Marketing', value: 'marketing' },
  { label: 'Sales', value: 'sales' },
  { label: 'Design', value: 'design' },
]);

var getAssessmentCategoryLabel = (exports.getAssessmentCategoryLabel = function getAssessmentCategoryLabel(
  val
) {
  return ASSESSMENT_CATEGORIES.filter(function(x) {
    return x.value === val;
  })[0].label;
});

//# sourceMappingURL=assessmentCategories.js.map
