import FIELDS from './fields';
import * as yup from 'yup';

const assessmentCriteriaFields = initialData => {
  if (!initialData) initialData = {};

  return [
    {
      type: FIELDS.textField,
      name: 'title',
      label: 'Title',
      value: initialData['title'],
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.textFieldMultiline,
      name: 'pass',
      label: 'Pass message',
      value: initialData['pass'],
      placeholder:
        'Indicate why the candidate passed this criterion, possibly using the standards of excellence',
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.textFieldMultiline,
      name: 'fail',
      label: 'Fail message',
      value: initialData['fail'],
      placeholder:
        'Indicate why the candidate failed this criterion and list possible reasons why',
      validation: yup.string().required('Required'),
    },
  ];
};

export default assessmentCriteriaFields;
