import FIELDS from './fields';
import * as yup from 'yup';

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
  ];
};

export default emailTemplateFields;
