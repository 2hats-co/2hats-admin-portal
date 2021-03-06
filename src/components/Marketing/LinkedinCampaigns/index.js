import React, { useState, Suspense, lazy } from 'react';
import firebase from 'firebase/app';

import CampaignCard from './CampaignCard';
import LoadingHat from '../../LoadingHat';
import useCollection from '../../../hooks/useCollection';
import { firestore } from '../../../store';
import { COLLECTIONS } from '../../../constants/firestore';
import linkedinCampaignFields from '../../../constants/forms/linkedinCampaign';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const Form = lazy(() => import('../../Form' /* webpackChunkName: "Form" */));

const runCampaign = id => {
  firestore
    .collection(COLLECTIONS.linkedinCampaigns)
    .doc(id)
    .update({
      needsToRun: true,
      isComplete: false,
      updatedAt: new Date(),
    });
};

const rerunCampaign = id => {
  firestore
    .collection(COLLECTIONS.linkedinCampaigns)
    .doc(id)
    .update({
      needsToRun: true,
      isComplete: false,
      startPage: 1,
      updatedAt: new Date(),
    });
};

const deleteCampaign = id => {
  firestore
    .collection(COLLECTIONS.linkedinCampaigns)
    .doc(id)
    .delete();
};

function LinkedinCampaigns(props) {
  // const { classes } = props;
  const [showEditor, setShowEditor] = useState(false);
  const [campaign, setCampaign] = useState(null);
  const createCampaign = data => {
    firestore.collection(COLLECTIONS.linkedinCampaigns).add({
      ...data,
      needsToRun: false,
      requestsCount: 0,
      startPage: 0,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setShowEditor(false);
  };
  const updateCampaign = (data, id) => {
    firestore
      .collection(COLLECTIONS.linkedinCampaigns)
      .doc(id)
      .update({
        ...data,
        needsToRun: false,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setShowEditor(false);
  };
  const [campaignsState /*campaignsDispatch*/] = useCollection({
    path: COLLECTIONS.linkedinCampaigns,
  });
  const campaigns = campaignsState.documents;
  if (campaigns)
    return (
      <>
        {campaigns.map((x, i) => (
          <CampaignCard
            data={x}
            key={i}
            actions={{
              run: runCampaign,
              rerun: rerunCampaign,
              delete: deleteCampaign,
              edit: () => {
                setCampaign(x);
                setShowEditor(true);
              },
            }}
          />
        ))}
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
            data={linkedinCampaignFields(campaign)}
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
      </>
    );
  else return <LoadingHat message="Loading campaigns???" />;
}

export default LinkedinCampaigns;
