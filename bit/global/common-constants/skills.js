export const SKILLS = [
  // marketing
  { label: 'Social Media Management', value: 'socialMediaManagement' },
  { label: 'Blog Writing', value: 'blogWriting' },
  { label: 'EDM Composition', value: 'edmComposition' },
  { label: 'Brochure Design', value: 'brochureDesign' },
  { label: 'Google Analytics', value: 'googleAnalytics' },
  // { label: 'SEO', value: 'seo' },
  // { label: 'Copywriting', value: 'copywriting' },

  // sales
  { label: 'Prospecting', value: 'prospecting' },
  { label: 'Email Outreach', value: 'emailOutreach' },
  { label: 'Objection Handling', value: 'objectionHandling' },
  { label: 'Sales Strategy', value: 'salesStrategy' },
  { label: 'Sales Closing', value: 'salesClosing' },

  // { label: 'Graphic design', value: 'graphicDesign' },

  // dev
  { label: 'Web App Essentials', value: 'webAppEssentials' },
];

export const getSkillLabel = val => {
  if (SKILLS.filter(x => x.value === val).length > 0)
    return SKILLS.filter(x => x.value === val)[0].label;
  return null;
};

export const getSkillCategory = val => {
  switch (val) {
    case 'socialMediaManagement':
    case 'blogWriting':
    case 'edmComposition':
    case 'brochureDesign':
    case 'googleAnalytics':
      // case 'seo':
      // case 'copywriting':
      return 'marketing';

    case 'prospecting':
    case 'emailOutreach':
    case 'objectionHandling':
    case 'salesStrategy':
    case 'salesClosing':
      return 'sales';

    case 'webAppEssentials':
      return 'tech';

    default:
      return '';
  }
};

export const getAllSkillsInCategory = cat => {
  const output = [];
  SKILLS.forEach(x => {
    if (getSkillCategory(x.value) === cat) output.push(x.value);
  });
  return output;
};
