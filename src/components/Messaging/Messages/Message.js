import React from 'react';

import moment from 'moment';
import withStyles from '@material-ui/core/styles/withStyles';
import timestamp from 'time-stamp';

const styles = theme => ({  
    body:{
        maxWidth:600,
        margin:12 ,
        borderRadius:20,
        padding:17,
        lineHeight: 1.2,
    },
    timestamp:{
        color:'#757575',
        marginLeft:12,
        marginRight:12,
    }
});

function Message(props){
    const { data, classes } = props;
    moment.updateLocale('en', {
        relativeTime : {
            future: 'in %s',
            past:   '%s',
            s  : 'just now',
            ss : 'few seconds ago',
            m:  '1 minute ago',
            mm: '%d minutes ago',
            h:  '1 hour ago',
            hh: '%d hours ago',
            d:  'Yestarday',
            dd: '%d days ago',
            M:  '1 Month ago',
            MM: '%d Months ago',
            y:  '1 year ago',
            yy: '%d years ago'
        }
    });
    const timeLabel = moment(data.sentAt.seconds*1000).fromNow()
    const isIncoming = data.isIncoming
    return(
        <div>

        <div align='left' className={classes.body} style={{backgroundColor: isIncoming? '#ff5722':'#e0e0e0',color: isIncoming? '#fff':'#010101'}}>
            {data.body}
        </div>
        <div className={classes.timestamp}>
        {timeLabel}
        </div>
        </div>
    );
}
export default withStyles(styles)(Message);
