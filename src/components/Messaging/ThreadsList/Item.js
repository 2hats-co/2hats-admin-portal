import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import moment from 'moment';
import { momentLocales } from '../../../constants/momentLocales';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    selectedItem: {
        backgroundColor: `${theme.palette.primary.light} !important`,
        color: `${theme.palette.primary.darkText} !important`,
    },
    listItemTextRoot: {
        paddingRight: 0,
    },
    timestamp: {
        color: theme.palette.text.secondary,
        display: 'inline-block',
        position: 'relative',
        top: -1,
    },
    unreadIndicator: {
        width: 12,
        height: 12,
        backgroundColor: theme.palette.primary.main,
        borderRadius: 6,
        display: 'inline-block',
        marginRight: theme.spacing.unit,
    },
    clipBodyText: {
        maxHeight: 40,
        overflow: 'hidden',
    },
});

function CandidateItem(props){
    const { data, classes, selected, isUnread } = props;
    moment.updateLocale('en', momentLocales);
    return(
   
        <ListItem key={data.id}
            onClick={props.onClick} 
            button
            selected={selected}
            classes={{ selected:classes.selectedItem }}
        >
            <ListItemText
                primary={
                <Grid container alignItems="flex-end">
                    <Grid item xs>
                        <Typography variant="subheading" style={{display:'inline-block'}}>
                            {data.fullName}
                        </Typography>
                    </Grid>
                    <Grid item>
                        {isUnread && <div className={classes.unreadIndicator} />}
                        <Typography variant="body1" className={classes.timestamp}>
                            {moment(data.date.seconds*1000).fromNow()}
                        </Typography>
                    </Grid>
                </Grid>
                }

                secondary={data.body.substr(0, 100)}

                classes={{
                    root: classes.listItemTextRoot,
                    secondary: classes.clipBodyText,
                }}
            />
        </ListItem>
    );
}
export default withStyles(styles)(CandidateItem);
