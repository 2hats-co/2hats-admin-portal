import FIELDS from './fields';
import * as yup from 'yup';

const jobFields = initialData => {
  if (!initialData) initialData = {};
  return [
    {
      type: FIELDS.textField,
      name: 'title',
      label: 'Event title',
      value: initialData['title'],
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.dateTime,
      name: 'startDateTime',
      label: 'Start date & time',
      value: initialData['startDateTime'],
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.dateTime,
      name: 'endDateTime',
      label: 'End date & time',
      value: initialData['endDateTime'],
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.textFieldMultiline,
      name: 'description',
      label: 'Description',
      value: initialData['description'],
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.date,
      name: 'registrationEndDate',
      label: 'Registration end date',
      value: initialData['registrationEndDate'],
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.dropzone,
      name: 'image',
      label: 'Cover image',
      value: initialData['image'],
      mimeTypes: 'image/*',
      path: 'studentPortal/',
      validation: yup.object().shape({
        name: yup.string().required(),
        url: yup
          .string()
          .url('Invalid URL')
          .required(),
      }),
    },
  ];
};

export default jobFields;
