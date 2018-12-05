import React, { useReducer, useState } from 'react';
import PropTypes, { element } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/ArrowBack';

import { COLLECTIONS } from "../../constants/firestore";

import DeleteIcon from '@material-ui/icons/Delete';
import RedoIcon from '@material-ui/icons/Redo';
import SendIcon from '@material-ui/icons/Send';
import FeedbackElement from './FeedbackElement'; 
import * as _ from 'lodash'

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
    const { classes, submission, setTemplate, submissionDispatch, handleSendEmail, location } = props;

    const [feedback, feedbackDispatch] = useReducer(feedbackReducer, {});
    const [showSend, setShowSend] = useState(false);

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
          <Button color="primary" onClick={() => { submissionDispatch({type:'skip'}) }}>
            <RedoIcon className={classes.icon} />Review Later
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
          aria-label="Submit Feedback" 
          className={classes.submitButton}
          onClick={ (showSend || location.pathname === '/accepted') ? sendEmail : handleSubmit }
        >
          <SendIcon /> { showSend ? 'Send Email' : 'Submit Feedback' }
        </Button>
      </div>
    );
  }



export default withStyles(styles)(FeedbackForm)

FeedbackForm.propTypes = {
  classes: PropTypes.object.isRequired,
};
