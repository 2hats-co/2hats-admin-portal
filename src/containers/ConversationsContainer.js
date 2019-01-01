import React, { useState, useEffect } from 'react';
import withNavigation from '../components/withNavigation';
import withStyles from '@material-ui/core/styles/withStyles';

import Typography from '@material-ui/core/Typography';
import ForumIcon from '@material-ui/icons/Forum';
import LocationIndicator from '../components/LocationIndicator';

import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
  loading: LoadingHat,
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
  composerContainer: {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  tabRoot: {
    minHeight: 36,
  },
  tabLabelContainer: {
    padding: '6px 16px',
  },
  noOpenMsg: {
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

  const [composerType, setComposerType] = useState('linkedin');
  const [conversationState, dispatchConversation] = useDocument();
  const selectedConversation = conversationState.doc;
  const openedConversationOnMobile =
    windowSize.isMobile && selectedConversation;
  const handleCloseConversation = () => {
    dispatchConversation({ path: null });
  };

  useEffect(
    async () => {
      //TODO: entertain user while this is going on, maybe offer them a snackbar 🥨🍿🍘🌰
      if (location.search.indexOf('?id=') > -1) {
        const conversationId = location.search.replace('?id=', '');
        dispatchConversation({ path: `conversations/${conversationId}` });
      } else if (location.search.indexOf('?uid=') > -1) {
        const uid = location.search.replace('?uid=', '');
        const filters = [{ field: 'UID', operator: '==', value: uid }];
        const conversationId = await getfirstIdOfQuery(
          'conversations',
          filters
        );
        if (conversationId) {
          dispatchConversation({ path: `conversations/${conversationId}` });
        } else {
          console.log('creating conversation');
          const conversationId = await createConversation(uid, currentUserId);
          dispatchConversation({ path: `conversations/${conversationId}` });
        }
      }
    },
    [location.search]
  );
  useEffect(
    () => {
      if (selectedConversation) {
        console.log(selectedConversation);
        if (selectedConversation.channels.email) setComposerType('email');
        else if (selectedConversation.channels.linkedin)
          setComposerType('linkedin');
      }
    },
    [selectedConversation]
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
                  console.log(conversation.id);
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

              <Grid item xs style={{ overflowY: 'auto' }}>
                <Messages conversation={selectedConversation} />
              </Grid>
              {
                //TODO: move composer tabs inside comoposer
              }
              <Grid item className={classes.composerContainer}>
                <Tabs
                  classes={{ root: classes.tabRoot }}
                  value={composerType}
                  onChange={(e, val) => {
                    setComposerType(val);
                  }}
                  indicatorColor="primary"
                  textColor="primary"
                >
                  {selectedConversation.channels.linkedin && (
                    <Tab
                      value="linkedin"
                      label="LinkedIn"
                      classes={{
                        root: classes.tabRoot,
                        labelContainer: classes.tabLabelContainer,
                      }}
                    />
                  )}
                  {selectedConversation.channels.email && (
                    <Tab
                      value="email"
                      label="Email"
                      classes={{
                        root: classes.tabRoot,
                        labelContainer: classes.tabLabelContainer,
                      }}
                    />
                  )}
                  <Tab
                    value="note"
                    label="Note"
                    classes={{
                      root: classes.tabRoot,
                      labelContainer: classes.tabLabelContainer,
                    }}
                  />
                </Tabs>
                <Composer
                  conversation={selectedConversation}
                  composerType={composerType}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid
              container
              justify="center"
              alignItems="center"
              className={classes.noOpenMsg}
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
