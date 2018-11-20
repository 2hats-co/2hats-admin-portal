import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import PersonIcon from '@material-ui/icons/Person';

import moment from 'moment';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    clipBodyText: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    rightText: {
        textAlign: 'right',
        padding: 0,
        minWidth: 70,
    },
    iconWrapper: {
        height: 24,
    },
    iconButton: {
        width: 24,
        height: 24,
        position: 'relative',
        right: -4,
    },
    starIcon: {
        fontSize: 18,
    },
});

function CandidateItem(props){
    const { data, classes,selected } = props;
    moment.updateLocale('en', {
        relativeTime : {
            future: 'in %s',
            past:   '%s',
            s  : 'just now',
            ss : '%d s ago',
            m:  '1 min ago',
            mm: '%d min ago',
            h:  '1 h ago',
            hh: '%d h ago',
            d:  '1 d ago',
            dd: '%d d ago',
            M:  '1 M ago',
            MM: '%d M ago',
            y:  '1 y ago',
            yy: '%d y ago'
        }
    });
    return(
   
        <ListItem onClick={props.onClick} 
        key={data.id} button    selected={selected}
        >
            <Avatar><PersonIcon /></Avatar>
            <ListItemText
                primary={data.fullName}
                secondary={data.body}
                classes={{secondary: classes.clipBodyText}}
              
            />
            <ListItemText
                primary={<IconButton className={classes.iconButton}><StarBorderIcon className={classes.starIcon} /></IconButton>}
                secondary={moment(data.date.seconds*1000).fromNow()}
                className={classes.rightText}
                classes={{primary: classes.iconWrapper}}
              
            />
        </ListItem>
    );
}
export default withStyles(styles)(CandidateItem);
