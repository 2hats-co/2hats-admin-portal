import React from 'react';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({
    root: {
        paddingLeft: theme.spacing.unit * 3,
        height: 64,
    },
    title: {
        lineHeight: '64px',
        fontWeight: 600,
        marginRight: theme.spacing.unit * 2,
        userSelect: 'none',
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
    },
    tabWrapper: {
        height: 64,
    },
});

function LocationIndicator(props) {
    const { classes, location, subRoutes, title, history, showBorder } = props;

    const navItems = subRoutes && location && history ? subRoutes.map((x, i) =>
        <Tab
            key={i}
            classes={{
                root: classes.routeButton,
                label: classes.routeHeaderText,
            }}
            value={x}
            label={x.split('/')[1]}
        />
    ) : null;

    return(
        <Grid className={classes.root} container alignItems="center" style={showBorder && { boxShadow:'0 1px 0 rgba(0,0,0,.12)' }}>
            <Typography variant="title" className={classes.title}>{title}</Typography>
            {navItems && navItems.length > 0 &&
                <Tabs
                    value={location.pathname}
                    onChange={(e, val) => { history.push(val) }}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    {navItems}
                </Tabs>
            }
        </Grid>
    );
}

export default withRouter(withStyles(styles)(LocationIndicator));
