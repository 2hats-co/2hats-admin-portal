import FIELDS from './fields';
import * as yup from 'yup';

const emailTemplateFields = initialData => {
  if (!initialData) initialData = {};
  return [
    {
      type: FIELDS.autocomplete,
      name: 'type',
      label: 'Type',
      value: {
        label: initialData['type'],
        value: initialData['type'],
      },
      suggestions: [
        {
          label: 'Conversations',
          value: 'conversations',
        },
        {
          label: 'Transactional',
          value: 'transactional',
        },
        {
          label: 'Promotional',
          value: 'promotional',
        },
      ],
      validation: yup.string().required('Type is required'),
    },
    {
      type: FIELDS.autocompleteMulti,
      name: 'keys',
      label: 'Keys',
      value: initialData['keys'].map(v => ({
        label: v,
        value: v,
      })),
      suggestions: [
        '{{firstName}}',
        '{{lastName}}',
        '{{senderName}}',
        '{{senderTitle}}',
      ].map(x => ({
        value: x,
        label: x,
      })),
      validation: yup
        .array()
        .min(1)
        .required('Keys are required'),
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
      placeholder: 'example@2hats.com',
      value: initialData['subject'],
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.slider,
      name: 'delay',
      label: 'Delay',
      value: initialData['delay'],
      units: 'days',
      min: 0,
      max: 20,
      step: 1,
      validation: yup
        .number()
        .min(0)
        .max(20)
        .required('Delay is required'),
    },
  ];
};

export default emailTemplateFields;
