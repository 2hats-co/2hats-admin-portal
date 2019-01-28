import FIELDS from './fields';
import findIndex from 'ramda/es/findIndex';
import propEq from 'ramda/es/propEq';
import * as yup from 'yup';
import TRIGGERS from '../studentPortal/triggers';
const getLabels = (values, options) => {
  return values.map(value => {
    let index = findIndex(propEq('value', value))(options);
    return options[index];
  });
};
const emailTemplateFields = initialData => {
  if (!initialData) initialData = {};
  return [
    {
      type: FIELDS.textField,
      name: 'label',
      label: 'Name',
      placeholder: 'Template Name',
      value: initialData['label'],
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.textField,
      name: 'subject',
      label: 'Subject',
      placeholder: 'email subject',
      value: initialData['subject'],
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.textField,
      name: 'senderEmail',
      label: 'Sender email',
      placeholder: 'example@2hats.com',
      value: initialData['senderEmail'],
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.autocompleteMulti,
      name: 'triggers',
      label: 'Triggers',
      value: initialData['triggers']
        ? getLabels(initialData['triggers'], TRIGGERS)
        : [],
      suggestions: TRIGGERS,
      validation: yup
        .array()
        .min(1)
        .required('a trigger is required'),
    },
  ];
};

export default emailTemplateFields;
