import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

import PeopleIcon from '@material-ui/icons/People';
import DescriptionIcon from '@material-ui/icons/Description';
import MailIcon from '@material-ui/icons/Mail';
import TimelineIcon from '@material-ui/icons/Timeline';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import MoneyIcon from '@material-ui/icons/AttachMoney';

import {ROUTES} from '../../constants/routes';

import logo from '../../assets/logo/WhiteIcon.svg';
import NavigationItems from './NavigationItems';
import withAuthentication from '../../utilities/Session/withAuthentication';

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
        margin: '15px auto',
        display: 'block',
        userDrag: 'none',
    },
    routeHeader: {
        lineHeight: '64px',
        paddingLeft: 32,
        fontWeight: 700,
        cursor: 'default',
        userSelect: 'none',
    },
    avatar: {
        backgroundColor: 'rgba(255,255,255,.87)',
        color: theme.palette.primary.main,
        fontWeight: 500,
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
        icon: <TimelineIcon />,
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
        icon: <MoneyIcon />,
        route: ROUTES.leads,
    },
];

export const withNavigation = (WrappedComponent) => {
    class WithNavigation extends Component {
        constructor(props) {
            super(props);
            this.goTo = this.goTo.bind(this);
        }
     
        goTo(route){
            this.props.history.push(route);
        }
        render(){
            const { classes, displayName, uid } = this.props;
            const path = this.props.location.pathname;
            let currentContainer =  path.split('/')[1];

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
            if (displayName) {
                initials = displayName.match(/\b\w/g) || [];
                initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
            }

            return(
                <Grid container wrap="nowrap">
                    <Grid item className={classes.leftNav}>
                        <Grid container style={{height:'100vh'}} justify="center" alignContent="space-between">
                            <Grid item style={{height:64}}>
                                <img alt="2hats logo" src={logo} className={classes.logo} />
                            </Grid>
                            <Grid item style={{marginBottom:48}}>
                                <NavigationItems
                                    goTo={this.goTo}
                                    currentLocation={path}
                                    selectedIndex={index}
                                    navigationRoutes={navigationRoutes}
                                />
                            </Grid>
                            <Grid item style={{height:64,padding:12}}>
                                { initials && displayName && uid && 
                                <Tooltip
                                    title={<React.Fragment>
                                        <div style={{fontSize:12}}>Signed in as:</div>
                                        <div>{displayName}</div>
                                        <div>{uid}</div>
                                    </React.Fragment>}
                                    placement="top-start"
                                    leaveDelay={5000}
                                >
                                    <Avatar className={classes.avatar}>{initials ? initials : null}</Avatar>
                                </Tooltip>}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs>
                        <WrappedComponent {...this.props} />
                    </Grid>
                </Grid>
            );
        }
    }
    return withAuthentication(withRouter(withStyles(styles)(withFirestore(WithNavigation))));
}
