export const SKILLS = [
  // marketing
  { label: 'Social media management', value: 'socialMediaManagement' },
  { label: 'Blog writing', value: 'blogWriting' },
  { label: 'EDM composition', value: 'edmComposition' },
  { label: 'Brochure design', value: 'brochureDesign' },
  { label: 'Google Analytics', value: 'googleAnalytics' },
  { label: 'SEO', value: 'seo' },
  { label: 'Copywriting', value: 'copywriting' },

  // sales
  { label: 'Prospecting', value: 'prospecting' },
  { label: 'Email outreach', value: 'emailOutreach' },
  { label: 'Objection handling', value: 'objectionHandling' },
  { label: 'Sales strategy', value: 'salesStrategy' },
  { label: 'Sales closing', value: 'salesClosing' },

  { label: 'Graphic design', value: 'graphicDesign' },
];

export const getSkillLabel = val =>
  SKILLS.filter(x => x.value === val)[0].label;

export const getSkillCategory = val => {
  switch (val) {
    case 'socialMediaManagement':
    case 'blogWriting':
    case 'edmComposition':
    case 'brochureDesign':
    case 'googleAnalytics':
    case 'seo':
    case 'copywriting':
      return 'marketing';

    case 'prospecting':
    case 'emailOutreach':
    case 'objectionHandling':
    case 'salesStrategy':
    case 'salesClosing':
      return 'sales';

    default:
      return '';
  }
};
