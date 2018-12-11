import React, { useReducer, useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { CLOUD_FUNCTIONS,callable } from '../../firebase/functions';
import withStyles from '@material-ui/core/styles/withStyles';
import {propsIntoObject} from '../../utilities/index'
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';

import DeleteIcon from '@material-ui/icons/Delete';
import RedoIcon from '@material-ui/icons/Redo';
import DoneIcon from '@material-ui/icons/Done';
import SendIcon from '@material-ui/icons/Send';
import SendToPendingIcon from '@material-ui/icons/SettingsBackupRestore';

import FeedbackElement from './FeedbackElement';
import map from 'lodash/map';


import { COLLECTIONS } from "../../constants/firestore";
import {SUBMISSION_FEEDBACK, getFeedbackContent} from '../../constants/feedback'
import { rejectedWithFeedback, resumeAccepted } from '../../constants/emails/templates';
import { updateProperties,updateUserDocs,generateSmartKey } from '../../utilities/firestore';
import { useAuthedUser } from '../../hooks/useAuthedUser';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 6,
    paddingBottom: theme.spacing.unit * 7,
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.paper,
  },
  topButtons: {
    backgroundColor: '#fff',
    borderBottom: '1px solid rgba(0,0,0,.1)',
    padding: 0,
    position: 'fixed',
    right: 0,
    top: 64,
    zIndex: 1,
    width: 400,
  },
  list: {
    padding: theme.spacing.unit * 2,
    paddingBottom: 0,
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
    bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
      width: 400 - theme.spacing.unit * 4,
    height: 48,
  },
  icon: {
    marginRight: 8,
  },
  additionalCommentsWrapper: {
    padding: theme.spacing.unit * 2,
    paddingTop: 0,
    marginBottom: theme.spacing.unit * 10,
  },
});



const feedbackReducer = (state, action) => {
  console.log(state,action)
  switch (action.type) {
    case 'set':let feedbackElements =  action.storedFeedback.map((element)=> {if(element.id ==='additional'){
      return({[element.id]:element.content})}else{return({[element.id]:element.value})}})
      return propsIntoObject(feedbackElements)
    case 'update':return({...state,[action.field]:action.value});
    case 'reset':return ({});
    default:return({})
  }
};

function FeedbackForm(props){
    const { classes, submission, setTemplate,setSmartLink, submissionDispatch,
      handleSendEmail, history, emailReady } = props;

    const [feedback, feedbackDispatch] = useReducer(feedbackReducer, {});
    const [showSend, setShowSend] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
 
    const authedUser = useAuthedUser();

    // useEffect(()=>{
    //   if(smartKeyState && smartKeyState.smartKey){
    //     props.setSmartLink(smartKeyState.smartKey)
    //   }
    // },[smartKeyState])
    const storeFeedback = () => {
      const mappedFeedback = map(feedback, (value,id) => {
        if(id !== 'additional'){
          const content = getFeedbackContent(id,value)
          return({id,content,value});
        }
      }).filter(x=> x !== undefined);

      const additionalComments = document.getElementById('additionalCommentsTextarea').value;
      if (additionalComments.length > 0) mappedFeedback.push({
        id: 'additional',
        content: additionalComments,
      });

      const oldProcesses = submission.processes ? submission.processes : [];

      const properties = {
        feedbackContent: mappedFeedback,
        feedbacked: true,
        processes: oldProcesses.concat([ {
            type: 'feedbacked',
            operator: authedUser.UID,
            timestamp: new Date(),
        } ]),
      };
      updateProperties(COLLECTIONS.submissions, submission.id, properties);
    };

    const handleSubmit = () => {
      if (submission.outcome === 'rejected') {
        const smartKey = generateSmartKey(submission.UID,`prevSubmission?${submission.id}`)
        setSmartLink(smartKey)
        setTemplate(rejectedWithFeedback)
      }else if(submission.outcome === 'accepted') {
        console.log('setting template',resumeAccepted)
        setTemplate(resumeAccepted)
      };
      setShowSend(true);
    };
    const sendEmail = () => {
      callable(CLOUD_FUNCTIONS.tracker,{type:'talentTeam',value:`feedbacked`});
      callable(CLOUD_FUNCTIONS.tracker,{type:authedUser.UID,value:`feedbacked`});
      storeFeedback();
      handleSendEmail();
      resetFeedbackForm();
      submissionDispatch({ type:'clear' });
    };

    const sendToPending = () => {
      updateProperties(
        COLLECTIONS.submissions, submission.id,
        { outcome:'pending', feedbacked:false }
      );
      resetFeedbackForm();
      history.push(`/pending?uid=${submission.UID}`)
    };

    const resetFeedbackForm = () => {
      feedbackDispatch({type:'reset'});
      setTemplate(null);
      setShowSend(false);
      setShowDialog(false);
      document.getElementById('additionalCommentsTextarea').value = '';
    };
    useEffect(()=>{

    if(submission.feedbackContent){
      feedbackDispatch({type:'set',storedFeedback:submission.feedbackContent})
    }
    
    },[submission])
    return (
      <div className={classes.root}>
        <Grid container justify="space-between" className={classes.topButtons}>
          <Button color="primary" onClick={resetFeedbackForm}>
            <DeleteIcon className={classes.icon} />Reset
          </Button>
          <Button color="primary" onClick={() => { setShowDialog(true) }}>
            <SendToPendingIcon className={classes.icon} />Send to Pending
          </Button>
          <Button color="primary" onClick={() => { submissionDispatch({type:'skip'}); resetFeedbackForm(); }}>
            <RedoIcon className={classes.icon} />Skip
          </Button>
        </Grid>

        { submission.outcome === 'rejected' &&
          <List component="nav"
            className={classes.list}
          >
            {map(SUBMISSION_FEEDBACK,(section,sectionId)=>
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
        }


        <div className={classes.additionalCommentsWrapper}>
          <TextField
            variant="outlined"
            label="Additional Comments"
            placeholder="Type optional additional comments here…"
            multiline fullWidth
            className={classes.additionalComments}
            inputProps={{ id:'additionalCommentsTextarea' }}
          />
        </div>


        { showSend ?
          <Button variant="extendedFab" color="primary" 
            disabled={ showSend && !emailReady }
            className={classes.submitButton}
            onClick={sendEmail}
          >
            <SendIcon /> Send Email and Submit Feedback
          </Button>
        :
          <Tooltip title="Preview email to be sent. No feedback is submitted yet and can still be edited after clicking this.">
            <Button variant="extendedFab" color="primary" 
              className={classes.submitButton}
              onClick={handleSubmit}
            >
              <DoneIcon /> Ready to Submit
            </Button>
          </Tooltip>
        }



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
              Accepted. No email will be or has been sent.
              <br /><br />
              You will be sent back to Pending to view {submission.displayName} there.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setShowDialog(false) }} color="primary">
              Cancel
            </Button>
            <Button onClick={sendToPending} color="primary">
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
