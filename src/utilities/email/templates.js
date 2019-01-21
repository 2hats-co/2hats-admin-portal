import { firestore } from '../../store';
import { COLLECTIONS } from '../../constants/firestore';
import useDocument from '../../hooks/useDocument';
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
    isAdminPortal: false,
  };
  return await firestore
    .collection(COLLECTIONS.emailTemplates)
    .doc(TEMPLATE_BASE)
    .set(TemplateDoc);
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
  };
  return await firestore
    .collection(COLLECTIONS.emailTemplates)
    .doc(docId)
    .update(templateDoc);
};
