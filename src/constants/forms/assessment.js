import FIELDS from './fields';
import * as yup from 'yup';
import {
  ASSESSMENT_CATEGORIES,
  SUBMISSION_TYPES,
  SKILLS,
} from '@bit/sidney2hats.2hats.global.common-constants';

const assessmentFields = initialData => {
  if (!initialData) initialData = {};

  return [
    {
      type: FIELDS.autocompleteFreeText,
      name: 'category',
      label: 'Category',
      suggestions: ASSESSMENT_CATEGORIES,
      value: ASSESSMENT_CATEGORIES.filter(
        x => x.value === initialData['category']
      )[0],
      validation: yup.string().required('Category is required'),
      width: 6,
    },
    {
      type: FIELDS.autocomplete,
      name: 'skillAssociated',
      label: 'Skill associated',
      value: SKILLS.filter(x => x.value === initialData['skillAssociated'])[0],
      suggestions: SKILLS,
      validation: yup.string().required('Skill is required'),
      width: 6,
    },
    {
      type: FIELDS.textField,
      name: 'title',
      label: 'Title',
      value: initialData['title'],
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.textField,
      name: 'duration',
      label: 'Duration',
      value: initialData['duration'],
    },
    {
      type: FIELDS.richText,
      name: 'companyDescription',
      label: 'Company information',
      value: initialData['companyDescription'],
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.richText,
      name: 'jobDescription',
      label: 'Your job',
      value: initialData['jobDescription'],
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.richText,
      name: 'taskInstructions',
      label: 'Task instructions',
      placeholder: 'Copy-paste main instructions here',
      value: initialData['taskInstructions'],
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.richText,
      name: 'relatedMaterial',
      label: 'Related material',
      value: initialData['relatedMaterial'],
      validation: yup.string(),
    },
    {
      type: FIELDS.autocomplete,
      name: 'submissionType',
      label: 'Submission type',
      value: SUBMISSION_TYPES.filter(
        x => x.value === initialData['submissionType']
      )[0],
      suggestions: SUBMISSION_TYPES,
      validation: yup.string().required('Submission type is required'),
    },
    {
      type: FIELDS.textFieldMultiline,
      name: 'codePreset',
      label: 'Code preset (optional – only for IDEO submission type)',
      value: initialData['codePreset'],
      validation: yup.string(),
      placeholder:
        'Make sure it is a valid JSON!\n\nBest to use JSON.stringify() in your browser’s console\n\nYou can set the html, css, js, htmlMode, cssMode, jsMode properties',
    },
    {
      type: FIELDS.richTextMulti,
      name: 'questions',
      label: 'Questions (optional)',
      value: initialData['questions'] || [],
      validation: yup.array(yup.string()),
    },
    {
      type: FIELDS.slider,
      name: 'questionsDisplayed',
      label: 'Questions displayed',
      value: initialData['questionsDisplayed'],
      units: 'questions',
      min: 0,
      max: 20,
      step: 1,
      validation: yup.number().when('questions', (questions, schema) => {
        if (questions.length === 0)
          return schema
            .min(0, 'Must be 0 since there are no questions')
            .max(0, 'Must be 0 since there are no questions');
        return schema
          .min(1, 'Must show at least 1 question')
          .max(
            questions.length,
            `Cannot show more than the total number of questions (${
              questions.length
            })`
          );
      }),
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

export default assessmentFields;
