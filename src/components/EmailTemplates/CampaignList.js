import React from 'react';

import LoadingHat from '../LoadingHat';
import useCollection from '../../hooks/useCollection';
import { COLLECTIONS } from '../../constants/firestore';
import EmailCampaignCard from './EmailCampaignCard';

import { withRouter } from 'react-router-dom';

function CampaignList(props) {
  const { history, setCampaign, editCampaign } = props;
  const [campaignsState] = useCollection({
    path: COLLECTIONS.emailCampaigns,
  });
  const campaigns = campaignsState.documents;
  if (campaigns) {
    return (
      <React.Fragment>
        {campaigns.map(campaign => {
          return (
            <EmailCampaignCard
              campaign={campaign}
              actions={{
                edit: () => {
                  editCampaign(campaign);
                  setCampaign(campaign);
                },
                manage: () => {
                  history.push(`?campaignId=${campaign.id}`);
                },
              }}
            />
          );
        })}
      </React.Fragment>
    );
  } else return <LoadingHat message="Loading campaigns…" />;
}

export default withRouter(CampaignList);
