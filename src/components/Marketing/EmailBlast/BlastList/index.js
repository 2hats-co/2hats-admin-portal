import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import useCollection from '../../../../hooks/useCollection';
import Item from './Item';
import ScrollyRolly from '../../../ScrollyRolly';

import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  root: { height: 'calc(100vh - 64px)' },

  adminSelectorWrapper: {
    marginTop: -theme.spacing.unit * 7,
    marginBottom: theme.spacing.unit,
    textAlign: 'right',
    paddingRight: theme.spacing.unit,
    width: '100%',
  },
  tabsWrapper: { width: '100%' },
  tabs: {
    boxShadow: `0 -1px 0 ${theme.palette.divider} inset`,
  },
  tabLabelContainer: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  noConvs: {
    height: '100%',
    color: theme.palette.text.secondary,
    textAlign: 'center',
    cursor: 'default',
    userSelect: 'none',
    '& svg': {
      fontSize: 48,
      color: theme.palette.text.disabled,
    },
  },
});

function BlastList(props) {
  const { classes, setSelectedBlast, selectedBlast } = props;

  const [blastsState, blastsDispatch, loadMore] = useCollection({
    path: COLLECTIONS.emailBlasts,
    sort: [{ field: 'blastsAt', direction: 'desc' }],
    filters: [],
  });
  const blasts = blastsState.documents;

  if (blastsState.loading)
    return (
      <Grid
        container
        style={{ height: '100%' }}
        justify="center"
        alignItems="center"
      >
        <CircularProgress size={64} />
      </Grid>
    );

  return (
    <div className={classes.root}>
      {blasts && blasts.length === 0 ? (
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.noConvs}
        >
          <Grid item>
            <Typography variant="subtitle1" color="textSecondary">
              No blasts
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <div style={{ overflowY: 'scroll', height: '100%' }}>
          <ScrollyRolly
            classes={{ listLoader: classes.listLoader }}
            dataState={blastsState}
            dataDispatch={blastsDispatch}
            loadMore={loadMore}
            disablePadding
          >
            {data => (
              <Item
                onClick={() => {
                  setSelectedBlast(data);
                }}
                data={data}
                key={data.id}
                selected={selectedBlast && data.id === selectedBlast.id}
              />
            )}
          </ScrollyRolly>
        </div>
      )}
    </div>
  );
}

export default withStyles(styles)(BlastList);
