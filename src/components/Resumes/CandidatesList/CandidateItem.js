import React,{Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';

import moment from 'moment';

function CandidateItem(props){
    const {data} = props;

    let interests = '';

    if (data.careerInterests) {
        for (let i = 0; i < data.careerInterests.length; i++) {
            interests += data.careerInterests[i];
            if (i < data.careerInterests.length - 1) interests += ', ';
        }
    }

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

    const timestamp = data.updatedAt ? moment.unix(data.updatedAt).fromNow()
        : moment.unix(data.createdAt).fromNow();

    //console.log(data.submittedAt._seconds)
    return(
        <ListItem onClick={props.onClick} key={data.objectID} button selected={props.selected}>
            <Avatar><PersonIcon /></Avatar>
            <ListItemText
                primary={`${data.firstName} ${data.lastName}`}
                secondary={interests}
            />
            <ListItemText
                primary={data.status.replace('-', ' ')}
                secondary={timestamp}
                style={{textAlign: 'right', paddingRight: 0, minWidth: 70}}
            />
        </ListItem>
    );
}
export default CandidateItem
