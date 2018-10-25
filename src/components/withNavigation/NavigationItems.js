import React from 'react'
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import PeopleIcon from '@material-ui/icons/People';
import DescriptionIcon from '@material-ui/icons/Description';
import MailIcon from '@material-ui/icons/Mail';
import TimelineIcon from '@material-ui/icons/Timeline';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import StarIcon from '@material-ui/icons/Star';

import {ROUTES} from '../../constants/routes';

const styles = theme => ({
    root: {
        width: 64,
        padding: 0,
    },
    item: {
        flexDirection: 'column',
        color: '#fff',
    },
    icon: {
        color: 'rgba(255,255,255,.87)',
        margin: 0,
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
        route: ROUTES.submissions,
    }
];
function NavigationItems(props){
    const {classes, goTo, currentLocation} = props

    return(
       <List component="nav" className={classes.root}>
           {navigationRoutes.map(x =>(
                <ListItem button disableGutters
                    key={x.route}
                    onClick={()=>{ goTo(x.route) }}
                    className={classes.item}
                    selected={ currentLocation === x.route }
                >
                    <ListItemIcon className={classes.icon}>{x.icon}</ListItemIcon>
                </ListItem>
           ))}
       </List>
    )
}
export default withStyles(styles)(NavigationItems)
