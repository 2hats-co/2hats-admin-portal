import React,{Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';

import moment from 'moment';

function CandidateItem(props){
    const {data} = props;


  
    moment.updateLocale('en', {
        relativeTime : {
            future: "in %s",
            past:   "%s ago",
            s  : 'seconds',
            ss : '%d s',
            m:  "1 min",
            mm: "%d min",
            h:  "1 h",
            hh: "%d h",
            d:  "1 d",
            dd: "%d d",
            M:  "1 M",
            MM: "%d M",
            y:  "1 y",
            yy: "%d y"
        } 
    });

    //const timestamp = data.updatedAt ? moment.unix(data.updatedAt).fromNow()
    const timestamp = moment.unix(data.createdAt).fromNow();
    let viewer = ''
    if(data.operator){
        viewer = `last seen by ${data.operator.displayName.split(' ')[0]}`
    }

    return(
        <ListItem onClick={props.onClick} key={data.key} button selected={props.selected}>
            <Avatar><PersonIcon /></Avatar>
            <ListItemText
                primary={`${data.name}`}
                secondary={viewer}
            />
            <ListItemText
                primary={data.status}
                secondary={timestamp}
                style={{textAlign: 'right', paddingRight: 0, minWidth: 70}}
            />
        </ListItem>
    );
}
export default CandidateItem
