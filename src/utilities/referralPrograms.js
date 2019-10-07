import { updateDoc, createDoc } from './firestore';

export const addSociety = (data, adminId) =>
  createDoc('societies', { ...data, assignee: adminId });

export const updateSocietyInfo = (id, data) => updateDoc('societies', id, data);

export const addReferralProgram = (societyId, data) => {
  const sanitisedData = {
    ...data,
    societyId,
    referrerType: 'society',
    clicks: 0,
    signups: 0,
    signins: 0,
    assessmentStarts: 0,
    assessmentPasses: 0,
    jobPlacements: 0,
    jobSubmissions: 0,
  };

  // Hard-code to paymentRate for jobPlacements ONLY
  // WARNING - UPDATEDOC MIGHT NOT DO A DEEP COPY OF THE OBJECT
  sanitisedData.paymentRate = { jobPlacements: data.paymentRate };

  return createDoc('referralPrograms', sanitisedData, sanitisedData.referrerId);
};

export const updateReferralProgram = (id, data) => {
  const sanitisedData = { ...data };

  // Hard-code to paymentRate for jobPlacements ONLY
  // WARNING - UPDATEDOC MIGHT NOT DO A DEEP COPY OF THE OBJECT
  sanitisedData.paymentRate = { jobPlacements: data.paymentRate };

  return updateDoc('referralPrograms', id, sanitisedData);
};

export const addPaymentRecord = (societyId, data) => {
  const sanitisedData = { ...data, ...data.referralProgram };
  delete sanitisedData.referralProgram;
  return createDoc(`societies/${societyId}/paymentRecords`, sanitisedData);
};
