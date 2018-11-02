import React,{Component} from 'react';
import PropTypes, { element } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
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
import { connect } from "react-redux";
import { withFirestore } from "../../utilities/withFirestore";

import SendIcon from '@material-ui/icons/Send';
import FeedbackElement from './FeedbackElement';
import { Divider } from '@material-ui/core';
import * as _ from 'lodash'
import {SUBMISSION_FEEDBACK,getFeedbackContent} from '../../constants/feedback'
const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    maxWidth: 360,
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
  nested: {
    paddingLeft: theme.spacing.unit * 6,
  },
  submitButton: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    width: 256,
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
    this.state = {
      showFeedbackForm: false,
    };
  }

  

  handleOptionClick(id,value) {
    const currentValue = this.state[id]
    if(currentValue === 1 && value ===1 ){
     this.setState({[id]:0})
    }else{
      this.setState({[id]:value})
    }
  }
  saveFeedback(){
    
  const feedbackContent =  _.map(this.state,(value,id)=>{
     return {id,content:getFeedbackContent(id,value)}
    })
    this.props.reviewSubmission(this.props.submissionID,feedbackContent)
  }
  render() {
    const { classes, submissionID, acceptHandler, rejectHandler, skipHandler } = this.props;

    if (!submissionID) return null;

    if (!this.state.showFeedbackForm)
    return (
      <div className={classes.root}>
        <Grid container justify="space-evenly">
          <Tooltip title="Skip">
            <Button variant="fab" className={classes.greyButton} aria-label="skip"
            onClick={skipHandler}>
                <RedoIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Accept">
            <Button variant="fab" className={classes.greenButton} 
            onClick={acceptHandler}
            aria-label="accept">
                <AcceptIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Reject">
            <Button variant="fab" className={classes.redButton} aria-label="reject"
            onClick={() => this.setState({ showFeedbackForm: true })}>
                <RejectIcon />
            </Button>
          </Tooltip>
        </Grid>
      </div>
    );

    return (
      <div className={classes.root}>
        <Button color="default" className={classes.backButton}
        onClick={() => {this.setState({ showFeedbackForm: false })}}>
          <BackIcon className={classes.backIcon} />
          Back
        </Button>
        <List component="nav"
          className={classes.list}
        >
          {_.map(SUBMISSION_FEEDBACK,(section,sectionId)=>
            <React.Fragment key={sectionId}>
          
              {section.map((element, i) => <FeedbackElement key={i} handleFeedbackItem={this.handleOptionClick} 
              id={sectionId+element.id} title={`${sectionId+element.id}. ${element.title}`} 
              value={this.state[sectionId+element.id]} contents={element.content} labels={element.labels}/> )}
             <Divider/>
            </React.Fragment>
            )}
            
        </List>

        <Button variant="extendedFab" color="primary" 
          aria-label="Submit Feedback" 
          onClick={this.saveFeedback}
          className={classes.submitButton}>
          <SendIcon /> Submit Feedback
        </Button>
      </div>
    );
  }
}


const enhance = compose(

  withFirestore,
  // Handler functions as props
withHandlers({
    reviewSubmission: props => (submissionID,feedbackContent) =>
    props.firestore.update(
      { collection: COLLECTIONS.submissions, doc: submissionID },
      {   operator:{
          displayName:props.displayName,
          UID: props.uid,
          },
          reviewedBy:props.uid,
          submissionStatus:'reviewed',
          feedbackContent,
          updatedAt: props.firestore.FieldValue.serverTimestamp()
      }
    ),
    
}),

connect(({ firestore }) => ({
    rejected: firestore.data.rejectedSubmissions,
  }))
);

export default enhance(
    compose(  
      withStyles(styles)(FeedbackForm)
    )
);
FeedbackForm.propTypes = {
  classes: PropTypes.object.isRequired,
};
