import { firestore } from '../../store';
import { COLLECTIONS } from '../../constants/firestore';

export const createTemplate = async templateObject => {
  const { label, html, design, subject, keys } = templateObject;

  const TemplateDoc = {
    label,
    html,
    design: JSON.stringify(design),
    subject,
    keys,
    createdAt: new Date(),
  };
  console.log(TemplateDoc);
  return await firestore
    .collection(COLLECTIONS.emailTemplates)
    .add(TemplateDoc);
};
