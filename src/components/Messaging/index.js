import React, { useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';

import ForumIcon from '@material-ui/icons/ForumOutlined';
import LinkIcon from '@material-ui/icons/Link';
import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarBorder';

import ThreadsList from './ThreadsList';
import Messages from './Messages';
import Composer from './Composer';

const styles = theme => ({
    messagesContainer: {
        height: '100vh',
        marginTop: -64,

        background: theme.palette.background.paper,
        borderLeft: `1px solid ${theme.palette.divider}`,
    },
    leadHeader: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit*1.5}px ${theme.spacing.unit}px ${theme.spacing.unit*3}px`,
        borderBottom: `1px solid ${theme.palette.divider}`,
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
        '& svg': {
            fontSize: 48,
            color: theme.palette.text.disabled,
        },
    },
});

function Messaging(props) {
    const {threads, handleThreadSelector, messages, classes, leadHeader} = props;

    const [composerType, setComposerType] = useState('email');

    const composer = <Composer composerType={composerType} />;

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

                <Grid item className={classes.leadHeader}>
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="title">{ leadHeader.label }</Typography>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={() => { window.open(leadHeader.path, '_blank') }}><LinkIcon /></IconButton>
                            <IconButton><StarOutlineIcon /></IconButton>
                        </Grid>
                    </Grid>
                </Grid>

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
                    { composer }
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
