import FIELDS from './fields';
import * as yup from 'yup';

const emailTemplateFields = initialData => {
  if (!initialData) initialData = {};
  return [
    {
      type: FIELDS.docAutocomplete,
      name: 'clonedTemplateId',
      label: 'Template Base',
      collection: 'emailTemplates',
      mappings: { label: 'label', value: 'id' },
      placeholder: 'Template Base',
      value: initialData['clonedTemplateId'],
    },
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
      label: 'Sender email – yourname@2hats.com ONLY (optional)',
      placeholder: '2hats <2hats@2hats.com>',
      value: initialData['senderEmail'],
      validation: yup.string(),
    },
  ];
};

export default emailTemplateFields;
