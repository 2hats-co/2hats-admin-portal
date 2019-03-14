import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import { updateDoc, getDoc } from './firestore';

export const handleFail = async submission => {
  updateDoc(COLLECTIONS.submissions, submission.id, {
    outcome: 'fail',
    screened: true,
  });

  if (submission.type === 'assessment') {
    const user = await getDoc(COLLECTIONS.users, submission.UID);

    if (user.skills && user.skills.includes(submission.skillAssociated)) {
      const newSkills = user.skills;
      newSkills.splice(newSkills.indexOf(submission.skillAssociated), 1);
      updateDoc(COLLECTIONS.users, submission.UID, {
        skills: newSkills,
      });
    }
  }
};

export const handlePass = async submission => {
  updateDoc(COLLECTIONS.submissions, submission.id, {
    outcome: 'pass',
    screened: true,
  });

  if (submission.type === 'assessment') {
    const user = await getDoc(COLLECTIONS.users, submission.UID);

    if (user.skills) {
      if (!user.skills.includes(submission.skillAssociated))
        updateDoc(COLLECTIONS.users, submission.UID, {
          skills: [...user.skills, submission.skillAssociated],
        });
    } else {
      updateDoc(COLLECTIONS.users, submission.UID, {
        skills: [submission.skillAssociated],
      });
    }
  }
};
