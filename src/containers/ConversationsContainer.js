import React, { useEffect, Suspense, lazy } from 'react';
import withNavigation from '../components/withNavigation';
import withStyles from '@material-ui/core/styles/withStyles';

import Typography from '@material-ui/core/Typography';
import ForumIcon from '@material-ui/icons/ForumOutlined';
import LocationIndicator from '../components/LocationIndicator';

import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
//import ConversationsList from '../components/Conversations/ConversationsList';
import ConversationHeader from '../components/Conversations/ConversationHeader';
import Messages from '../components/Conversations/Messages';
import LoadingHat from '../components/LoadingHat';
import useWindowSize from '../hooks/useWindowSize';
import useDocument from '../hooks/useDocument';
import { getfirstIdOfQuery } from '../utilities/firestore';
import { createConversation } from '../utilities/conversations';

import Composer from '../components/Conversations/Composer';
// const Composer = lazy(() =>
//   import('../components/Conversations/Composer' /* webpackChunkName: "Composer" */)
// );
const ConversationsList = lazy(() =>
  import('../components/Conversations/ConversationsList' /* webpackChunkName: "Composer" */)
);

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
  const { classes, uid, location, history } = props;
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
      <Grid container direction="row">
        {!openedConversationOnMobile && (
          <>
            <LocationIndicator title="Conversations" />
            <Grid
              item
              style={{
                width: windowSize.isMobile ? '100%' : 320,
                height: 'calc(100vh - 64px)',
              }}
            >
              <Suspense
                fallback={<LoadingHat message="Getting your controls…" />}
              >
                <ConversationsList
                  uid={uid}
                  selectedConversation={selectedConversation}
                  setSelectedConversation={conversation => {
                    dispatchConversation({
                      path: `conversations/${conversation.id}`,
                    });
                    history.push(`/conversations?id=${conversation.id}`);
                  }}
                />
              </Suspense>
            </Grid>
          </>
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
                {/* <Suspense
                  fallback={<LoadingHat message="Getting your controls…" />}
                > */}
                <Composer
                  conversation={selectedConversation}
                  channels={selectedConversation.channels}
                />
                {/* </Suspense> */}
              </Grid>
            </Grid>
          ) : location.search.indexOf('?id=') > -1 ||
            location.search.indexOf('?uid=') > -1 ? (
            <LoadingHat altBg message="Finding and/or creating conversation…" />
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
