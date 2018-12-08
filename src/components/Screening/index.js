import React,{Component} from 'react';
import PropTypes, { element } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import BackIcon from '@material-ui/icons/ArrowBack';
import RedoIcon from '@material-ui/icons/Redo';
import AcceptIcon from '@material-ui/icons/Done';
import RejectIcon from '@material-ui/icons/Close';

//redux 
import { COLLECTIONS} from "../../constants/firestore";
import { compose } from "redux";
import { withHandlers } from "recompose";
import { withFirestore } from "../../utilities/withFirestore";
import ConfirmationDialog from '../ConfirmationDialog';

import SendIcon from '@material-ui/icons/Send';
import FeedbackElement from './FeedbackElement'; 
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import {SUBMISSION_FEEDBACK,getFeedbackContent, getFeedbackTitle, feedbackSections} from '../../constants/feedback'
const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.paper,
  },
  backButton: {
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
  greyButton: {
      boxShadow: 'none',
  },
  greenButton: {
      backgroundColor: '#24c875',
      color: '#fff',
      boxShadow: 'none',
      '&:hover': {
          backgroundColor: '#1B9457',
      },
  },
  redButton: {
      backgroundColor: '#eb5858',
      color: '#fff',
      boxShadow: 'none',
      '&:hover': {
          backgroundColor: '#b84444',
      },
  }
});
class FeedbackForm extends Component {
  constructor(props) {
    super(props);
    this.saveFeedback =this.saveFeedback.bind(this)
    this.handleOptionClick =this.handleOptionClick.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.state = {
      showFeedbackForm: this.props.showFeedbackForm,
      feedback:{}
    };
  }

  handleOptionClick(id,value) {
    if(this.state.feedback[id] &&this.state.feedback[id] === 1 && value ===1 ){
    const updatedFeedback = Object.assign(this.state.feedback,{[id]:0})
      this.setState({feedback:updatedFeedback})
    }else{
    const updatedFeedback = Object.assign(this.state.feedback,{[id]:value})
      this.setState({feedback:updatedFeedback})
    }
  }
  saveFeedback(){
    let feedbackContent =  map(this.state.feedback,(value,id)=>{
      const out = {id,content:getFeedbackContent(id,value),value};
      if (!out.content) return null;
      return out;
    });
    feedbackContent = feedbackContent.filter(x => x !== null);
    this.props.reviewSubmission(this.props.submissionID,feedbackContent,this.state.feedbackType)
  }
  closeDialog() {
    this.setState({ confirmationDialog: null });
  }
  resetForm() {
    this.setState({
      showFeedbackForm: false,
      feedback: {}
    });
  }
updateDB = () =>{this.props.firestore.update({collection: COLLECTIONS.submissions, doc: this.props.submissionID },{
    submissionStatus:'demographic-rejected'
  })}
  handleNoFeedback = () =>{
   
    const confirmationDialogConfig = {
      title: `No Feedback?`,
      body: <p>Is this person too experinced or, in unrelated proffesion to 2hats</p>,
      request: {action:()=>{this.updateDB(), this.closeDialog(), this.props.getNextSubmission(), this.resetForm()},label:'Send rejection'},
      cancel: {action:this.closeDialog,label:'Cancel'},
      customText: true,
    };
    this.setState({ confirmationDialog:confirmationDialogConfig})
  }
  render() {
    const { classes, submissionID, acceptHandler, rejectHandler, skipHandler, disableSkip } = this.props;
    const { confirmationDialog } = this.state;

    if (!submissionID) return null;

    if (!this.state.showFeedbackForm)
    return (
      <div className={classes.root}>
        <Grid container justify="space-evenly">
          <Tooltip title="Skip">
            <Button variant="fab" className={classes.greyButton} aria-label="skip"
            onClick={skipHandler} disabled={disableSkip}>
                <RedoIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Accept">
            <Button variant="fab" className={classes.greenButton} 
           // onClick={() => this.setState({ showFeedbackForm: true, feedbackType: 'accept' })}
           onClick={acceptHandler}
            aria-label="accept">
                <AcceptIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Reject">
            <Button variant="fab" className={classes.redButton} aria-label="reject"
           // onClick={() => this.setState({ showFeedbackForm: true, feedbackType: 'reject' })}
           onClick ={rejectHandler}
           >
                <RejectIcon />
            </Button>
          </Tooltip>
        </Grid>
        <Button onClick ={this.handleNoFeedback} variant='outlined'>No feedback</Button>
      </div>
    );

    let feedbackText;
    if (this.state.feedback) {

      const mappedFeedback = map(this.state.feedback,(value,id)=>{
        return{id,value}
      }) 
      const sortedFeedback = sortBy(mappedFeedback,['id'])
      console.log(mappedFeedback,sortedFeedback)

      let prevSection = '-1';

      feedbackText = map(this.state.feedback,(value,id)=>{
        const feedbackBody = getFeedbackContent(id,value);
    
        if (!feedbackBody) return null;

        const feedbackTitle = getFeedbackTitle(id);
        if (prevSection !== id[0]) {
          prevSection = id[0];
          return (<React.Fragment>
            <Typography variant="subheading" style={{marginLeft:-20}}>
              {feedbackSections[id[0]]}
            </Typography>
            <li key={id}>
              <Typography variant="body1" style={{marginBottom:12}}>
                <b>{feedbackTitle}</b>—
                {feedbackBody}
              </Typography>
            </li>
          </React.Fragment>);
        }
        prevSection = id[0];
        return (<li key={id}>
          <Typography variant="body1" style={{marginBottom:12}}>
            <b>{feedbackTitle}</b>—
            {feedbackBody}
          </Typography>
        </li>);
      });
      feedbackText = feedbackText.filter(x => x !== null);
      if (feedbackText.length === 0 ||
        (feedbackText.length === 1 && feedbackText[0] === '')) {
          feedbackText = 'No feedback will be sent.';
      }
    }

    const confirmationDialogConfig = {
      title: `Submit Feedback?`,
      body: <ul style={{margin:0}}>{feedbackText}</ul>,
      request: {action:()=>{this.saveFeedback(), this.closeDialog(), this.props.getNextSubmission(), this.resetForm()},label:'Submit Feedback'},
      cancel: {action:this.closeDialog,label:'Cancel'},
      customText: true,
    };

    return (
      <div className={classes.root}>
        <Grid container justify="space-between">
          <Button color="default" className={classes.backButton}
          onClick={() => {this.setState({ showFeedbackForm: false })}}>
            <BackIcon className={classes.backIcon} />
            Back
          </Button>
          <Button color="default" className={classes.backButton}
          onClick={this.state.feedbackType === 'reject' ? rejectHandler : acceptHandler}>
            Review Later
          </Button>
        </Grid>
        <List component="nav"
          className={classes.list}
        >
          {map(SUBMISSION_FEEDBACK,(section,sectionId)=>
            <div className={classes.listSection} key={sectionId}>
              {section.map((element, i) =>
                <FeedbackElement
                  key={i}
                  handleFeedbackItem={this.handleOptionClick} 
                  id={sectionId+element.id}
                  title={`${sectionId+element.id}. ${element.title}`} 
                  value={this.state.feedback[sectionId+element.id]}
                  contents={element.content}
                  labels={element.labels}/> 
              )}
            </div>
          )}    
        </List>
        <Button variant="extendedFab" color="primary" 
          aria-label="Submit Feedback" 
          onClick={() => {this.setState({confirmationDialog: confirmationDialogConfig})}}
          className={classes.submitButton}>
          <SendIcon /> Submit Feedback
        </Button>

        {confirmationDialog && <ConfirmationDialog data={confirmationDialog}/>}
      </div>
    );
  }
}

const enhance = compose(
  withFirestore,
  // Handler functions as props
withHandlers({
    reviewSubmission: props => (submissionID,feedbackContent,submissionStatus) =>
    props.firestore.update(
      { collection: COLLECTIONS.submissions, doc: submissionID },
      {   operator:{
          displayName:props.displayName,
          UID: props.uid,
          },
          reviewedBy:props.uid,
          reviewedAt:props.firestore.FieldValue.serverTimestamp(),
          reviewed:true,
          feedbackContent,
          submissionStatus: `${submissionStatus}ed`,
      }
    ),
    
}),

);
export default enhance(
    compose(  
      withStyles(styles)(FeedbackForm)
    )
);
FeedbackForm.propTypes = {
  classes: PropTypes.object.isRequired,
};
