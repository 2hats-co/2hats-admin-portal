import FIELDS from './fields';
import findIndex from 'ramda/es/findIndex';

import * as yup from 'yup';
import propEq from 'ramda/es/propEq';
import { TRIGGERS } from '@bit/sidney2hats.2hats.global.common-constants';

// const getLabel = (value, options) => {
//   let index = findIndex(propEq('value', value))(options);
//   return options[index];
// };
const getLabels = (values, options) => {
  return values.map(value => {
    let index = findIndex(propEq('value', value))(options);
    return options[index];
  });
};
const EmailCampaignFields = initialData => {
  if (!initialData) initialData = {};
  return [
    {
      type: FIELDS.textField,
      name: 'label',
      label: 'Campaign Name',
      value: initialData['label'],
      validation: yup.string().required('Campaign Name is required!'),
    },
    {
      type: FIELDS.autocompleteMulti,
      name: 'startTriggers',
      label: 'Start Triggers',
      value: initialData['pauseTriggers']
        ? getLabels(initialData['pauseTriggers'], TRIGGERS)
        : [],
      suggestions: TRIGGERS,
      validation: yup
        .array()
        .min(1)
        .required('Skills are required'),
    },
    {
      type: FIELDS.autocompleteMulti,
      name: 'pauseTriggers',
      label: 'Pause Triggers',
      value: initialData['pauseTriggers']
        ? getLabels(initialData['pauseTriggers'], TRIGGERS)
        : [],
      suggestions: TRIGGERS,
      validation: yup
        .array()
        .min(1)
        .required('Skills are required'),
    },
  ];
};
// d
export default EmailCampaignFields;
