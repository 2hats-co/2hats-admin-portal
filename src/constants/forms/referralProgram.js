import FIELDS from './fields';
import * as yup from 'yup';

export const referralProgramCreateFields = initialData => {
  if (!initialData) initialData = {};

  return [
    {
      type: FIELDS.textField,
      name: 'label',
      label: 'Label',
      value: initialData['label'],
      placeholder: 'Write an easy-to-read label here',
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.textField,
      name: 'referrerId',
      label: 'Referrer Code',
      value: initialData['referrerId'],
      placeholder: 'The code used in the link sent to students',
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.textFieldNumber,
      name: 'paymentRate',
      label: 'Payment rate for each job placement (dollars)',
      value: initialData['paymentRate']
        ? initialData['paymentRate']['jobPlacements']
        : 0,
      placeholder: '100',
      validation: yup
        .number()
        .min(0)
        .required(),
    },
  ];
};
export const referralProgramEditFields = initialData => {
  if (!initialData) initialData = {};

  return [
    {
      type: FIELDS.textField,
      name: 'label',
      label: 'Label',
      value: initialData['label'],
      placeholder: 'Write an easy-to-read label here',
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.textFieldNumber,
      name: 'paymentRate',
      label: 'Payment rate for each job placement (dollars)',
      value: initialData['paymentRate']
        ? initialData['paymentRate']['jobPlacements']
        : 0,
      placeholder: '100',
      validation: yup
        .number()
        .min(0)
        .required(),
    },
  ];
};
