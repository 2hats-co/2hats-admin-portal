'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
var ASSESSMENT_CATEGORIES = (exports.ASSESSMENT_CATEGORIES = [
  { label: 'Marketing', value: 'marketing' },
  { label: 'Sales', value: 'sales' },
  { label: 'Design', value: 'design' },
  { label: 'Tech', value: 'tech' },
]);

var getAssessmentCategoryLabel = (exports.getAssessmentCategoryLabel = function getAssessmentCategoryLabel(
  val
) {
  if (
    ASSESSMENT_CATEGORIES.filter(function(x) {
      return x.value === val;
    }).length > 0
  )
    return ASSESSMENT_CATEGORIES.filter(function(x) {
      return x.value === val;
    })[0].label;
  return null;
});

//# sourceMappingURL=assessmentCategories.js.map
