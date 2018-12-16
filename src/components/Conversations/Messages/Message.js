import React from 'react';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

import PersonIcon from '@material-ui/icons/Person';
import MailIcon from '@material-ui/icons/Mail';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import moment from 'moment';
import { momentLocales } from '../../../constants/momentLocales';
// import timestamp from 'time-stamp';

import { getInitials } from '../../../utilities';

const styles = theme => ({
    root: {
        '& p': { textAlign: 'left' },
    },
    linkedin: {
        '& .msg-caption': { display: 'none' },
    },
    incomingMessage: {
        textAlign: 'left',

        '& .msg-body': {
            backgroundColor: theme.palette.grey[200],
            borderTopRightRadius: theme.shape.roundBorderRadius,
            borderBottomRightRadius: theme.shape.roundBorderRadius,
        },
    },
    yourMessage: {
        textAlign: 'right',

        '& .msg-body': {
            backgroundColor: theme.palette.primary.light,
            borderTopLeftRadius: theme.shape.roundBorderRadius,
            borderBottomLeftRadius: theme.shape.roundBorderRadius,
            marginRight: theme.spacing.unit * 6,
        },
        '& p': { color: theme.palette.primary.darkText },
        '& .msg-caption': { marginRight: theme.spacing.unit * 8 },
    },

    firstOfIncoming: {
        '& .msg-body': { borderTopLeftRadius: theme.shape.roundBorderRadius },
    },
    lastOfIncoming: {
        '& .msg-body': { borderBottomLeftRadius: theme.shape.roundBorderRadius },
        '& .msg-caption': { display: 'block' },
    },

    firstOfYour: {
        '& .msg-body': { borderTopRightRadius: theme.shape.roundBorderRadius },
    },
    lastOfYour: {
        '& .msg-body': {
            borderBottomRightRadius: theme.shape.roundBorderRadius,
            marginRight: theme.spacing.unit,
        },
        '& .msg-caption': { display: 'block' },
    },

    body: {
        display: 'inline-block',
        maxWidth: 500,
        borderRadius: theme.shape.smallBorderRadius,
        padding: '10px 16px',
        margin: `${theme.spacing.unit / 2}px 0 0`,
    },
    caption: {
        margin: `${theme.spacing.unit/2}px ${theme.spacing.unit*2}px 0`,
    },
    typeLabel: {
        textTransform: 'capitalize',
        display: 'inline !important',
        '&::before': { content: '" • "' },
    },
    avatar: {
        display: 'inline-flex',
        verticalAlign: 'bottom',
    },

    note: {
        textAlign: 'center',
        '& .msg-body': {
            border: `1px solid ${ theme.palette.primary.darkText }`,
            borderRadius: `${theme.shape.roundBorderRadius}px !important`,
            backgroundColor: theme.palette.background.paper,
        },
    },

    email: {
        '& .msg-body': {
            borderRadius: `${theme.shape.roundBorderRadius}px !important`,
            padding: theme.spacing.unit,
            maxWidth: 800,
        },
    },
    emailIcon: {
        verticalAlign: 'top',
        marginRight: theme.spacing.unit * 2,
        opacity: .87,
    },
    emailExpansionRoot: {
        borderRadius: `${theme.shape.roundBorderRadius * .75}px !important`,
        boxShadow: 'none',
    },
    renderedHTML: {
        backgroundColor: '#fff !important',
        padding: 0,
        textAlign: 'left',
        '& p': { color: theme.palette.text.primary },
    },

    activity: {
        textAlign: 'center',
        '& .msg-body': {
            border: `1px solid ${ theme.palette.divider }`,
            borderRadius: `${theme.shape.roundBorderRadius}px !important`,
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing.unit * 2,
            maxWidth: 800,
        },
    },
});

function Message(props) {
    const { data, classes, firstOfType, lastOfType } = props;
    moment.updateLocale('en', momentLocales);

    const timeLabel = moment(data.sentAt.seconds * 1000).fromNow();
    const isIncoming = data.isIncoming;

    let bodyContent;
    switch (data.type) {
        case 'email':
            bodyContent = (
            <ExpansionPanel classes={{ root: classes.emailExpansionRoot }}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="body2">
                        <MailIcon className={classes.emailIcon} />{data.subject}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className={classes.renderedHTML} dangerouslySetInnerHTML={{__html:data.body}} />
                </ExpansionPanelDetails>
            </ExpansionPanel>
            );
            break;
        case 'activity':
            bodyContent = <div className={classes.renderedHTML} dangerouslySetInnerHTML={{__html:data.body}} />
            break;
        default:
            bodyContent = <Typography variant="body1">{data.body}</Typography>;
            break;
    }

    return(
    <div className={ classNames(
        classes.root,
        isIncoming ? classes.incomingMessage : classes.yourMessage,
        firstOfType && (isIncoming ? classes.firstOfIncoming : classes.firstOfYour),
        lastOfType && (isIncoming ? classes.lastOfIncoming : classes.lastOfYour),
        data.type === 'linkedin' && classes.linkedin,
        data.type === 'note' && classes.note,
        data.type === 'email' && classes.email,
        data.type === 'activity' && classes.activity,
    )}>

        <div className={classNames(classes.body, 'msg-body')}>{bodyContent}</div>
        {!isIncoming && lastOfType && (data.sentBy ?
            <Tooltip title={data.sentBy}>
                <Avatar className={classes.avatar}>
                    { getInitials(data.sentBy) }
                </Avatar>
            </Tooltip>
        :
            <Avatar className={classes.avatar}><PersonIcon /></Avatar>)
        }

        <Typography variant="caption" className={classNames(classes.caption, 'msg-caption')}>
            {timeLabel}
            {data.type && <span className={classes.typeLabel}>{data.type.replace('linkedin', 'LinkedIn')}</span> }
        </Typography>

    </div>
    );
}
export default withStyles(styles)(Message);
