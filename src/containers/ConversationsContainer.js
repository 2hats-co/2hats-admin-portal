import React, { useState } from 'react';
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
import Composer from '../components/Conversations/Composer';
import { useWindowSize } from '../hooks/useWindowSize';
import Loadable from 'react-loadable';

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
  const { classes, uid } = props;
  const windowSize = useWindowSize();
  const [composerType, setComposerType] = useState('email');
  const [selectedConversation, setSelectedConversation] = useState({
    id: null,
  });
  const openedConversationOnMobile =
    windowSize.isMobile && selectedConversation.id;
  const handleCloseConversation = () => {
    setSelectedConversation({ id: null });
  };
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
                setSelectedConversation={setSelectedConversation}
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
          {selectedConversation.id !== null ? (
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

              <Grid item xs style={{ overflowY: 'scroll' }}>
                <Messages conversation={selectedConversation} />
              </Grid>

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
                  <Tab
                    value="email"
                    label="Email"
                    classes={{
                      root: classes.tabRoot,
                      labelContainer: classes.tabLabelContainer,
                    }}
                  />
                  <Tab
                    value="linkedin"
                    label="LinkedIn"
                    classes={{
                      root: classes.tabRoot,
                      labelContainer: classes.tabLabelContainer,
                    }}
                  />
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
                <Typography variant="subheading" color="textSecondary">
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
