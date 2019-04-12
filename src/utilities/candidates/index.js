import { addDoc } from '../firestore';
import { COLLECTIONS } from '../../constants/firestore';
export const shortListCandidates = (jobId, candidates) => {
  candidates.forEach(candidate => {
    //candidate {UID,firstname,lastName,avatarURL}
    addDoc(`${COLLECTIONS.jobs}/${jobId}`, candidate);
  });
};
