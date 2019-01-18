import FIELDS from './fields';
import * as yup from 'yup';

const assessmentFields = initialData => {
  if (!initialData) initialData = {};
  return [
    {
      type: FIELDS.dropzone,
      name: 'image',
      label: 'Cover image',
      value: initialData['image'],
      mimeTypes: 'image/*',
      path: 'studentPortal/',
      validation: yup.string().url('Not a valid URL'),
    },
    {
      type: FIELDS.autocompleteFreeText,
      name: 'category',
      label: 'Category',
      suggestions: ['ds', 'sdf', 'sdfd'].map(x => ({ value: x, label: x })),
      value: initialData['category'],
      validation: yup.string().required('Category is required'),
    },
    {
      type: FIELDS.autocomplete,
      name: 'skillAssociated',
      label: 'Skill associated',
      value: initialData['skillAssociated'],
      suggestions: ['ds', 'sdf', 'sdfd'].map(x => ({ value: x, label: x })),
      validation: yup.string().required('Skill is required'),
    },
    // {
    //   type: FIELDS.slider,
    //   name: 'duration',
    //   label: 'Duration',
    //   value: initialData['duration'],
    //   units: 'mins',
    //   min: 5,
    //   max: 100,
    //   step: 5,
    //   validation: yup
    //     .number()
    //     .min(5)
    //     .max(100)
    //     .required('Duration is required'),
    // },
    {
      type: FIELDS.textField,
      name: 'duration',
      label: 'Duration',
      value: initialData['duration'],
      units: 'h',
      min: 0.5,
      max: 20,
      step: 0.5,
      validation: yup.string().required('Duration is required'),
    },
    {
      type: FIELDS.textField,
      name: 'title',
      label: 'Title',
      value: initialData['title'],
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.textFieldMultiline,
      name: 'description',
      label: 'Description',
      value: initialData['description'],
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.chipFreeText,
      name: 'links',
      label: 'Links to education sources to support the task completion',
      value: initialData['links'] || [],
      validation: yup
        .array()
        .of(yup.string().url('Invalid URL'))
        .min(1)
        .required('Required'),
    },
  ];
};

export default assessmentFields;
