import FIELDS from './fields';
import * as yup from 'yup';

const assessmentCriteriaFields = initialMessage => [
  {
    type: FIELDS.richText,
    name: 'message',
    label: 'Message',
    value: initialMessage || '',
    validation: yup.string().required('Required'),
    autoFocus: true,
  },
];

export default assessmentCriteriaFields;
