import React from 'react'
import LoadingMessage from './LoadingMessage'
import { Paper } from '@material-ui/core';
function LoadingCard(props){
    console.log('loading...')
    return (
        <Paper style={{width:300,height:300, margin:'auto'}}>
        <LoadingMessage message={props.message}/>
        </Paper>
    )
}
export default LoadingCard