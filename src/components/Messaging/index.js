import React, { useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ForumIcon from '@material-ui/icons/ForumOutlined';

import ThreadsList from './ThreadsList';
import MessagingHeader from './MessagingHeader';
import Messages from './Messages';
import Composer from './Composer';

const styles = theme => ({
    messagesContainer: {
        height: '100vh',
        marginTop: -64,

        background: theme.palette.background.paper,
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

const DUMMY_MESSAGES = [
    {
      "id": "o9ekBMcXq8ARDfl5hJB4",
      "body": "Keen for a coffee next week?",
      "createdAt": {
        "seconds": 1444300544,
        "nanoseconds": 176000000
      },
      "isIncoming": true,
      "sentAt": {
        "seconds": 1444300544,
        "nanoseconds": 0
      },
      "type": "linkedin",
    },
    {
      "id": "o9ekBMcXq8ARDfl5hJB4",
      "body": "Keen for a coffee next week?",
      "createdAt": {
        "seconds": 1544300545,
        "nanoseconds": 176000000
      },
      "isIncoming": true,
      "sentAt": {
        "seconds": 1444300545,
        "nanoseconds": 0
      },
      "type": "linkedin",
    },
    {
      "id": "o9ekBMcXq8ARDfl5hJB4",
      "body": "Keen for a coffee next week?",
      "createdAt": {
        "seconds": 1544400744,
        "nanoseconds": 176000000
      },
      "isIncoming": true,
      "sentAt": {
        "seconds": 1543976041,
        "nanoseconds": 0
      },
      "type": "linkedin",
    },
    {
      "id": "o9ekBMcXq8ARDfl5hJB4",
      "body": "Keen for a coffee next week?",
      "createdAt": {
        "seconds": 1544400744,
        "nanoseconds": 176000000
      },
      "isIncoming": true,
      "sentAt": {
        "seconds": 1543976041,
        "nanoseconds": 0
      },
      "type": "linkedin",
    },
    {
      "id": "fPxfgLyuAb4g746e6iGW",
      "body": "Not yet - let's do next week, say Thursday morning :)",
      "createdAt": {
        "seconds": 1544400744,
        "nanoseconds": 177000000
      },
      "isIncoming": false,
      "sentAt": {
        "seconds": 1543979400,
        "nanoseconds": 0
      },
      "type": "linkedin",
    },
    {
      "id": "G5G3WCTJdPjNIweMtccg",
      "body": "Sounds good. What is your email. Will send you a diary invite",
      "createdAt": {
        "seconds": 1544400744,
        "nanoseconds": 176000000
      },
      "isIncoming": true,
      "sentAt": {
        "seconds": 1543980660,
        "nanoseconds": 0
      },
      "type": "linkedin",
    },
    {
      "id": "bOeUoaEmMPVMCFz25ttV",
      "body": "Also where is your office near. We are at Circular Quay",
      "createdAt": {
        "seconds": 1544400744,
        "nanoseconds": 178000000
      },
      "isIncoming": true,
      "sentAt": {
        "seconds": 1543980661,
        "nanoseconds": 0
      },
      "type": "linkedin",
    },
    {
      "id": "kfRpwHxRUHWGd3sVrnWL",
      "body": "sure, it's gloria@2hats.com.au. We are based right next to Central station - Would love to show your around our space (we're based in Academy Xi's old office) :)",
      "createdAt": {
        "seconds": 1544400744,
        "nanoseconds": 176000000
      },
      "isIncoming": false,
      "sentAt": {
        "seconds": 1543983780,
        "nanoseconds": 0
      },
      "type": "linkedin",
    },
    {
      "id": "EWHC3W2isHvImrb1GTeO",
      "body": "No problems! Shall we say 9am",
      "createdAt": {
        "seconds": 1544400744,
        "nanoseconds": 177000000
      },
      "isIncoming": true,
      "sentAt": {
        "seconds": 1543984680,
        "nanoseconds": 0
      },
      "type": "linkedin",
    },
    {
      "id": "AkwdZ72AUBDnwzc9yJ2V",
      "body": "Oh wait - can we do 1030?",
      "createdAt": {
        "seconds": 1544400744,
        "nanoseconds": 177000000
      },
      "isIncoming": true,
      "sentAt": {
        "seconds": 1543984920,
        "nanoseconds": 0
      },
      "type": "linkedin",
    },
    {
      "id": "kd1f2PwpLZSr407KjpTF",
      "body": "I have a client meeting at 9",
      "createdAt": {
        "seconds": 1544400744,
        "nanoseconds": 178000000
      },
      "isIncoming": true,
      "sentAt": {
        "seconds": 1543984921,
        "nanoseconds": 0
      },
      "type": "linkedin",
    },
    {
      "id": "kfRpwHxRUHWGd3sVrnWXa",
      "body": "these are messages from me",
      "createdAt": {
        "seconds": 1544654106,
        "nanoseconds": 176000000
      },
      "isIncoming": false,
      "sentAt": {
        "seconds": 1544654106,
        "nanoseconds": 0
      },
      "type": "linkedin",
      "sentBy": "Profasia Caming",
  },
  {
    "id": "kfRpwHxRUHWGd3sVrnWXb",
    "body": "these are messages from me",
    "createdAt": {
      "seconds": 1544654106,
      "nanoseconds": 176000000
    },
    "isIncoming": false,
    "sentAt": {
      "seconds": 1544654106,
      "nanoseconds": 0
    },
    "type": "linkedin",
    "sentBy": "Profasia Caming",
},
{
  "id": "kfRpwHxRUHWGd3sVrnWXbx",
  "body": "these are messages from me too",
  "createdAt": {
    "seconds": 1544654106,
    "nanoseconds": 176000000
  },
  "isIncoming": false,
  "sentAt": {
    "seconds": 1544654106,
    "nanoseconds": 0
  },
  "type": "linkedin",
  "sentBy": "Lindsay Lohan",
},
    {
        "id": "kfRpwHxRUHWGd3sVrnWX",
        "body": "these are messages from me",
        "createdAt": {
          "seconds": 1544654106,
          "nanoseconds": 176000000
        },
        "isIncoming": false,
        "sentAt": {
          "seconds": 1544654106,
          "nanoseconds": 0
        },
        "type": "linkedin",
    },
    {
        "id": "kfRpwHxRUHWGd3sVrnWXd",
        "body": "these are messages from me",
        "createdAt": {
          "seconds": 1544654107,
          "nanoseconds": 176000000
        },
        "isIncoming": false,
        "sentAt": {
          "seconds": 1544654107,
          "nanoseconds": 0
        },
        "type": "linkedin",
    },
    {
        "id": "kfRpwHxRUHWGd3sVrnWdjflk",
        "body": "Baby, can't you see  I'm calling A guy like you should wear a warning It's dangerous I'm falling There's no escape I can't wait I need a hit Baby, give me it You're dangerous I'm loving it Too high Can't come down Losin' my head Spinnin' 'round and 'round Do you feel me now?",
        "createdAt": {
          "seconds": 1544654206,
          "nanoseconds": 176000000
        },
        "isIncoming": false,
        "sentAt": {
          "seconds": 1544654206,
          "nanoseconds": 0
        },
        "type": "note",
    },
    {
        "id": "kfRpwHxRUHWGd3sVrnWs",
        "body": `<h1>Toxic</h1><h2>Britney Spears</h2><iframe width="560" height="315" src="https://www.youtube.com/embed/LOZuxwVk7TU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        "createdAt": {
          "seconds": 1544654209,
          "nanoseconds": 176000000
        },
        "isIncoming": false,
        "sentAt": {
          "seconds": 1544654209,
          "nanoseconds": 0
        },
        "type": "activity",
    },
    {
        "id": "kfRpwHxRUHWGd3sVrnWasfd",
        "subject": "VERY IMPORTEN MESSAGE",
        "body": "<h1>Toxic</h1><h2>Britney Spears</h2><p>Baby, can't you see I'm calling A guy like you should wear a warning</p><p>It's dangerous I'm falling There's no escape I can't wait I need a hit Baby, give me it You're dangerous I'm loving it Too high Can't come down Losin' my head Spinnin' 'round and 'round Do you feel me now?</p>",
        "createdAt": {
          "seconds": 1544654208,
          "nanoseconds": 176000000
        },
        "isIncoming": false,
        "sentAt": {
          "seconds": 1544654208,
          "nanoseconds": 0
        },
        "type": "email",
    },
    {
        "id": "kfRpwHxRUHWGd3sVrnWasfd2",
        "subject": "VERY IMPORTEN MESSAGE2",
        "body": "<h1>Toxic</h1><h2>Britney Spears</h2><p>Baby, can't you see I'm calling A guy like you should wear a warning</p><p>It's dangerous I'm falling There's no escape I can't wait I need a hit Baby, give me it You're dangerous I'm loving it Too high Can't come down Losin' my head Spinnin' 'round and 'round Do you feel me now?</p>",
        "createdAt": {
          "seconds": 1544654209,
          "nanoseconds": 176000000
        },
        "isIncoming": false,
        "sentAt": {
          "seconds": 1544654209,
          "nanoseconds": 0
        },
        "type": "email",
        "sentBy": "Profasia Caming",
    },
    {
        "id": "kfRpwHxRUHWGd3sVrnWasfdd",
        "subject": "VERY IMPORTEN MESSAGE",
        "body": "<h1>Toxic</h1><h2>Britney Spears</h2><p>Baby, can't you see I'm calling A guy like you should wear a warning</p><p>It's dangerous I'm falling There's no escape I can't wait I need a hit Baby, give me it You're dangerous I'm loving it Too high Can't come down Losin' my head Spinnin' 'round and 'round Do you feel me now?</p>",
        "createdAt": {
          "seconds": 1544654218,
          "nanoseconds": 176000000
        },
        "isIncoming": true,
        "sentAt": {
          "seconds": 1544615428,
          "nanoseconds": 0
        },
        "type": "email",
    },
  ];

function Messaging(props) {
    const {threads, handleThreadSelector, messagesFromProps, classes, leadHeader} = props;

    const [composerType, setComposerType] = useState('email');
    const messages = DUMMY_MESSAGES;

    return(<Fade in>
    <Grid container direction='row' style={{height: 'calc(100vh - 64px)'}}>
        <Grid item style={{width: 320,height: 'calc(100vh - 64px)'}}>
            <ThreadsList
                threads={threads}
                handleThreadSelector={handleThreadSelector}
                handleStarThread={props.handleStarThread}
            />
        </Grid>
        <Grid item xs className={classes.messagesContainer}>
            { messages && messages.length > 0 ?
            <Grid container direction="column" wrap="nowrap" style={{ height:'100vh' }}>

                { leadHeader.label && <MessagingHeader leadHeader={leadHeader} /> }

                <Grid item xs style={{ overflowY:'scroll' }}>
                    <Messages messages={messages} />
                </Grid>

                <Grid item className={classes.composerContainer}>
                    <Tabs
                        classes={{root:classes.tabRoot}}
                        value={composerType}
                        onChange={(e, val) => { setComposerType(val); }}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab value="email" label="Email" classes={{root:classes.tabRoot, labelContainer:classes.tabLabelContainer}} />
                        <Tab value="linkedin" label="LinkedIn" classes={{root:classes.tabRoot, labelContainer:classes.tabLabelContainer}} />
                        <Tab value="note" label="Note" classes={{root:classes.tabRoot, labelContainer:classes.tabLabelContainer}} />
                    </Tabs>
                    <Composer composerType={composerType} />
                </Grid>
            </Grid>
            :
            <Grid container justify="center" alignItems="center" className={classes.noOpenMsg}>
                <Grid item>
                    <ForumIcon />
                    <Typography variant="subheading" color="textSecondary">No open conversations</Typography>
                </Grid>
            </Grid>
            }
        </Grid>
    </Grid>
    </Fade>);
}

export default withStyles(styles)(Messaging);
