import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        paddingLeft: 24,
    },
    routeHeaderText: {
        textTransform: 'capitalize',
        fontSize: 20,
        fontWeight: 500,
    }
});

function SubNavigation(props) {
    const { classes, currentLocation, subRoutes, goTo } = props;

    const navItems = subRoutes.map((x, i) =>
        <Button
            key={i}
            color={currentLocation === x.split('/')[1] ? 'primary' : null}
            classes={{ label: classes.routeHeaderText }}
            onClick={() => { goTo(x) }}
            size="large"
        >
            {x.split('/')[1]}
        </Button>
    );

    return(
        <Grid className={classes.root} container alignItems="center">
            {navItems}
        </Grid>
    );
}

export default withStyles(styles)(SubNavigation);
