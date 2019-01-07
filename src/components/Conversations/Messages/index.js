import React, { useEffect, useRef, useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import moment from 'moment';

import Message from './Message';
import useCollection from '../../../hooks/useCollection';
import ScrollyRolly from '../../ScrollyRolly';

import sortBy from 'ramda/es/sortBy';
import prop from 'ramda/es/prop';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    boxSizing: 'border-box',
    overflow: 'auto',
    height: '100%',
    position: 'relative',
  },
  messageContainer: {
    width: '100%',
  },
  messagesEnd: {
    float: 'left',
    clear: 'both',
  },
  listLoader: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
});

const sortBySentAt = sortBy(prop('sentAt'));

const isSameType = (a, b) =>
  a.isIncoming === b.isIncoming &&
  a.type === b.type &&
  a.sentBy === b.sentBy &&
  a.senderId === b.senderId &&
  moment(a.sentAt.seconds * 1000).fromNow() ===
    moment(b.sentAt.seconds * 1000).fromNow();

function Messages(props) {
  const { classes, conversation } = props;
  const messagesRef = useRef(null);
  const messagesEnd = useRef(null);
  const [messagesState, messagesDispatch] = useCollection({
    path: `conversations/${conversation.id}/messages`,
    sort: { field: 'sentAt', direction: 'desc' },
    limit: 10,
    cap: 1099099009099,
  });

  useEffect(
    () => {
      messagesDispatch({
        path: `conversations/${conversation.id}/messages`,
        loading: true,
      });
    },
    [conversation.id]
  );

  const { documents } = messagesState;
  let messages = null;
  if (documents) {
    messages = documents;
  }
  const [firstMessage, setFirstMessage] = useState({ id: '' });
  useEffect(
    () => {
      if (messages && firstMessage.id !== messages[0].id) {
        console.log(messages[0]);
        setFirstMessage(messages[0]);
      }
    },
    [messages]
  );
  useEffect(
    () => {
      if (messagesEnd.current) {
        messagesEnd.current.scrollIntoView();
      }
    },
    [firstMessage]
  );

  if (messagesState.loading)
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
    <div className={classes.root} ref={messagesRef}>
      <ScrollyRolly
        dataState={messagesState}
        dataDispatch={messagesDispatch}
        sort={data => sortBySentAt(data)}
        disablePadding
        reverse
        classes={{ listLoader: classes.listLoader }}
      >
        {(data, i) => (
          <Message
            key={data.id}
            data={data}
            firstOfType={i > 0 ? !isSameType(messages[i - 1], data) : true}
            lastOfType={
              i < messages.length - 1
                ? !isSameType(messages[i + 1], data)
                : true
            }
          />
        )}
      </ScrollyRolly>
      <div
        id="messages-end"
        className={classes.messagesEnd}
        ref={messagesEnd}
      />
    </div>
  );
}

export default withStyles(styles)(Messages);
