import React, { Component } from 'react';
import { withNavigation } from '../components/withNavigation';
import { COLLECTIONS } from "../constants/firestore";
import { compose } from "redux";
import { withHandlers, lifecycle } from "recompose";
import { connect } from "react-redux";
import { withFirestore } from "../utilities/withFirestore";

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';

function ConversationContainer(props) {
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



  export default withNavigation(compose(ConversationContainer))
  
