import React from 'react';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Search from './Search'
const styles = theme => ({
    root: {
        paddingLeft: theme.spacing.unit * 4,
        height: 64,
    },
    title: {
        lineHeight: '64px',
        fontWeight: 'bold',
        marginRight: theme.spacing.unit * 2,
    },
    routeButton: {
        paddingTop: 0,
        paddingBottom: 0,
        height: 64,
    },
    routeHeaderText: {
        textTransform: 'capitalize',
        fontSize: 20,
        fontWeight: 500,
        lineHeight: '64px',
    }
});

function LocationIndicator(props) {
    const { classes, location, subRoutes, title, history } = props;

    const navItems = subRoutes && location && history ? subRoutes.map((x, i) =>
        <Button
            key={i}
            color={location.pathname === x ? 'primary' : null}
            classes={{ root: classes.routeButton, label: classes.routeHeaderText }}
            onClick={() => { history.push(x); }}
            size="large"
        >
            {x.split('/')[1]}
        </Button>
    ) : null;

    return(
        <Grid container justify="space-between">
            <Grid item xs>
                <Grid className={classes.root} container alignItems="center">
                    <Typography variant="title" className={classes.title}>{title}</Typography>
                    {navItems}
                </Grid>
            </Grid>
            <Grid item>
                <Search/>
            </Grid>
        </Grid>
    );
}

export default withRouter(withStyles(styles)(LocationIndicator));
