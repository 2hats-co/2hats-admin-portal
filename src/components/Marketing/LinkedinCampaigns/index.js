import React from 'react';

import CampaignEditor from './CampaignEditor';
import CampaignCard from './CampaignCard';
import LoadingHat from '../../LoadingHat';
import useCollection from '../../../hooks/useCollection';
import { firestore } from '../../../store';
import { COLLECTIONS } from '../../../constants/firestore';
const createCampaign = data => {
  firestore.collection(COLLECTIONS.linkedinCampaigns).add({
    ...data,
    needsToRun: false,
    ConnectionsPerSession: 4,
    requestsCount: 0,
    startPage: 0,
    createdAt: new Date(),
  });
};
const runCampaign = id => {
  firestore
    .collection(COLLECTIONS.linkedinCampaigns)
    .doc(id)
    .update({
      needsToRun: true,
    });
};
function LinkedinCampaigns(props) {
  const { classes } = props;
  const [campaignsState, campaignsDispatch] = useCollection(
    COLLECTIONS.linkedinCampaigns,
    {}
  );
  const campaigns = campaignsState.documents;
  if (campaigns)
    return (
      <React.Fragment>
        {campaigns.map((x, i) => (
          <CampaignCard data={x} key={i} actions={{ run: runCampaign }} />
        ))}
        <CampaignEditor action="Action" actions={{ create: createCampaign }} />
      </React.Fragment>
    );
  else return LoadingHat;
}

export default LinkedinCampaigns;
