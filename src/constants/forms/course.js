import FIELDS from './fields';
import * as yup from 'yup';

import SKILLS from '../studentPortal/skills';

const courseFields = initialData => {
  if (!initialData) initialData = {};
  return [
    {
      type: FIELDS.textField,
      name: 'videoUrl',
      label: 'Video URL',
      value: initialData['videoUrl'],
      validation: yup
        .string()
        .url('Invalid URL')
        .required('Required'),
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
      type: FIELDS.autocompleteMulti,
      name: 'skillsAssociated',
      label: 'Skills associated',
      value:
        initialData['skillAssociated'] &&
        SKILLS.filter(x => initialData['skillAssociated'].includes(x.value)),
      suggestions: SKILLS,
      validation: yup
        .array()
        .min(1)
        .required('Skills are required'),
    },
    // {
    //   type: FIELDS.slider,
    //   name: 'duration',
    //   label: 'Duration',
    //   value: initialData['duration'],
    //   units: 'h',
    //   min: 0.5,
    //   max: 20,
    //   step: 0.5,
    //   validation: yup
    //     .number()
    //     .min(0.5)
    //     .max(20)
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
  ];
};

export default courseFields;
