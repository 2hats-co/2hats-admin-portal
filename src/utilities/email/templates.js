import { firestore } from '../../store';
import { COLLECTIONS } from '../../constants/firestore';
import useDocument from '../../hooks/useDocument';
import { design } from '../../constants/emails/templateDesign';
export const createTemplate = async templateObject => {
  const { label, html, design, subject, keys } = templateObject;

  const TemplateDoc = {
    label,
    html,
    design: JSON.stringify(design),
    subject,
    keys,
    isAdminPortal: true,
    createdAt: new Date(),
    duplicateAllowed: false,
  };
  console.log(TemplateDoc);
  return await firestore
    .collection(COLLECTIONS.emailTemplates)
    .add(TemplateDoc);
};

export const TEMPLATE_BASE = 'templateBase';
export const setTemplateBase = async templateObject => {
  const { label, html, design, subject, keys } = templateObject;

  const TemplateDoc = {
    label,
    html,
    design: JSON.stringify(design),
    subject,
    keys,
    createdAt: new Date(),
    duplicateAllowed: false,
  };
  return await firestore
    .collection(COLLECTIONS.emailTemplates)
    .doc(TEMPLATE_BASE)
    .set(TemplateDoc);
};

export const newTemplate = async (campaignId, type) => {
  const templateDoc = {
    label: 'New template',
    subject: '',
    type,
    keys: [],
    senderEmail: 'hi@2hats.com',
    delay: 0,
    createdAt: new Date(),
    campaignId,
    design: JSON.stringify(design),
    duplicateAllowed: false,
  };
  console.log(templateDoc);
  return await firestore
    .collection(COLLECTIONS.emailTemplates)
    .add(templateDoc);
};
export const useEmailTemplate = id => {
  const [templateDoc] = useDocument({
    path: `${COLLECTIONS.emailTemplates}/${id}`,
  });
  return templateDoc.doc;
};
export const updateTemplate = async templateObject => {
  const {
    docId,
    label,
    html,
    design,
    subject,
    keys,
    type,
    senderEmail,
    delay,
  } = templateObject;

  const templateDoc = {
    label,
    type,
    html,
    design: JSON.stringify(design),
    subject,
    keys,
    delay,
    senderEmail,
    updatedAt: new Date(),
    duplicateAllowed: false,
  };
  return await firestore
    .collection(COLLECTIONS.emailTemplates)
    .doc(docId)
    .update(templateDoc);
};
