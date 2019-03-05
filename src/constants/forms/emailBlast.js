import * as yup from 'yup';
import FIELDS from './fields';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import moment from 'moment';

const emailBlastFields = initialData => {
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
    {
      type: FIELDS.textField,
      name: 'query',
      label: 'Query',
      value: initialData['query'],
      validation: yup.string().required('Required'),
      width: 6,
    },
    {
      type: FIELDS.dateTime,
      name: 'blastsAt',
      label: 'Scheduled date & time',
      value: initialData['blastsAt']
        ? initialData['blastsAt'].seconds
          ? moment.unix(initialData['blastsAt'].seconds)
          : moment.unix(initialData['blastsAt'])
        : moment()
            .add(1, 'hours')
            .add(5, 'minutes')
            .toDate(),
      validation: yup
        .date()
        .test(
          'hour-from-now',
          'Scheduled time must be at least an hour from now',
          value => moment(value).diff(moment(), 'hours') >= 1
        )
        .required('Required'),
      width: 6,
    },
  ];
};

export default emailBlastFields;
