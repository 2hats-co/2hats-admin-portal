import React, { useEffect } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import useDocument from '../../../../hooks/useDocument';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
    background: theme.palette.background.paper,
  },

  divider: {
    margin: `${theme.spacing.unit * 3}px 0`,
  },
});

const BlastDetails = props => {
  const { classes, data } = props;

  const [templateState, templateDispatch] = useDocument();
  const templateDoc = templateState.doc;

  useEffect(
    () => {
      if (data.templateId)
        templateDispatch({
          path: `${COLLECTIONS.emailTemplates}/${data.templateId}`,
        });
    },
    [data]
  );

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid container spacing={40}>
        <Grid item>
          <Typography variant="body2">Search query</Typography>
          <Typography variant="h5">{data.query}</Typography>
        </Grid>

        <Grid item>
          <Typography variant="body2">Scheduled for</Typography>
          <Typography variant="h5">{data.scheduleDt}</Typography>
        </Grid>
      </Grid>

      <Divider className={classes.divider} />

      <Typography variant="h6" gutterBottom>
        Analytics
      </Typography>
      <Typography>Your analytics go here</Typography>

      <Divider className={classes.divider} />

      <Typography variant="h6" gutterBottom>
        Preview
      </Typography>
      {templateDoc && (
        <div dangerouslySetInnerHTML={{ __html: templateDoc.html }} />
      )}
    </Grid>
  );
};

export default withStyles(styles)(BlastDetails);
