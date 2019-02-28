import FIELDS from './fields';
import * as yup from 'yup';

const announcementFields = initialData => {
  if (!initialData) initialData = {};

  return [
    {
      type: FIELDS.textField,
      name: 'title',
      label: 'Title',
      value: initialData['title'],
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.richText,
      name: 'description',
      label: 'Description',
      value: initialData['description'],
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.chipFreeText,
      name: 'specialLabel',
      label: 'Special labels',
      value: initialData['specialLabel'],
      validation: yup.array().of(yup.string()),
    },

    {
      type: FIELDS.textField,
      name: 'assessmentId',
      label: 'Assessment ID',
      value: initialData['assessmentId'],
      validation: yup.string().required('Required'),
      width: 6,
    },
    {
      type: FIELDS.textField,
      name: 'jobId',
      label: 'Job ID',
      value: initialData['jobId'],
      validation: yup.string().required('Required'),
      width: 6,
    },
  ];
};

export default announcementFields;
