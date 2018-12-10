import React, { useState } from 'react';
import {withRouter} from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Slide from '@material-ui/core/Slide';
import Fade from '@material-ui/core/Fade';

import SearchIcon from '@material-ui/icons/Search';
import PeopleIcon from '@material-ui/icons/People';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import DescriptionIcon from '@material-ui/icons/Description';
import MailIcon from '@material-ui/icons/Mail';
import StatisticsIcon from '@material-ui/icons/InsertChart';
// import CalendarIcon from '@material-ui/icons/CalendarToday';
import LeadsIcon from '@material-ui/icons/BusinessCenter';

import {ROUTES} from '../../constants/routes';

import logo from '../../assets/logo/WhiteIcon.svg';
import NavigationItems from './NavigationItems';
import withAuthentication from '../../utilities/Session/withAuthentication';
import Search from '../Search';
import { getInitials } from '../../utilities';
import metadata from '../../metadata.json';

import { withFirestore } from "../../utilities/withFirestore";

const styles = theme => ({
    leftNav: {
        backgroundColor: theme.palette.primary.main,
        width: 64,
        height: '100vh',
        position: 'relative',
        zIndex: 999,
    },
    logo: {
        width: 40,
        height: 34,
        margin: '0 auto',
        padding: '15px 0',
        display: 'block',
        userDrag: 'none',
        borderBottom: '1px solid rgba(0,0,0,.12)',
    },
    searchButton: {
        color: '#fff',
        marginTop: theme.spacing.unit,
    },
    avatar: {
        backgroundColor: 'rgba(255,255,255,.87)',
        color: theme.palette.primary.main,
        fontWeight: 500,
    },
    avatarTooltipHeading: {
        fontWeight: 'bold',
        '&:not(:first-of-type)': {
            marginTop: theme.spacing.unit,
        },
    },
});

const navigationRoutes = [
    {
        label: 'Candidates',
        icon: <PeopleIcon />,
        route: ROUTES.candidates,
    }, {
    //     label: 'Calendar',
    //     icon: <CalendarIcon />,
    //     route: ROUTES.calendar,
    // }, {
        label: 'Statistics',
        icon: <StatisticsIcon />,
        route: ROUTES.stats,
    }, {
        label: 'Mail',
        icon: <MailIcon />,
        route: ROUTES.mail,
    }, {
        label: 'Submissions',
        icon: <DescriptionIcon />,
        route: ROUTES.pending,
        subRoutes: [ROUTES.pending, ROUTES.rejected, ROUTES.accepted],
    }, {
        label: 'Leads',
        icon: <LeadsIcon />,
        route: ROUTES.leads,
    }, {
        label: 'Subjects',
        icon: <SupervisorAccountIcon />,
        route: ROUTES.subjects,
    },
];

export const withNavigation = (WrappedComponent) => {
    function WithNavigation(props) {
        const { history, classes, displayName, uid, location } = props;

        const [ showSearch, setShowSearch ] = useState(false);

        const goTo = (route) => {
            history.push(route);
        }

        const path = location.pathname;

        let index = 0;

        for (let i = 0; i < navigationRoutes.length; i++) {
            if (path === navigationRoutes[i].route) index = i;
            if (navigationRoutes[i].subRoutes) {
                for (let subRoute of navigationRoutes[i].subRoutes) {
                    if (path === subRoute) index = i;
                }
            }
        }

        let initials;
        if (displayName) initials = getInitials(displayName);

        return(<React.Fragment>
            <Grid container wrap="nowrap">
                <Slide in direction="right">
                    <Grid item className={classes.leftNav}>
                        <Grid container style={{height:'100vh'}} justify="center" alignContent="space-between">
                            <Grid item style={{height:64}}>
                                <img alt="2hats logo" src={logo} className={classes.logo} />
                                <Tooltip title="Search candidates" placement="right">
                                    <IconButton
                                        className={classes.searchButton}
                                        onClick={() => { setShowSearch(true); }}
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item style={{marginBottom:48}}>
                                <NavigationItems
                                    goTo={goTo}
                                    currentLocation={path}
                                    selectedIndex={index}
                                    navigationRoutes={navigationRoutes}
                                />
                            </Grid>
                            <Grid item style={{height:64,padding:12}}>
                                { initials && displayName && uid &&
                                <Slide in direction="right">
                                    <Tooltip
                                        title={<React.Fragment>
                                            <div className={classes.avatarTooltipHeading}>Signed in as</div>
                                            <div>{displayName}</div>
                                            <div>{uid}</div>

                                            <div className={classes.avatarTooltipHeading}>Build {metadata.hash}</div>
                                            <div>{new Date(metadata.date).toLocaleString()}</div>
                                        </React.Fragment>}
                                        placement="top-start"
                                        leaveDelay={5000}
                                    >
                                        <Avatar className={classes.avatar}>{initials ? initials : null}</Avatar>
                                    </Tooltip>
                                </Slide>}
                            </Grid>
                        </Grid>
                    </Grid>
                </Slide>
                <Fade in timeout={400}>
                    <Grid item xs>
                        <WrappedComponent {...props} classes={null} />
                    </Grid>
                </Fade>
            </Grid>

            <Search showSearch={showSearch} setShowSearch={setShowSearch} />

        </React.Fragment>);
    }

    return withAuthentication(withRouter(withFirestore(withStyles(styles)(WithNavigation))));
}
