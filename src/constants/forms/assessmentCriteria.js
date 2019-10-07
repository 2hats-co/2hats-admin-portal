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
      type: FIELDS.richText,
      name: 'pass',
      label: 'Pass message',
      value: initialData['pass'],
      placeholder:
        'Indicate why the candidate passed this criterion, using the standards of excellence for this task.',
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.richText,
      name: 'fail',
      label: 'Fail message',
      value: initialData['fail'],
      placeholder:
        'Indicate why the candidate failed this criterion and list possible reasons why. Include what their submission must and should include.',
      validation: yup.string().required('Required'),
    },
  ];
};

export default assessmentCriteriaFields;
