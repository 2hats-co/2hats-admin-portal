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
      value: initialData['skillsRequired'],
      suggestions: ['ds', 'sdf', 'sdfd'].map(x => ({ value: x, label: x })),
      validation: yup
        .array()
        .min(1)
        .required('Skills are required'),
    },
    {
      type: FIELDS.autocompleteFreeText,
      name: 'industry',
      label: 'Industry',
      suggestions: ['ds', 'sdf', 'sdfd'].map(x => ({ value: x, label: x })),
      value: initialData['industry'],
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
      type: FIELDS.textField,
      name: 'pay',
      label: 'Pay',
      value: initialData['pay'],
      validation: yup.string().required('Pay is required'),
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
