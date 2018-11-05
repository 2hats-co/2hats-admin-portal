import React from 'react'
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
    root: {
        width: 64,
        padding: 0,
    },
    item: {
        flexDirection: 'column',
        color: '#fff',
        padding: '18px 0',
        position: 'relative',
        transition: 'background-color .4s',
        borderRadius: '18px 0 0 18px',

        '&:hover, &:focus': {
            backgroundColor: 'rgba(255,255,255,.16)',
        },
    },
    selectedItem: {
        backgroundColor: '#fff !important',
        '& svg': {
            color: theme.palette.primary.main,
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            top: -20,
            right: -20,
            pointerEvents: 'none',

            width: 40,
            height: 40,
            backgroundSize: '50% 50%',
            backgroundRepeat: 'no-repeat',
            backgroundImage:
                `radial-gradient(circle at 0 0, rgba(0,0,0,0) 20px, #fff 20.75px)`,
        },
        '&:after': {
            content: '""',
            position: 'absolute',
            bottom: -40,
            right: -20,
            pointerEvents: 'none',

            width: 40,
            height: 40,
            backgroundSize: '50% 50%',
            backgroundRepeat: 'no-repeat',
            backgroundImage:
                `radial-gradient(circle at 0 100%, rgba(0,0,0,0) 20px, #fff 20.75px)`,
        },
    },
    icon: {
        color: 'rgba(255,255,255,.87)',
        margin: 0,
        fontSize: 28,
    },
});

function NavigationItems(props){
    const {classes, goTo, currentLocation, navigationRoutes, selectedIndex} = props

    return(
       <List component="nav" className={classes.root}>
           {navigationRoutes.map((x, i) =>(
                <Tooltip title={x.label} placement="right" key={i}>
                    <ListItem button disableGutters
                        key={x.route}
                        onClick={()=>{ goTo(x.route) }}
                        className={classes.item}
                        selected={ selectedIndex === i }
                        classes={{selected: classes.selectedItem}}
                    >
                        <ListItemIcon className={classes.icon}>{x.icon}</ListItemIcon>
                    </ListItem>
                </Tooltip>
           ))}
       </List>
    )
}
export default withStyles(styles)(NavigationItems)
