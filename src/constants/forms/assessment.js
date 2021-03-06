import FIELDS from './fields';
import * as yup from 'yup';
import {
  ASSESSMENT_CATEGORIES,
  SUBMISSION_TYPES,
} from '@bit/sidney2hats.2hats.global.common-constants';

const assessmentFields = initialData => {
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
      type: FIELDS.textField,
      name: 'duration',
      label: 'Duration',
      value: initialData['duration'],
      width: 6,
    },
    {
      type: FIELDS.richText,
      name: 'briefing',
      label: 'Briefing (BEFORE user clicks Get started)',
      value:
        initialData['briefing'] ||
        initialData['companyDescription'] + initialData['jobDescription'],
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.richText,
      name: 'taskInstructions',
      label: 'Task instructions (AFTER user clicks Get started)',
      placeholder:
        'Copy-paste main instructions here. You can also put related material here',
      value: initialData['taskInstructions'],
      validation: yup.string().required('Required'),
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
      displayCondition: values => values.submissionType.value === 'ideo',
    },
    {
      type: FIELDS.richTextMulti,
      name: 'questions',
      label: 'Questions (optional)',
      value: initialData['questions'] || [],
      validation: yup.array(yup.string()),
      displayCondition: values =>
        values.submissionType.value !== 'mailchimp' &&
        values.submissionType.value !== 'ideo',
    },
    {
      type: FIELDS.checkbox,
      name: 'randomiseQuestionOrder',
      label: 'Randomise question order',
      value: initialData['randomiseQuestionOrder'],
      displayCondition: values =>
        values.questions.length > 0 || values.randomiseQuestionOrder,
    },
    {
      type: FIELDS.slider,
      name: 'questionsDisplayed',
      label: 'Questions displayed',
      value: initialData['questionsDisplayed'],
      units: 'questions',
      min: 1,
      max: 20,
      step: 1,
      validation: yup
        .number()
        .when('questions', (questions, schema) =>
          schema
            .min(1, 'Must show at least 1 question')
            .max(
              questions.length > 0 ? questions.length : 1,
              `Cannot show more than the total number of questions (${
                questions.length
              })`
            )
        ),
      displayCondition: values => values.randomiseQuestionOrder,
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
