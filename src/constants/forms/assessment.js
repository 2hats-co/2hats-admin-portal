import FIELDS from './fields';
import * as yup from 'yup';
import ASSESSMENT_CATEGORIES, {
  SUBMISSION_TYPES,
} from '../studentPortal/assessmentCategories';
import SKILLS from '../studentPortal/skills';

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
      ),
      validation: yup.string().required('Category is required'),
    },
    {
      type: FIELDS.autocomplete,
      name: 'skillAssociated',
      label: 'Skill associated',
      value: SKILLS.filter(x => x.value === initialData['skillAssociated']),
      suggestions: SKILLS,
      validation: yup.string().required('Skill is required'),
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
      units: 'h',
      min: 0.5,
      max: 20,
      step: 0.5,
      validation: yup.string().required('Duration is required'),
    },
    {
      type: FIELDS.textFieldMultiline,
      name: 'companyDescription',
      label: 'Company information',
      value: initialData['companyDescription'],
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.textFieldMultiline,
      name: 'jobDescription',
      label: 'Your job',
      value: initialData['jobDescription'],
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.richText,
      name: 'taskInstructions',
      label: 'Task instructions',
      value: initialData['taskInstructions'],
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.autocomplete,
      name: 'submissionType',
      label: 'Submission type',
      value: SUBMISSION_TYPES.filter(
        x => x.value === initialData['skillAssociated']
      ),
      suggestions: SUBMISSION_TYPES,
      validation: yup.string().required('Submission type is required'),
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

export default assessmentFields;
