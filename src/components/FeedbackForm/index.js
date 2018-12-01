import React, { useReducer, useEffect } from 'react';
import PropTypes, { element } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/ArrowBack';

import { COLLECTIONS } from "../../constants/firestore";

import SendIcon from '@material-ui/icons/Send';
import FeedbackElement from './FeedbackElement'; 
import * as _ from 'lodash'

import {SUBMISSION_FEEDBACK, getFeedbackContent, getFeedbackTitle, feedbackSections} from '../../constants/feedback'
import { rejectedWithFeedback } from '../../constants/emails/templates';
import { updateProperties } from '../../utilities/firestore';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.paper,
  },
  backIcon: {
    marginRight: 8,
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
});

const feedbackReducer = (state, action) => {
  switch (action.type) {
    case 'update':
      return Object.assign(state, {[action.field]: action.value });
  }
};

const storeFeedback = (feedback, submissionID) => {
  const mappedFeedback = _.map(feedback,(value,id)=>{
    const content = getFeedbackContent(id,value)
    return({id,content,value});
  });
  updateProperties(COLLECTIONS.submissions, submissionID, { feedbackContent: mappedFeedback, hasFeedback: true, });
}

function FeedbackForm(props){
    const { classes, submission, setTemplate } = props;

    const [feedback, feedbackDispatch] = useReducer(feedbackReducer, {});
    
    return (
      <div className={classes.root}>
        <Grid container justify="space-between">
          <Button color="default" className={classes.backButton}>
            <BackIcon className={classes.backIcon} />
            Back
          </Button>
          <Button color="default" className={classes.backButton}>
            Review Later
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
          onClick={() => {
            setTemplate(rejectedWithFeedback);
            storeFeedback(feedback, submission.id);
          }}
        >
          <SendIcon /> Submit Feedback
        </Button>
      </div>
    );
  }



export default withStyles(styles)(FeedbackForm)

FeedbackForm.propTypes = {
  classes: PropTypes.object.isRequired,
};
