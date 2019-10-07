import FIELDS from './fields';
import * as yup from 'yup';

const paymentRecordFields = societyId => [
  {
    type: FIELDS.docAutocomplete,
    name: 'referralProgram',
    label: 'Referral program',
    mappings: {
      label: 'label',
      value: doc => ({
        label: doc.label,
        referralProgramId: doc.id,
      }),
    },
    collection: 'referralPrograms',
    filters: [{ field: 'societyId', operator: '==', value: societyId }],
    validation: yup
      .object({
        value: yup.string().required('Required'),
        label: yup.string(),
      })
      .required('Required'),
  },
  {
    type: FIELDS.textFieldNumber,
    name: 'amount',
    label: 'Amount paid in dollars',
    placeholder: '100',
    validation: yup
      .number()
      .min(0)
      .required(),
  },
  {
    type: FIELDS.dateTime,
    name: 'paidAt',
    label: 'Paid at',
    value: new Date(),
    validation: yup.date().required('Required'),
  },
];

export default paymentRecordFields;
