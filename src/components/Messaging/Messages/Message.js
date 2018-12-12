import React from 'react';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import moment from 'moment';
import { momentLocales } from '../../../constants/momentLocales';
// import timestamp from 'time-stamp';

const styles = theme => ({
    root: {
        '& span': { display: 'none' }
    },
    incomingMessage: {
        textAlign: 'left',

        '& div': {
            backgroundColor: theme.palette.grey[200],
            borderTopRightRadius: theme.shape.roundBorderRadius,
            borderBottomRightRadius: theme.shape.roundBorderRadius,
        },
    },
    yourMessage: {
        textAlign: 'right',

        '& div': {
            backgroundColor: theme.palette.primary.light,
            borderTopLeftRadius: theme.shape.roundBorderRadius,
            borderBottomLeftRadius: theme.shape.roundBorderRadius,
        },
        '& p': {
            color: theme.palette.primary.darkText,
            textAlign: 'left',
        },
    },

    firstOfIncoming: {
        '& div': { borderTopLeftRadius: theme.shape.roundBorderRadius },
    },
    lastOfIncoming: {
        '& div': { borderBottomLeftRadius: theme.shape.roundBorderRadius },
        '& span': { display: 'block' },
    },

    firstOfYour: {
        '& div': { borderTopRightRadius: theme.shape.roundBorderRadius },
    },
    lastOfYour: {
        '& div': { borderBottomRightRadius: theme.shape.roundBorderRadius },
        '& span': { display: 'block' },
    },

    body: {
        display: 'inline-block',
        maxWidth: 500,
        borderRadius: theme.shape.borderRadius,
        padding: '10px 16px',
        margin: `${theme.spacing.unit / 2}px 0 0`,
    },
    caption: {
        margin: `${theme.spacing.unit/2}px ${theme.spacing.unit*2}px 0`,
    },
});

function Message(props) {
    const { data, classes, firstOfType, lastOfType } = props;
    moment.updateLocale('en', momentLocales);

    const timeLabel = moment(data.sentAt.seconds * 1000).fromNow();
    const isIncoming = data.isIncoming;

    return(
    <div className={ classNames(
        classes.root,
        isIncoming ? classes.incomingMessage : classes.yourMessage,
        firstOfType && (isIncoming ? classes.firstOfIncoming : classes.firstOfYour),
        lastOfType && (isIncoming ? classes.lastOfIncoming : classes.lastOfYour),
    )}>

        <div className={classes.body}>
            <Typography variant="body1">{data.body}</Typography>
        </div>

        <Typography variant="caption" className={classes.caption}>
            {timeLabel}
        </Typography>

    </div>
    );
}
export default withStyles(styles)(Message);
