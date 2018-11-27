import React from 'react';
import { Typography } from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    
});

function LocationIndecator(props) {
        const path = props.location.pathname;
        return(
        <React.Fragment>
       
            <Typography>
            {path}
            </Typography>

        </React.Fragment>
        );
}

export default withRouter(withStyles(styles)(LocationIndecator));
