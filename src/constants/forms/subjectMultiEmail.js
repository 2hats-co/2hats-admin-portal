import * as yup from 'yup';
import FIELDS from './fields';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';

const subjectMultiEmailFields = initialData => {
  if (!initialData) initialData = {};

  return [
    {
      type: FIELDS.docAutocomplete,
      collection: COLLECTIONS.emailTemplates,
      mappings: { label: 'label', value: 'id' },
      name: 'templateId',
      label: 'Email template',
      value: initialData['templateId'],
      validation: yup.string().required('Required'),
    },
  ];
};

export default subjectMultiEmailFields;
