import React, { useReducer, useState } from 'react';
import PropTypes, { element } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import DeleteIcon from '@material-ui/icons/Delete';
import RedoIcon from '@material-ui/icons/Redo';
import DoneIcon from '@material-ui/icons/Done';
import SendIcon from '@material-ui/icons/Send';
import SendToPendingIcon from '@material-ui/icons/SettingsBackupRestore';

import FeedbackElement from './FeedbackElement';
import * as _ from 'lodash'

import { COLLECTIONS } from "../../constants/firestore";
import {SUBMISSION_FEEDBACK, getFeedbackContent, getFeedbackTitle, feedbackSections} from '../../constants/feedback'
import { rejectedWithFeedback } from '../../constants/emails/templates';
import { updateProperties } from '../../utilities/firestore';
import { useUserInfo } from '../../hooks/useUserInfo';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.paper,
  },
  list: {
    borderTop: '1px solid rgba(0,0,0,.1)',
    height: 'calc(100% - 41px)',
    overflowY: 'scroll',
    padding: 20,
    paddingBottom: 88,
    boxSizing: 'border-box',
  },
  listSection: {
    borderBottom: '1px solid rgba(0,0,0,.1)',
    marginBottom: 20,
    paddingBottom: 16,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 6,
  },
  submitButton: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    width: 360,
    fontWeight: 700,
  },
  icon: {
    marginRight: 8,
  },
});

const feedbackReducer = (state, action) => {
  switch (action.type) {
    case 'update':
      return Object.assign(state, {[action.field]: action.value });
    case 'reset':
      return {};
  }
};

function FeedbackForm(props){
    const { classes, submission, setTemplate, submissionDispatch, handleSendEmail, location, emailReady } = props;

    const [feedback, feedbackDispatch] = useReducer(feedbackReducer, {});
    const [showSend, setShowSend] = useState(false);

    const [showDialog, setShowDialog] = useState(false);

    const userInfo = useUserInfo();

    const storeFeedback = () => {
      const mappedFeedback = _.map(feedback, (value,id) => {
        const content = getFeedbackContent(id,value)
        return({id,content,value});
      });
      const oldProcesses = submission.processes ? submission.processes : [];

      const properties = {
        feedbackContent: mappedFeedback,
        feedbacked: true,
        processes: oldProcesses.concat([ {
            type: 'feedbacked',
            operator: userInfo.UID,
            timestamp: new Date(),
        } ]),
      };
      updateProperties(COLLECTIONS.submissions, submission.id, properties);
    }

    const handleSubmit = () => {
      if (location.pathname === '/rejected') setTemplate(rejectedWithFeedback);
      setShowSend(true);
    }
    const sendEmail = () => {
      if (location.pathname === '/rejected') handleSendEmail();
      storeFeedback();
      feedbackDispatch({type:'reset'});
    }
    
    return (
      <div className={classes.root}>
        <Grid container justify="space-between">
          <Button color="primary" onClick={() => { feedbackDispatch({type:'reset'}) }}>
            <DeleteIcon className={classes.icon} />Reset
          </Button>
          <Button color="primary" onClick={() => { setShowDialog(true) }}>
            <SendToPendingIcon className={classes.icon} />Send to Pending
          </Button>
          <Button color="primary" onClick={() => { submissionDispatch({type:'skip'}) }}>
            <RedoIcon className={classes.icon} />Skip
          </Button>
        </Grid>
        <List component="nav"
          className={classes.list}
        >
          {_.map(SUBMISSION_FEEDBACK,(section,sectionId)=>
            <div className={classes.listSection} key={sectionId}>
              {section.map((element, i) =>
                <FeedbackElement
                  key={i}
                  handleFeedbackItem={feedbackDispatch} 
                  id={sectionId+element.id}
                  title={`${sectionId+element.id}. ${element.title}`} 
                  value={feedback[sectionId+element.id]}
                  contents={element.content}
                  labels={element.labels}/> 
              )}
            </div>
          )}
        </List>
        <Button variant="extendedFab" color="primary" 
          disabled={ showSend && !emailReady }
          aria-label="Submit Feedback" 
          className={classes.submitButton}
          onClick={ (showSend || location.pathname === '/accepted') ? sendEmail : handleSubmit }
        >
          { showSend ? <SendIcon /> : <DoneIcon /> }
          { showSend ? 'Send Email and Submit Feedback' : location.pathname === '/rejected' ? 'Ready to Submit' : 'Submit Feedback' }
        </Button>

        <Dialog
          open={showDialog}
          onClose={() => { setShowDialog(false) }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Send {submission.displayName} back to Pending?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              From Pending, you can set {submission.displayName} to Rejected or 
              Accepted. When you set them to Accepted, it will send them an email.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setShowDialog(false) }} color="primary">
              Cancel
            </Button>
            <Button onClick={() => {
              updateProperties(
                COLLECTIONS.submissions, submission.id,
                { outcome:'pending', feedbacked:false }
              );
              setShowDialog(false);
              feedbackDispatch({type:'reset'})
            }} color="primary">
              Send Back to Pending
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }



export default withStyles(styles)(FeedbackForm)

FeedbackForm.propTypes = {
  classes: PropTypes.object.isRequired,
};
