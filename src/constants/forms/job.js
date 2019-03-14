import FIELDS from './fields';
import * as yup from 'yup';
import moment from 'moment';
import {
  ASSESSMENT_CATEGORIES,
  SKILLS,
} from '@bit/sidney2hats.2hats.global.common-constants';

const jobFields = initialData => {
  if (!initialData) initialData = {};

  return [
    {
      type: FIELDS.textField,
      name: 'title',
      label: 'Job title',
      value: initialData['title'],
      validation: yup.string().required('Required'),
      width: 6,
    },
    {
      type: FIELDS.textField,
      name: 'companyName',
      label: 'Company name',
      value: initialData['companyName'],
      validation: yup.string().required('Required'),
      width: 6,
    },
    {
      type: FIELDS.richText,
      name: 'companyDescription',
      label: 'Company description',
      value: initialData['companyDescription'],
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.richText,
      name: 'jobDescription',
      label: 'Job description',
      value: initialData['jobDescription'],
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.docAutocompleteMulti,
      name: 'skillsRequired',
      label: 'Skills required',
      value: initialData['skillsRequired'],
      mappings: { label: 'title', value: 'id' },
      collection: 'assessments',
      validation: yup.array(),
      // .min(1)
      // .required('Skills are required'),
    },
    {
      type: FIELDS.autocompleteFreeText,
      name: 'industry',
      label: 'Industry',
      suggestions: ASSESSMENT_CATEGORIES,
      value: ASSESSMENT_CATEGORIES.filter(
        x => x.value === initialData['industry']
      )[0],
      validation: yup.string().required('Industry is required'),
    },
    {
      type: FIELDS.date,
      name: 'closingDate',
      label: 'Closing date',
      value: initialData['closingDate']
        ? initialData['closingDate'].seconds
          ? moment.unix(initialData['closingDate'].seconds).toDate()
          : moment.unix(initialData['closingDate']).toDate()
        : moment()
            .add(1, 'days')
            .toDate(),
      validation: yup
        .date()
        .test(
          'day-from-now',
          'Scheduled time must be at least a day from now',
          value => moment(value).diff(moment(), 'days') >= 1
        )
        .required('Required'),
    },
    {
      type: FIELDS.textField,
      name: 'payRate',
      label: 'Pay rate',
      value: initialData['payRate'],
      validation: yup.string().required('Pay rate is required'),
      width: 6,
    },
    {
      type: FIELDS.autocomplete,
      name: 'payUnits',
      label: 'Pay units',
      value: initialData['payUnits'] && {
        value: initialData['payUnits'],
        label: initialData['payUnits'],
      },
      suggestions: ['per hour', 'per day', 'per week'].map(x => ({
        value: x,
        label: x,
      })),
      validation: yup.string().required('Pay units is required'),
      width: 6,
    },
    {
      type: FIELDS.textField,
      name: 'commitment',
      label: 'Commitment',
      value: initialData['commitment'],
      validation: yup.string().required('Required'),
      width: 6,
    },
    {
      type: FIELDS.autocomplete,
      name: 'commitmentUnits',
      label: 'Commitment units',
      value: initialData['commitmentUnits'] && {
        value: initialData['commitmentUnits'],
        label: initialData['commitmentUnits'],
      },
      suggestions: ['hours per week', 'days per week'].map(x => ({
        value: x,
        label: x,
      })),
      validation: yup.string().required('Required'),
      width: 6,
    },
    {
      type: FIELDS.dropzone,
      name: 'image',
      label: 'Cover image',
      value: initialData['image'],
      mimeTypes: 'image/*',
      path: 'studentPortal/',
      // validation: yup.object().shape({
      //   name: yup.string().required(),
      //   url: yup
      //     .string()
      //     .url('Invalid URL')
      //     .required(),
      // }),
    },
  ];
};

export default jobFields;
