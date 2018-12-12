import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
   root:{
       marginTop:'20%'
   },
   msg: {
       marginBottom: 40
   }
  });
function LoadingMessage(props){

    const {classes,message} = props 

    return(
        <Grid container 
        className ={classes.root}
        direction='column'
        alignItems='center'
        >
        <Typography 
            className={classes.msg}
            variant='headline'>
       {message?message:'Your Future Starts Soon…'} 
        </Typography>
        <CircularProgress size={64}/>
        </Grid>
    )

}
export default withStyles(styles)(LoadingMessage)
