import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import useAnalytics from '../../../../hooks/useAnalytics';

const deliveryCount = templateId => ({
  filters: [{ property: 'delivered', operation: '==', value: true }],
  collection: `emailTemplates/${templateId}/analytics`,
});
const uniqueInteractionCount = (templateId, interaction) => ({
  filters: [{ property: interaction, operation: '>', value: 0 }],
  collection: `emailTemplates/${templateId}/analytics`,
});

function EmailAnalytics(props) {
  const deliveries = useAnalytics(deliveryCount('id'));
  const uniqueOpens = useAnalytics(uniqueInteractionCount('id', 'opens'));
  const uniqueClicks = useAnalytics(uniqueInteractionCount('id', 'clicks'));

  return (
    <Grid container spacing={40}>
      <Grid item>
        <Typography variant="h5">{deliveries}</Typography>
        <Typography variant="body2">Deliveries</Typography>
      </Grid>
      <Grid item>
        <Typography variant="h5">{uniqueOpens}</Typography>
        <Typography variant="body2">Unique opens</Typography>
      </Grid>
      <Grid item>
        <Typography variant="h5">{uniqueClicks}</Typography>
        <Typography variant="body2">Unique clicks</Typography>
      </Grid>
    </Grid>
  );
}

export default EmailAnalytics;
