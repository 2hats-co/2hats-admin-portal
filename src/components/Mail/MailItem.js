import React from 'react';
import moment from 'moment';
import { momentLocales } from '../../constants/momentLocales';
import withStyles from '@material-ui/core/styles/withStyles';

// import renderHTML from 'react-render-html';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import PersonIcon from '@material-ui/icons/Person';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    '&::before': {
      content: 'none',
    },
    '&::after': {
      left: 40 + theme.spacing.unit * 2,
      bottom: 0,
      right: 0,
      height: 1,
      content: '""',
      position: 'absolute',
      backgroundColor: 'rgba(0,0,0,.12)',
    },
  },
  rootExpanded: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: 0,
  },
  personBar: {
    padding: '8px 0',
  },
  avatar: {
    marginTop: 4,
    marginRight: theme.spacing.unit * 2,
    width: 40,
    height: 40,
  },
  messagePreview: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: 'rgba(0,0,0,.53)',
    maxWidth: 'calc(100vw - 360px - 80px - 56px - 156px - 64px)',
  },
  timestamp: {
    textAlign: 'right',
    width: 124,
    boxSizing: 'content-box',
    color: 'rgba(0,0,0,.53)',
  },
  expandIcon: {
    right: -16,
  },
  mailBody: {
    paddingLeft: 40 + theme.spacing.unit * 2,
    paddingRight: 40 + theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 6,
  },
});

function MailItem(props) {
  const { classes, from, body, timestamp } = props;

  moment.updateLocale('en', momentLocales);

  return (
    <ExpansionPanel
      classes={{ root: classes.root, expanded: classes.rootExpanded }}
      elevation={0}
      square
    >
      <ExpansionPanelSummary
        classes={{ root: classes.personBar, expandIcon: classes.expandIcon }}
        expandIcon={<ExpandMoreIcon />}
        disableRipple={false}
      >
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
        <Grid container direction="column" justify="center">
          <Typography variant="subtitle1">{from}</Typography>
          <Typography variant="body2" className={classes.messagePreview}>
            {body.replace(/<[^>]*>/g, '')}
          </Typography>
        </Grid>

        <Grid
          container
          direction="column"
          justify="center"
          className={classes.timestamp}
        >
          <Typography variant="body2" className={classes.timestamp}>
            {moment.unix(timestamp).format('ddd MMM D YYYY')}
          </Typography>
          <Typography variant="body2" className={classes.timestamp}>
            {moment.unix(timestamp).format('LT')}
          </Typography>
        </Grid>
      </ExpansionPanelSummary>

      <ExpansionPanelDetails classes={{ root: classes.mailBody }}>
        <Typography variant="body2">
          {/*body ? renderHTML(body) : 'There is no body text'*/}
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default withStyles(styles)(MailItem);
