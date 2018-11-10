import React from 'react';
import LoadingMessage from './LoadingMessage';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

function LoadingCard(props){
    return (
        <Grid container alignContent="center" justify="center" style={{height:'100vh'}}>
            <Paper style={{width:props.width||300,height:props.height||300, margin:'auto'}}>
                <LoadingMessage message={props.message}/>
            </Paper>
        </Grid>
    )
}
export default LoadingCard
