import React, { useContext } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import BlastStatusIcon from '../BlastStatusIcon';

import moment from 'moment';
import { momentLocales } from '../../../../constants/momentLocales';

import { AdminsContext } from '../../../../contexts/AdminsContext';

const styles = theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  selectedItem: {
    backgroundColor: `${theme.palette.primary.light} !important`,
    color: `${theme.palette.primary.darkText} !important`,
  },

  statusIcon: {
    fontSize: 20,
    marginRight: theme.spacing(1),
  },

  listItemTextRoot: {
    paddingRight: 0,
  },
  primaryText: {
    marginBottom: theme.spacing(0.5),
    '& *': { lineHeight: '1.25 !important' },
  },
  timestamp: {
    color: theme.palette.text.secondary,
    display: 'inline-block',
    position: 'relative',
    top: -1,
  },
  clipBodyText: {
    lineClamp: 2,
    display: 'box',
    boxOrient: 'vertical',
    overflow: 'hidden',
  },

  secondaryText: { marginLeft: theme.spacing(3.5) },
});

function Item(props) {
  const { data, classes, selected } = props;
  moment.updateLocale('en', momentLocales);

  const adminsContext = useContext(AdminsContext);

  return (
    <ListItem
      key={data.id}
      onClick={props.onClick}
      button
      selected={selected}
      classes={{ root: classes.root, selected: classes.selectedItem }}
    >
      <ListItemText
        primary={
          <Grid
            container
            alignItems="flex-start"
            className={classes.primaryText}
          >
            <Grid item>
              <BlastStatusIcon data={data} className={classes.statusIcon} />
            </Grid>
            <Grid item xs>
              <Typography
                variant="subtitle1"
                style={{ display: 'inline-block' }}
              >
                {data.query}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" className={classes.timestamp}>
                {data.blastsAt &&
                  data.blastsAt.seconds &&
                  moment.unix(data.blastsAt.seconds).fromNow()}
              </Typography>
            </Grid>
          </Grid>
        }
        secondary={
          <>Created by {adminsContext.getAdmin(data.createdBy).givenName}</>
        }
        classes={{
          root: classes.listItemTextRoot,
          secondary: classes.secondaryText,
        }}
      />
    </ListItem>
  );
}
export default withStyles(styles)(Item);
