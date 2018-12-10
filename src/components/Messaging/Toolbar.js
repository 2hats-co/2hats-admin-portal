import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import LocationIndecator from '../LocationIndecator';


const styles = theme => ({
    
});

function Messaging(props) {
        const {header} = props 
        return(
  
        <Grid container>
        {/* <LocationIndecator/> */}
        
            <a href={header.path} target="_blank">{header.label}</a>
       
        </Grid>

      
        );
}

export default withStyles(styles)(Messaging);
