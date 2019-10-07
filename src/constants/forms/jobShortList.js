import * as yup from 'yup';
import FIELDS from './fields';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';

const jobShortListFields = initialData => {
  if (!initialData) initialData = {};

  return [
    {
      type: FIELDS.docAutocomplete,
      collection: COLLECTIONS.jobs,
      mappings: { label: 'title', value: 'id' },
      name: 'jobId',
      label: 'Selected Job',
      value: initialData['jobId'],
      validation: yup.string().required('Required'),
    },
  ];
};

export default jobShortListFields;
