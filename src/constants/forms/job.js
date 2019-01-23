import FIELDS from './fields';
import * as yup from 'yup';

import SKILLS from '../studentPortal/skills';
import ASSESSMENT_CATEGORIES from '../studentPortal/assessmentCategories';

const jobFields = initialData => {
  if (!initialData) initialData = {};
  return [
    {
      type: FIELDS.textField,
      name: 'title',
      label: 'Job title',
      value: initialData['title'],
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.textFieldMultiline,
      name: 'companyDescription',
      label: 'Company description',
      value: initialData['companyDescription'],
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.textFieldMultiline,
      name: 'roleDescription',
      label: 'Role description',
      value: initialData['roleDescription'],
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.autocompleteMulti,
      name: 'skillsRequired',
      label: 'Skills required',
      value:
        initialData['skillsRequired'] &&
        SKILLS.filter(x => initialData['skillsRequired'].includes(x.value)),
      suggestions: SKILLS,
      validation: yup
        .array()
        .min(1)
        .required('Skills are required'),
    },
    {
      type: FIELDS.autocompleteFreeText,
      name: 'industry',
      label: 'Industry',
      suggestions: ASSESSMENT_CATEGORIES,
      value: ASSESSMENT_CATEGORIES.filter(
        x => x.value === initialData['industry']
      ),
      validation: yup.string().required('Industry is required'),
    },
    {
      type: FIELDS.date,
      name: 'closingDate',
      label: 'Closing date',
      value: initialData['closingDate'],
      validation: yup.string().required('Closing date is required'),
    },
    {
      type: FIELDS.textFieldNumber,
      name: 'payRate',
      label: 'Pay rate',
      value: initialData['payRate'],
      validation: yup.string().required('Pay rate is required'),
    },
    {
      type: FIELDS.autocomplete,
      name: 'payUnits',
      label: 'Skills required',
      value: initialData['payUnits'] && {
        value: initialData['payUnits'],
        label: initialData['payUnits'],
      },
      suggestions: ['hour', 'day', 'week'].map(x => ({ value: x, label: x })),
      validation: yup.string().required('Pay units is required'),
    },
    {
      type: FIELDS.textField,
      name: 'commitment',
      label: 'Commitment',
      value: initialData['commitment'],
      validation: yup.string().required('commitment is required'),
    },
    {
      type: FIELDS.dropzone,
      name: 'image',
      label: 'Cover image',
      value: initialData['image'],
      mimeTypes: 'image/*',
      path: 'studentPortal/',
      validation: yup.object().shape({
        name: yup.string().required(),
        url: yup
          .string()
          .url('Invalid URL')
          .required(),
      }),
    },
  ];
};

export default jobFields;
