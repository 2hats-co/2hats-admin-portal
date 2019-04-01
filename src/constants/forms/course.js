import FIELDS from './fields';
import * as yup from 'yup';

import { ASSESSMENT_CATEGORIES } from '@bit/sidney2hats.2hats.global.common-constants';

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
      name: 'LWid',
      label: 'LearnWorlds course ID',
      value: initialData['LWid'],
      validation: yup.string().required('Required Learn Worlds course id'),
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
      type: FIELDS.docAutocompleteMulti,
      name: 'skillsAssociated',
      label: 'Skills associated',
      value: initialData['skillsAssociated'],
      mappings: {
        label: 'title',
        value: doc => ({ title: doc.title, id: doc.id }),
      },
      collection: 'assessments',
      validation: yup.array(),
      // .min(1)
      // .required('Skills are required'),
    },
    {
      type: FIELDS.autocompleteFreeText,
      name: 'category',
      label: 'Category',
      suggestions: ASSESSMENT_CATEGORIES,
      value: ASSESSMENT_CATEGORIES.filter(
        x => x.value === initialData['category']
      )[0],
      validation: yup.string().required('Category is required'),
    },
    {
      type: FIELDS.textField,
      name: 'duration',
      label: 'Duration',
      value: initialData['duration'],
      // units: 'mins',
      // min: 0.5,
      // max: 20,
      // step: 0.5,
      validation: yup.string().required('Duration is required'),
    },
  ];
};

export default courseFields;
