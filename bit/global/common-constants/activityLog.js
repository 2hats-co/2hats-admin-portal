export const ACTIVITY_LOG_TYPES = [
  'course-started',
  'learn-world-certificate',
  'course-completed',

  'assessment-started',
  'assessment-submitted',
  'assessment-pass',
  'assessment-fail',

  'job-applied',

  'event-booked',

  'ac-booked',
  'ac-completed',

  'book-ac',

  'system',
];

export const ACTIVITY_LOG_LABELS = ACTIVITY_LOG_TYPES.reduce((a, v) => {
  let label = v
    .replace('learn-world', 'LearnWorlds')
    .replace('-', ' ')
    .replace('ac', 'assessment centre')
    .replace('pass', 'passed')
    .replace('fail', 'failed');
  label = label.charAt(0).toUpperCase() + label.slice(1);

  return { ...a, [v]: label, system: '' };
}, {});
