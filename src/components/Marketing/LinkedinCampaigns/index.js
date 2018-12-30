import React, { useState } from 'react';

//import CampaignEditor from './CampaignEditor';
import CampaignCard from './CampaignCard';
import LoadingHat from '../../LoadingHat';
import useCollection from '../../../hooks/useCollection';
import { firestore } from '../../../store';
import { COLLECTIONS } from '../../../constants/firestore';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Loadable from 'react-loadable';

const CampaignEditor = Loadable({
  loader: () =>
    import('./CampaignEditor' /* webpackChunkName: "CampaignEditor" */),
  loading: LoadingHat,
});

const runCampaign = id => {
  firestore
    .collection(COLLECTIONS.linkedinCampaigns)
    .doc(id)
    .update({
      needsToRun: true,
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
      createdAt: new Date(),
    });
    setShowEditor(false);
  };
  const updateCampaign = data => {
    firestore
      .collection(COLLECTIONS.linkedinCampaigns)
      .doc(data.id)
      .update({
        ...data,
        needsToRun: false,
        updatedAt: new Date(),
      });
    setShowEditor(false);
  };
  const [campaignsState /*campaignsDispatch*/] = useCollection({
    path: COLLECTIONS.linkedinCampaigns,
  });
  const campaigns = campaignsState.documents;
  if (campaigns)
    return (
      <React.Fragment>
        {campaigns.map((x, i) => (
          <CampaignCard
            data={x}
            key={i}
            actions={{
              run: runCampaign,
              delete: deleteCampaign,
              edit: () => {
                setCampaign(x);
                setShowEditor(true);
              },
            }}
          />
        ))}
        <CampaignEditor
          open={showEditor}
          campaign={campaign}
          action={campaign ? 'update' : 'create'}
          actions={{
            create: createCampaign,
            update: updateCampaign,
            close: () => {
              setCampaign(null);
              setShowEditor(false);
            },
          }}
        />
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
  else return <LoadingHat message="Loading campaigns…" />;
}

export default LinkedinCampaigns;
