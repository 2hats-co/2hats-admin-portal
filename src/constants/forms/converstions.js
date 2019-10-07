import FIELDS from './fields';
import * as yup from 'yup';

const conversationsFields = initialData => {
  if (!initialData) initialData = {};

  return [
    {
      type: FIELDS.textField,
      name: 'firstName',
      label: 'First name',
      value: initialData['firstName'],
      validation: yup.string().required('Required'),
      width: 6,
    },
    {
      type: FIELDS.textField,
      name: 'lastName',
      label: 'Last name',
      value: initialData['lastName'],
      validation: yup.string().required('Required'),
      width: 6,
    },
    {
      type: FIELDS.textField,
      name: 'email',
      label: 'Email',
      value: initialData['email'],
      validation: yup.string().required('Required'),
      width: 12,
    },
  ];
};

export default conversationsFields;
