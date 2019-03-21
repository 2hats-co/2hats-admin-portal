import FIELDS from './fields';
import * as yup from 'yup';

const clientsFields = initialData => {
  if (!initialData) initialData = {};

  return [
    {
      type: FIELDS.textField,
      name: 'companyName',
      label: 'Company name',
      value: initialData['companyName'],
      validation: yup.string().required('Required'),
      width: 6,
    },
    {
      type: FIELDS.textField,
      name: 'ACN',
      label: 'ACN',
      value: initialData['ACN'],
      validation: yup.string().required('Required'),
      width: 6,
    },
    {
      type: FIELDS.textField,
      name: 'address',
      label: 'Business Address',
      value: initialData['address'],
      validation: yup.string().required('Required'),
      width: 12,
    },
    {
      type: FIELDS.textField,
      name: 'contactPerson',
      label: 'Contact Person',
      value: initialData['contactPerson'],
      validation: yup.string().required('Required'),
      width: 12,
    },
    {
      type: FIELDS.textField,
      name: 'email',
      label: 'Email',
      value: initialData['email'],
      validation: yup.string().required('Required'),
      width: 12,
    },
    {
      type: FIELDS.textField,
      name: 'contactNumber',
      label: 'Contact Number',
      value: initialData['contactNumber'],
      validation: yup.string().required('Required'),
      width: 12,
    },
  ];
};

export default clientsFields;
