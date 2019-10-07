import { addDoc } from '../firestore';
import { COLLECTIONS } from '../../constants/firestore';
export const shortListCandidates = (jobId, candidates) => {
  candidates.forEach(candidate => {
    console.log(
      `${COLLECTIONS.jobs}/${jobId}/${COLLECTIONS.shortList}`,
      candidate
    );
    const { firstName, lastName, bio, objectID, avatarURL } = candidate;
    addDoc(
      `${COLLECTIONS.jobs}/${jobId}/${COLLECTIONS.shortList}`,
      {
        firstName,
        lastName,
        bio: bio || '',
        UID: objectID,
        avatarURL: avatarURL || '',
      },
      objectID
    );
  });
};
