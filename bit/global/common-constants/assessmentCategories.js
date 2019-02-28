export const ASSESSMENT_CATEGORIES = [
  { label: 'Marketing', value: 'marketing' },
  { label: 'Sales', value: 'sales' },
  { label: 'Design', value: 'design' },
  { label: 'Tech', value: 'tech' },
];

export const getAssessmentCategoryLabel = val => {
  if (ASSESSMENT_CATEGORIES.filter(x => x.value === val).length > 0)
    return ASSESSMENT_CATEGORIES.filter(x => x.value === val)[0].label;
  return null;
};
