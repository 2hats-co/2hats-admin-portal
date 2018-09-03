import React,{Component} from 'react';
import { withStyles } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    root: {
        margin: "15px 0",
    },
});

function InfoItem(props) {
    const { title, contentArray, classes } = props;

    const content = contentArray.map(contentItem => (
        <Typography variant="body1">{contentItem}</Typography>
    ));

    return(
        <React.Fragment>
            <Grid container className={classes.root}>
                <Grid item xs={4}>
                    <Typography variant="subheading">{title}</Typography>
                </Grid>
                <Grid item xs={8}>
                    {content}
                </Grid>
            </Grid>
            <Divider />
        </React.Fragment>
    );
}
export default withStyles(styles)(InfoItem);
