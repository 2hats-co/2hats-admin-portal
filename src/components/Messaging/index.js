import React, { Component } from 'react';
import ThreadsList from './ThreadsList'
import Messages from './Messages'
import MessageField from './MessageField'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
    mailItems: {
        height: '100%',
        overflowY: 'scroll',
        padding: 40,
        paddingTop: 40 - 12,
        paddingBottom: 128,
        background: '#fff',
        boxShadow: '0 5px 40px 0 rgba(0,0,0,.15)',
        borderRadius: '10px 0 0 0',
    },
    messageField: {
        width:'calc(100% - 485px)',
        position: 'fixed',
        bottom: 0,
        right: 0,
        height:100,
    },
});

function Messaging(props) {
        const {threads,handleThreadSelector,messages,classes,handleSendMessage} = props 
        return(
            <React.Fragment>
        <Grid container direction='row' style={{height: 'calc(100vh - 64px)'}}>
            <Grid item style={{width: 420,height: 'calc(100vh - 64px)'}}>
             <ThreadsList threads={threads} handleThreadSelector={handleThreadSelector}/> 
            </Grid>
            <Grid item xs className={classes.mailItems}>
                <Messages messages={messages} />
            </Grid>
          
        </Grid>
        <div className={classes.messageField}>
         <MessageField handleSendMessage={handleSendMessage}/></div>
        </React.Fragment>
        );
}

export default withStyles(styles)(Messaging);