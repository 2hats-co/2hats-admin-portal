import FIELDS from './fields';
import * as yup from 'yup';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants/dist/collections';

const announcementFields = initialData => {
  if (!initialData) initialData = {};

  return [
    {
      type: FIELDS.docAutocomplete,
      collection: COLLECTIONS.assessments,
      mappings: { label: 'title', value: 'id' },
      name: 'assessmentId',
      label: 'Assessment',
      value: initialData['assessmentId'],
      validation: yup.string().required('Required'),
      width: 6,
    },
    {
      type: FIELDS.docAutocomplete,
      collection: COLLECTIONS.jobs,
      mappings: { label: ['title', 'companyName'], value: 'id' },
      name: 'jobId',
      label: 'Job Listing',
      value: initialData['jobId'],
      validation: yup.string().required('Required'),
      width: 6,
    },

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
  ];
};

export default announcementFields;
