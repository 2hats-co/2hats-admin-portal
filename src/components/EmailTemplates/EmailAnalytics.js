import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import useAnalytics from '../../hooks/useAnalytics';

const deliveryCount = analyticsCollection => ({
  filters: [{ property: 'delivered', operation: '==', value: true }],
  collection: analyticsCollection,
});
const uniqueInteractionCount = (analyticsCollection, interaction) => ({
  filters: [{ property: interaction, operation: '>', value: 0 }],
  collection: analyticsCollection,
});

function EmailAnalytics(props) {
  const { analyticsCollection } = props;
  const deliveries = useAnalytics(deliveryCount(analyticsCollection));
  const uniqueOpens = useAnalytics(
    uniqueInteractionCount(analyticsCollection, 'opens')
  );
  const uniqueClicks = useAnalytics(
    uniqueInteractionCount(analyticsCollection, 'clicks')
  );

  return (
    <Grid container spacing={5}>
      <Grid item>
        <Typography variant="h5">{deliveries}</Typography>
        <Typography variant="body2">Deliveries</Typography>
      </Grid>
      <Grid item>
        <Typography variant="h5">
          {uniqueOpens !== '--' && deliveries !== '--' && deliveries > 0
            ? Math.floor((uniqueOpens / deliveries) * 100)
            : '--'}
          <small>% ({uniqueOpens})</small>
        </Typography>
        <Typography variant="body2">Unique opens</Typography>
      </Grid>
      <Grid item>
        <Typography variant="h5">
          {uniqueClicks !== '--' && deliveries !== '--' && deliveries > 0
            ? Math.floor((uniqueClicks / deliveries) * 100)
            : '--'}
          <small>% ({uniqueClicks})</small>
        </Typography>
        <Typography variant="body2">Unique clicks</Typography>
      </Grid>
    </Grid>
  );
}

export default EmailAnalytics;
