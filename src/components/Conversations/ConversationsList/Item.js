import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ClientIcon from '@material-ui/icons/BusinessCenter';
import CandidateIcon from '@material-ui/icons/School';

import moment from 'moment';
import { momentLocales } from '../../../constants/momentLocales';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  root: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  selectedItem: {
    backgroundColor: `${theme.palette.primary.light} !important`,
    color: `${theme.palette.primary.darkText} !important`,
  },
  typeIcon: {
    fontSize: 18,
    verticalAlign: 'text-bottom',
    marginRight: theme.spacing.unit * 0.75,
    opacity: 0.67,
  },
  listItemTextRoot: {
    paddingRight: 0,
  },
  timestamp: {
    color: theme.palette.text.secondary,
    display: 'inline-block',
    position: 'relative',
    top: -1,
  },
  unreadIndicator: {
    width: 12,
    height: 12,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 6,
    display: 'inline-block',
    marginRight: theme.spacing.unit,
  },
  clipBodyText: {
    maxHeight: 40,
    overflow: 'hidden',
    marginLeft: theme.spacing.unit * 3,
  },
});

function CandidateItem(props) {
  const { data, classes, selected, isUnread } = props;
  moment.updateLocale('en', momentLocales);
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
          <Grid container alignItems="flex-end">
            <Grid item xs>
              <Typography
                variant="subtitle1"
                style={{ display: 'inline-block' }}
              >
                {data.type === 'client' && (
                  <ClientIcon className={classes.typeIcon} />
                )}
                {data.type === 'candidate' && (
                  <CandidateIcon className={classes.typeIcon} />
                )}
                {data.displayName}
              </Typography>
            </Grid>
            <Grid item>
              {isUnread && <div className={classes.unreadIndicator} />}
              <Typography variant="body2" className={classes.timestamp}>
                {moment(data.lastMessage.sentAt.seconds * 1000).fromNow()}
              </Typography>
            </Grid>
          </Grid>
        }
        secondary={data.lastMessage.body.substr(0, 100)}
        classes={{
          root: classes.listItemTextRoot,
          secondary: classes.clipBodyText,
        }}
      />
    </ListItem>
  );
}
export default withStyles(styles)(CandidateItem);
