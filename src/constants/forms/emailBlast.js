import * as yup from 'yup';
import FIELDS from './fields';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';

const emailBlastFields = initialData => {
  if (!initialData) initialData = {};

  return [
    {
      type: FIELDS.docAutocomplete,
      collection: COLLECTIONS.emailTemplates,
      mappings: { label: 'label', value: 'id' },
      name: 'templateId',
      label: 'Email template',
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.textField,
      name: 'query',
      label: 'Query',
      validation: yup.string().required('Required'),
      width: 6,
    },
    {
      type: FIELDS.dateTime,
      name: 'scheduleDt',
      label: 'Scheduled date & time',
      validation: yup.string().required('Required'),
      width: 6,
    },
  ];
};

export default emailBlastFields;
