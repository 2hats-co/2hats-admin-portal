import FIELDS from './fields';
import * as yup from 'yup';

import { UNIVERSITIES } from '../universityList';

const societyProfileFields = initialData => {
  if (!initialData) initialData = {};

  return [
    {
      type: FIELDS.textField,
      name: 'societyName',
      label: 'Society Name',
      value: initialData['societyName'],
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.autocompleteFreeText,
      name: 'university',
      label: 'University',
      value: initialData['university'] && {
        label: initialData['university'],
        value: initialData['university'],
      },
      suggestions: UNIVERSITIES.map(x => ({
        label: x,
        value: x.split('\u2063')[0],
      })),
      validation: yup
        .object({
          value: yup.string().required('Required'),
          label: yup.string(),
        })
        .required('Required'),
    },
    {
      type: FIELDS.textField,
      name: 'firstName',
      label: 'First Name',
      value: initialData['firstName'],
      validation: yup.string().required('Required'),
      width: 6,
    },
    {
      type: FIELDS.textField,
      name: 'lastName',
      label: 'Last Name',
      value: initialData['lastName'],
      validation: yup.string().required('Required'),
      width: 6,
    },
    {
      type: FIELDS.textField,
      name: 'email',
      label: 'Email',
      value: initialData['email'],
      validation: yup
        .string()
        .email()
        .required('Required'),
    },
    {
      type: FIELDS.textField,
      name: 'mobileNumber',
      label: 'Mobile Number',
      value: initialData['mobileNumber'],
      validation: yup
        .string()
        .min(
          10,
          'Please enter a 10-digit Australian mobile number with no spaces'
        )
        .max(
          10,
          'Please enter a 10-digit Australian mobile number with no spaces'
        )
        .required(
          'Please enter a 10-digit Australian mobile number with no spaces'
        ),
    },
    {
      type: FIELDS.textField,
      name: 'bankAccName',
      label: 'Bank Account Name',
      value: initialData['bankAccName'],
      validation: yup.string(),
    },
    {
      type: FIELDS.textField,
      name: 'bankBsb',
      label: 'Bank Account Name',
      value: initialData['bankBsb'],
      validation: yup.string(),
      width: 5,
    },
    {
      type: FIELDS.textField,
      name: 'bankAccNo',
      label: 'Bank Account Number',
      value: initialData['bankAccNo'],
      validation: yup.string(),
      width: 7,
    },
  ];
};

export default societyProfileFields;
