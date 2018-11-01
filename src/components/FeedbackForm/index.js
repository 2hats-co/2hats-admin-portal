import React,{Component} from 'react';
import PropTypes, { element } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';

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
    backgroundColor: theme.palette.background.paper,
  },
  list: {
    height: '100%',
    overflowY: 'scroll',
    padding: 0,
  },
  listPadder: {
    width: '100%',
    height: 88,
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
});
class FeedbackForm extends Component {
  constructor(props) {
    super(props);
    this.saveFeedback =this.saveFeedback.bind(this)
    this.handleOptionClick =this.handleOptionClick.bind(this)
    this.state = {};
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
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List component="nav"
          className={classes.list}
        >
          {_.map(SUBMISSION_FEEDBACK,(section,sectionId)=>
            <React.Fragment>
          
              {section.map(element=><FeedbackElement handleFeedbackItem={this.handleOptionClick} 
              id={sectionId+element.id} title={`${sectionId+element.id}. ${element.title}`} 
              value={this.state[sectionId+element.id]} contents={element.content} labels={element.labels}/> )}
             <Divider/>
            </React.Fragment>
            )}
            
          <Divider/>
          <div className={classes.listPadder} />
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