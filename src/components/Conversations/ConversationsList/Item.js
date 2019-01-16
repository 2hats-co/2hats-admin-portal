import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import IncomingIcon from '@material-ui/icons/Inbox';
import OutgoingIcon from '@material-ui/icons/Reply';

import moment from 'moment';
import { momentLocales } from '../../../constants/momentLocales';
import withStyles from '@material-ui/core/styles/withStyles';
import ConversationTypeIcon from '../ConversationTypeIcon';

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
    marginRight: theme.spacing.unit * 1.25,
    marginLeft: -theme.spacing.unit * 0.25,
    opacity: 0.67,
  },
  unread: {
    '& $typeIcon': {
      opacity: 1,
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      boxShadow: `0 0 0 4px ${theme.palette.primary.main}`,
      borderRadius: '50%',
    },
  },
  messageFlowIcon: {
    position: 'absolute',
    color: theme.palette.text.disabled,
    fontSize: 18,
    top: theme.spacing.unit * 4.5,
    left: theme.spacing.unit * 1.75,
  },

  listItemTextRoot: {
    paddingRight: 0,
  },
  primaryText: {
    marginBottom: theme.spacing.unit / 2,
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

    marginLeft: theme.spacing.unit * 3.25,
  },
});

function Item(props) {
  const { data, classes, selected, isUnread } = props;
  moment.updateLocale('en', momentLocales);
  return (
    <ListItem
      key={data.id}
      onClick={props.onClick}
      button
      selected={selected}
      classes={{ root: classes.root, selected: classes.selectedItem }}
      className={isUnread ? classes.unread : ''}
    >
      <ListItemText
        primary={
          <Grid
            container
            alignItems="flex-start"
            className={classes.primaryText}
          >
            <Grid item>
              <ConversationTypeIcon
                type={data.type}
                className={classes.typeIcon}
              />
              {data.lastMessage.isIncoming ? (
                <IncomingIcon className={classes.messageFlowIcon} />
              ) : (
                <OutgoingIcon className={classes.messageFlowIcon} />
              )}
            </Grid>
            <Grid item xs>
              <Typography
                variant="subtitle1"
                style={{ display: 'inline-block' }}
              >
                {data.displayName}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" className={classes.timestamp}>
                {moment(data.lastMessage.sentAt.seconds * 1000).fromNow()}
              </Typography>
            </Grid>
          </Grid>
        }
        secondary={data.lastMessage.body}
        classes={{
          root: classes.listItemTextRoot,
          secondary: classes.clipBodyText,
        }}
      />
    </ListItem>
  );
}
export default withStyles(styles)(Item);
