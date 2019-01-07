import React, {
  //useState,
  useEffect,
} from 'react';
import withNavigation from '../components/withNavigation';
import withStyles from '@material-ui/core/styles/withStyles';

import Typography from '@material-ui/core/Typography';
import ForumIcon from '@material-ui/icons/Forum';
import LocationIndicator from '../components/LocationIndicator';

import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import ConversationsList from '../components/Conversations/ConversationsList';
import ConversationHeader from '../components/Conversations/ConversationHeader';
import Messages from '../components/Conversations/Messages';
import Loadable from 'react-loadable';
import LoadingHat from '../components/LoadingHat';
import { useWindowSize } from '../hooks/useWindowSize';
import useDocument from '../hooks/useDocument';
import { getfirstIdOfQuery } from '../utilities/firestore';
import { createConversation } from '../utilities/conversations';
const Composer = Loadable({
  loader: () =>
    import('../components/Conversations/Composer' /* webpackChunkName: "MessagesComposer" */),
  loading: () => <LoadingHat message="Serving up your messages…" />,
});

const styles = theme => ({
  messagesContainer: {
    height: '100vh',
    // marginTop: -64,

    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.background.default
        : theme.palette.background.paper,
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
  messagesWrapper: {
    overflow: 'hidden',
  },
  composerContainer: {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  noConvs: {
    height: '100vh',
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
function ConversationsContainer(props) {
  const { classes, uid, location } = props;
  const currentUserId = uid;
  const windowSize = useWindowSize();

  const [conversationState, dispatchConversation] = useDocument();
  let selectedConversation = conversationState.doc;
  const openedConversationOnMobile =
    windowSize.isMobile && selectedConversation;
  const handleCloseConversation = () => {
    dispatchConversation({ path: null });
  };
  const setConversationWithURL = async () => {
    if (location.search.indexOf('?id=') > -1) {
      const conversationId = location.search.replace('?id=', '');
      dispatchConversation({ path: `conversations/${conversationId}` });
    } else if (location.search.indexOf('?uid=') > -1) {
      const uid = location.search.replace('?uid=', '');
      const filters = [{ field: 'UID', operator: '==', value: uid }];
      const conversationId = await getfirstIdOfQuery('conversations', filters);
      if (conversationId) {
        dispatchConversation({ path: `conversations/${conversationId}` });
      } else {
        console.log('creating conversation');
        const conversationId = await createConversation(uid, currentUserId);
        dispatchConversation({ path: `conversations/${conversationId}` });
      }
    }
  };
  useEffect(
    () => {
      selectedConversation = null;
      setConversationWithURL();
    },
    [location.search]
  );

  return (
    <Fade in>
      <Grid container direction="row" style={{ height: 'calc(100vh - 64px)' }}>
        {!openedConversationOnMobile && (
          <React.Fragment>
            <LocationIndicator title="Conversations" />
            <Grid
              item
              style={{
                width: windowSize.isMobile ? '100%' : 320,
                height: 'calc(100vh - 64px)',
              }}
            >
              <ConversationsList
                uid={uid}
                selectedConversation={selectedConversation}
                setSelectedConversation={conversation => {
                  //console.log(conversation.id);
                  dispatchConversation({
                    path: `conversations/${conversation.id}`,
                  });
                }}
              />
            </Grid>
          </React.Fragment>
        )}
        <Grid
          item
          xs
          className={classes.messagesContainer}
          style={{ marginTop: windowSize.isMobile ? 0 : '-64px' }}
        >
          {selectedConversation ? (
            <Grid
              container
              direction="column"
              wrap="nowrap"
              style={{ height: '100vh' }}
            >
              <ConversationHeader
                closeConversation={handleCloseConversation}
                conversation={selectedConversation}
              />

              <Grid item xs className={classes.messagesWrapper}>
                <Messages conversation={selectedConversation} />
              </Grid>
              <Grid item className={classes.composerContainer}>
                <Composer
                  conversation={selectedConversation}
                  channels={selectedConversation.channels}
                />
              </Grid>
            </Grid>
          ) : location.search.indexOf('?id=') > -1 ||
            location.search.indexOf('?uid=') > -1 ? (
            <LoadingHat
              message={
                <React.Fragment>
                  Finding and/or creating conversation, depending on whether
                  this user already has a conversation recorded in the system…
                  <br />
                  <br />
                  Thank you for your patience and understanding.
                  <br />
                  Have a great day.
                </React.Fragment>
              }
            />
          ) : (
            <Grid
              container
              justify="center"
              alignItems="center"
              className={classes.noConvs}
            >
              <Grid item>
                <ForumIcon />
                <Typography variant="subtitle1" color="textSecondary">
                  No open conversations
                </Typography>
              </Grid>
            </Grid>
          )}{' '}
        </Grid>
      </Grid>
    </Fade>
  );
}
export default withNavigation(withStyles(styles)(ConversationsContainer));
