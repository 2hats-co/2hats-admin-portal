import React, { useEffect, useRef } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import moment from 'moment';

import Message from './Message';
import useCollection from '../../../hooks/useCollection';

import sortBy from 'ramda/es/sortBy';
import prop from 'ramda/es/prop';
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
  messageContainer: {
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
    limit: 100,
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
  useEffect(
    () => {
      if (messagesEnd.current) {
        messagesEnd.current.scrollIntoView();
      }
    },
    [messages]
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
      {messages &&
        sortBySentAt(messages).map((data, i) => (
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
        ))}
      <div
        id="messages-end"
        style={{ float: 'left', clear: 'both' }}
        ref={messagesEnd}
      />
    </div>
  );
}

export default withStyles(styles)(Messages);
