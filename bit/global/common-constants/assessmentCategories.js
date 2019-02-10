export const ASSESSMENT_CATEGORIES = [
  { label: 'Marketing', value: 'marketing' },
  { label: 'Sales', value: 'sales' },
  { label: 'Design', value: 'design' },
  { label: 'Tech', value: 'tech' },
];

export const getAssessmentCategoryLabel = val =>
  ASSESSMENT_CATEGORIES.filter(x => x.value === val)[0].label;
