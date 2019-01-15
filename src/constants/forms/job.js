import FIELDS from './fields';
import * as yup from 'yup';

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
      name: 'description',
      label: 'Job description',
      value: initialData['descripiton'],
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.autocompleteMulti,
      name: 'requiredSkills',
      label: 'Required skills',
      value: initialData['requiredSkills'],
      suggestions: ['ds', 'sdf', 'sdfd'].map(x => ({ value: x, label: x })),
    },
    {
      type: FIELDS.autocompleteFreeText,
      name: 'industry',
      label: 'Industry',
      suggestions: ['ds', 'sdf', 'sdfd'].map(x => ({ value: x, label: x })),
      value: initialData['industry'],
    },
    {
      type: FIELDS.textField,
      name: 'location',
      label: 'Location',
      value: initialData['location'],
      validation: yup.string(),
    },
    {
      type: FIELDS.date,
      name: 'endDate',
      label: 'End date',
      value: initialData['endDate'],
      // validation: yup.string(),
    },
    {
      type: FIELDS.dropzone,
      name: 'image',
      label: 'Cover image',
      value: initialData['image'],
      mimeTypes: 'image/*',
      // validation: yup.string(),
    },
  ];
};

export default jobFields;
