import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Slide from '@material-ui/core/Slide';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import NotificationIcon from '@material-ui/icons/Notifications';
import MessageIcon from '@material-ui/icons/Forum';
import NoteIcon from '@material-ui/icons/AlternateEmail';

import ScrollyRolly from './ScrollyRolly';
import useCollection from '../hooks/useCollection';
import { COLLECTIONS } from '../constants/firestore';
import { ROUTES } from '../constants/routes';
import { markAsRead } from '../utilities/notifications';

import moment from 'moment';
import { momentLocales } from '../constants/momentLocales';

const styles = theme => ({
  loader: {
    color: 'rgba(255,255,255,.87)',
    padding: theme.spacing.unit * 1.5,
  },
  badge: {
    backgroundColor: '#fff',
    color: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
  },
  paperRoot: {
    borderRadius: theme.shape.roundBorderRadius,
    width: 360,
    outline: 'none',
    maxHeight: `calc(100vh - ${theme.spacing.unit * 3}px)`,
    position: 'absolute',
    bottom: theme.spacing.unit * 1.5,
    left: theme.spacing.unit * 9,
    overflowY: 'auto',
  },
  listItemTextRoot: { paddingRight: 0 },
  timestamp: {
    color: theme.palette.text.secondary,
  },
  listItemSecondary: {
    lineClamp: 2,
    display: 'box',
    boxOrient: 'vertical',
    overflow: 'hidden',
  },
});

const getIcon = type => {
  switch (type) {
    case 'message':
      return <MessageIcon />;
    case 'note':
      return <NoteIcon />;
    case 'reminder':
      return <NotificationIcon />;

    default:
      return '?';
  }
};

function Notifications(props) {
  const { classes, className, history, uid } = props;

  moment.updateLocale('en', momentLocales);

  const [showDialog, setShowDialog] = useState(false);
  const [slideIn, setSlideIn] = useState(true);
  const [unreadNotificationsState] = useCollection({
    path: COLLECTIONS.notifications,
    sort: { field: 'createdAt', direction: 'desc' },
    filters: [
      {
        field: 'unreadSubscribers',
        operator: 'array-contains',
        value: uid,
      },
    ],
  });
  const unreadNotifications = unreadNotificationsState.documents
    ? unreadNotificationsState.documents.length
    : 0;

  const [notificationsState, notificationsDispatch] = useCollection({
    path: COLLECTIONS.notifications,
    sort: { field: 'createdAt', direction: 'desc' },
    filters: [
      {
        field: 'subscribers',
        operator: 'array-contains',
        value: uid,
      },
    ],
  });
  const notifications = notificationsState.documents;

  const handleClose = () => {
    setSlideIn(false);
    setTimeout(() => {
      setShowDialog(false);
    }, 100);
  };

  useEffect(
    () => {
      if (!showDialog) setSlideIn(true);
      else markAsRead(uid, notifications);
    },
    [showDialog]
  );

  const handleClick = data => {
    if (data.conversationId) {
      history.push(`${ROUTES.conversations}?id=${data.conversationId}`);
      handleClose();
    }
  };

  if (notificationsState.loading)
    return <CircularProgress className={classes.loader} size={24} />;

  return (
    <React.Fragment>
      <Fade in>
        <Tooltip title="Notifications" placement="right">
          <IconButton
            className={className}
            onClick={() => {
              setShowDialog(true);
            }}
          >
            <Badge
              badgeContent={
                unreadNotifications >= 9 ? '9+' : unreadNotifications
              }
              invisible={!(unreadNotifications > 0)}
              classes={{ badge: classes.badge }}
            >
              <NotificationIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </Fade>
      {showDialog && (
        <Modal open={showDialog} onClose={handleClose} disableAutoFocus>
          <Slide in={slideIn} direction="up">
            <Paper elevation={24} classes={{ root: classes.paperRoot }}>
              <ScrollyRolly
                dataState={notificationsState}
                dataDispatch={notificationsDispatch}
              >
                {x => (
                  <ListItem
                    key={x.id}
                    button
                    onClick={() => {
                      handleClick(x.data);
                    }}
                  >
                    <Avatar>{getIcon(x.data.type)}</Avatar>
                    <ListItemText
                      primary={
                        <Grid
                          container
                          justify="space-between"
                          alignItems="center"
                        >
                          <Typography variant="subtitle1">{x.title}</Typography>
                          <Typography
                            variant="body2"
                            className={classes.timestamp}
                          >
                            {moment.unix(x.createdAt.seconds).fromNow()}
                          </Typography>
                        </Grid>
                      }
                      secondary={x.body}
                      classes={{
                        root: classes.listItemTextRoot,
                        secondary: classes.listItemSecondary,
                      }}
                    />
                  </ListItem>
                )}
              </ScrollyRolly>
              {/* <List>
                {notifications &&
                  notifications.length > 0 &&
                  notifications.map(x => (
                    <ListItem
                      key={x.id}
                      button
                      onClick={() => {
                        handleClick(x.data);
                      }}
                    >
                      <Avatar>{getIcon(x.data.type)}</Avatar>
                      <ListItemText
                        primary={
                          <Grid
                            container
                            justify="space-between"
                            alignItems="center"
                          >
                            <Typography variant="subtitle1">
                              {x.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              className={classes.timestamp}
                            >
                              {moment.unix(x.createdAt.seconds).fromNow()}
                            </Typography>
                          </Grid>
                        }
                        secondary={x.body}
                        classes={{
                          root: classes.listItemTextRoot,
                          secondary: classes.listItemSecondary,
                        }}
                      />
                    </ListItem>
                  ))}
              </List> */}
            </Paper>
          </Slide>
        </Modal>
      )}
    </React.Fragment>
  );
}

export default withRouter(withStyles(styles)(Notifications));
