import React, { useState, Suspense, lazy } from 'react';

import LoadingHat from '../../LoadingHat';
import useCollection from '../../../hooks/useCollection';
import { firestore } from '../../../store';
import { COLLECTIONS } from '../../../constants/firestore';
import EmailCampaignFields from '../../../constants/forms/EmailCampaign';
import EmailCampaignCard from './EmailCampaignCard';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';
import EmailTemplates from '../EmailTemplates';
const Form = lazy(() => import('../../Form' /* webpackChunkName: "Form" */));

function EmailCampaigns(props) {
  const { history } = props;
  const [showEditor, setShowEditor] = useState(false);
  const [openedCampaign, setOpenedCampaign] = useState(null);
  const [campaign, setCampaign] = useState(null);
  const createCampaign = data => {
    firestore.collection(COLLECTIONS.emailCampaigns).add({
      ...data,
      createdAt: new Date(),
    });
    setShowEditor(false);
  };
  const updateCampaign = (data, id) => {
    firestore
      .collection(COLLECTIONS.emailCampaigns)
      .doc(id)
      .update({
        ...data,
        updatedAt: new Date(),
      });
    setShowEditor(false);
  };
  const [campaignsState /*campaignsDispatch*/] = useCollection({
    path: COLLECTIONS.emailCampaigns,
  });
  const campaigns = campaignsState.documents;
  if (openedCampaign) {
    return <EmailTemplates campaignId={openedCampaign.id} />;
  }
  if (campaigns) {
    console.log(campaigns);
    return (
      <React.Fragment>
        {campaigns.map(campaign => {
          return (
            <EmailCampaignCard
              campaign={campaign}
              actions={{
                edit: () => {
                  setCampaign(campaign);
                  setShowEditor(true);
                },
                manage: () => {
                  setOpenedCampaign(campaign);
                  history.push(`?id=${campaign.id}`);
                },
              }}
            />
          );
        })}
        <Suspense fallback={<LoadingHat message="Forming it up!" />}>
          <Form
            action={campaign ? 'update' : 'create'}
            actions={{
              create: createCampaign,
              update: data => updateCampaign(data, campaign.id),

              close: () => {
                setCampaign(null);
                setShowEditor(false);
              },
            }}
            open={showEditor}
            data={EmailCampaignFields(campaign)}
            formTitle={campaign ? campaign.query : 'Campaign'}
          />
        </Suspense>
        <Fab
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            zIndex: 99,
          }}
          color="primary"
          onClick={() => {
            setShowEditor(true);
          }}
        >
          <AddIcon />
        </Fab>
      </React.Fragment>
    );
  } else return <LoadingHat message="Loading campaigns…" />;
}

export default withRouter(EmailCampaigns);
