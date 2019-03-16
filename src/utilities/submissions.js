import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import { updateDoc, getDoc } from './firestore';
import { removeHtmlTags } from './index';

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

export const submitFeedback = (id, UID, outcome, generalComments, feedback) => {
  const filteredFeedback = feedback.filter(
    x =>
      !!x.outcome &&
      !!x.message &&
      !!x.title &&
      typeof x.message === 'string' &&
      removeHtmlTags(x.message).length > 0
  );

  const outputFeedback =
    removeHtmlTags(generalComments).length > 0
      ? [
          { title: 'General comments', message: generalComments },
          ...filteredFeedback,
        ]
      : filteredFeedback;

  console.log('Setting feedback for', id, outcome, outputFeedback);

  updateDoc(COLLECTIONS.submissions, id, {
    outcome,
    screened: true,
    feedback: outputFeedback,
  });

  setUserSkills(UID, id, outcome);
};

const setUserSkills = async (UID, skillId, outcome) => {
  const user = await getDoc(COLLECTIONS.users, UID);

  if (outcome === 'pass') {
    if (user.skills) {
      if (!user.skills.includes(skillId))
        updateDoc(COLLECTIONS.users, UID, {
          skills: [...user.skills, skillId],
        });
    } else {
      updateDoc(COLLECTIONS.users, UID, {
        skills: [skillId],
      });
    }
  } else {
    if (user.skills && user.skills.includes(skillId)) {
      const newSkills = user.skills;
      newSkills.splice(newSkills.indexOf(skillId), 1);
      updateDoc(COLLECTIONS.users, UID, {
        skills: newSkills,
      });
    }
  }
};
