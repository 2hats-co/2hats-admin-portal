import FIELDS from './fields';
import * as yup from 'yup';

const linkedinCampaignFields = initialData => {
  if (!initialData) initialData = {};
  return [
    {
      type: FIELDS.textField,
      name: 'email',
      label: 'LinkedIn email',
      value: initialData['email'],
      validation: yup
        .string()
        .email('Invalid email address')
        .required('Email is required!'),
    },
    {
      type: FIELDS.textFieldPassword,
      name: 'password',
      label: 'LinkedIn password',
      value: initialData['password'],
      validation: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    },
    {
      type: FIELDS.textField,
      name: 'query',
      label: 'Search query',
      value: initialData['query'],
      validation: yup.string().required('Query is required'),
    },
    {
      type: FIELDS.autocomplete,
      name: 'location',
      label: 'Location',
      value: initialData['location'] || '["au:4910"]',
      suggestions: [
        { value: '["au:4910"]', label: 'Sydney' },
        { value: '["au:4900"]', label: 'Melbourne' },
      ],
      validation: yup.string().required('Location are required'),
    },
    {
      type: FIELDS.chipFreeText,
      name: 'ignoreList',
      label: 'Ignore term',
      value: initialData['ignoreList'] || [],
      validation: yup.array(),
    },
    {
      type: FIELDS.chipFreeText,
      name: 'requiredList',
      label: 'Required term',
      value: initialData['requiredList'] || [],
      validation: yup.array(),
    },
    {
      type: FIELDS.textFieldMultiline,
      name: 'message',
      label: 'Message',
      value: initialData['message'],
      validation: yup.string().required('Message is required'),
    },
    {
      type: FIELDS.checkbox,
      name: 'daily',
      label: 'Trigger daily',
      value: !!initialData['daily'],
      validation: yup.boolean(),
    },
    {
      type: FIELDS.slider,
      name: 'connectionsPerSession',
      label: 'Connections per session',
      value: initialData['connectionsPerSession'],
      min: 5,
      max: 100,
      step: 5,
      validation: yup
        .number()
        .min(1)
        .max(100)
        .required('Connections per session is required'),
    },
    {
      type: FIELDS.slider,
      name: 'startPage',
      label: 'Start Page',
      value: initialData['startPage'],
      min: 1,
      max: 100,
      step: 1,
      validation: yup
        .number()
        .min(1)
        .max(100)
        .required('Connections per session is required'),
    },
  ];
};

export default linkedinCampaignFields;
