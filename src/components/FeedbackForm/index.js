import React,{Component} from 'react';
import PropTypes, { element } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import Collapse from '@material-ui/core/Collapse';
import SendIcon from '@material-ui/icons/Send';
import FeedbackElement from './FeedbackElement';
import { Divider } from '@material-ui/core';

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
const generalFeedback = [{id:'1',title:'Link between industry and interest',labels:['','No link','Unclear','Clear']}]
const contentFeedback = [
                      {id:'2',title:'Relevant content to Industry',labels:['','Bad','Okay','Good']},
                      {id:'2a',title:'Use of bullet Points',labels:['','Lengthy','Uncondenced','Readable']},
                      {id:'2b',title:'Max Two Page Length',labels:['','Lengthy','Uncondenced','Good']},
                      {id:'2c',title:'Quantifiable Information',labels:['','Not Quantifiable','Not Quantifiable','Quantifiable']}]
const grammarFeedback = [{id:'3',title:'Grammar & Spelling',labels:['','Bad','has issues','Good']}]
const formattingFeedback = [{id:'4',title:'Formatting & Layout',labels:['','Bad','has issues','Good']}]
const acheivementsFeedback = [{id:'5',title:'Acheivements',labels:['','None','Little','Good']}]
const experienceFeedback = [{id:'6',title:'Relevant Experience',labels:['','None','Unfocused','Focused']}]
const skillsFeedback = [{id:'7',title:'Relevant Skills',labels:['','None','Unfocused','Focused']}]

const feedbackSections = [generalFeedback,contentFeedback,grammarFeedback,formattingFeedback,acheivementsFeedback,experienceFeedback,skillsFeedback]
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

   
    console.log(this.state)
  }
  
  

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List component="nav"
          className={classes.list}
        >
          {feedbackSections.map(section=>
            <React.Fragment>
          
              {section.map(element=><FeedbackElement handleFeedbackItem={this.handleOptionClick} id={element.id} title={`${element.id}.${element.title}`} value={this.state[element.id]} labels={element.labels}/> )}
             <Divider/>
            </React.Fragment>
            )}
            
          <Divider/>
          <div className={classes.listPadder} />
        </List>

        <Button variant="extendedFab" color="primary" aria-label="Submit Feedback" onClick={this.saveFeedback}
          className={classes.submitButton}
        >
          <SendIcon /> Submit Feedback
        </Button>
      </div>
    );
  }
}

FeedbackForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeedbackForm);
