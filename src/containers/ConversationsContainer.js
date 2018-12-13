import React, {  } from 'react';
import { withNavigation } from '../components/withNavigation';

import { compose } from "redux";

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';

import LocationIndicator from '../components/LocationIndicator';
import ConversationsList from '../components/Conversations/ConversationsList';

function ConversationContainer(props) {
    return(<Fade in>
        <Grid container direction='row' style={{height: 'calc(100vh - 64px)'}}>
        <LocationIndicator title="Conversations" />
            <Grid item style={{width: 320,height: 'calc(100vh - 64px)'}}>
                <ConversationsList/>
            </Grid>
        </Grid>
        </Fade>);
        
        
    }



  export default withNavigation(ConversationContainer)
