import React, { Component } from 'react';

// mui
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import PersonIcon from '@material-ui/icons/Person';
//redux 
import { COLLECTIONS} from "../../constants/firestore";
import { compose } from "redux";
import { withHandlers } from "recompose";
import { connect } from "react-redux";
import { withFirestore } from "../../utilities/withFirestore";


import ConfirmationDailog from '../ConfirmationDialog';
import PersonDetails from './PersonDetails';
import SubmissionDetails from './SubmissionDetails';
import FeedbackForm from '../../components/FeedbackForm';
import {SUBMISSION_FEEDBACK} from '../../constants/feedback'

import { Document,Page } from 'react-pdf';
const styles = theme => ({
    root: {
        height: 'calc(100vh - 64px)',
    },
    card: {
        height: 'calc(100vh - 64px)',
        boxSizing: 'border-box',
        overflowY: 'scroll',
        padding: 40,
        background: '#fff',
        boxShadow: '0 5px 40px 0 rgba(0,0,0,0.1)',
        borderRadius: '10px 10px 0 0',
    },
    avatar: {
        width: 56,
        height: 56,
        marginRight: 16,
    },
    greyButton: {
        boxShadow: 'none',
        marginRight: 16,
    },
    greenButton: {
        backgroundColor: '#24c875',
        color: '#fff',
        boxShadow: 'none',
        marginRight: 16,
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
    },
    subheading: {
        marginTop: 40,
        marginBottom: 10,
        fontWeight: 700,
    },
    chip: {
        marginRight: 4,
    },
});

class Submission extends Component {
    
    constructor(props){
        super(props);
        this.setSubmission = this.setSubmission.bind(this);
        this.handleRejection = this.handleRejection.bind(this);
        this.handleAcception = this.handleAcception.bind(this);
        this.proccessSubmission = this.props.proccessSubmission.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.getNextSubmission = this.getNextSubmission.bind(this);
        this.handleSkip = this.handleSkip.bind(this);
        this.state = {
            submission: false,
            submissionID:'',
            submissionStatus:'',
            confirmationDialog:null,
            skipOffset:0,
            disableSkip: false,
        };
    }
    
    componentDidUpdate(prevProps,prevState){
        
        if (this.props[this.props.listType]) {
            if (this.state.submissionID === '') {
                console.log('setSubmission', this.state.submissionID)
                this.setSubmission(0);
            }
        }
    }
    componentDidMount() {
        
    }
    
    componentWillUnmount() {
        this.props.returnSubmission(this.state.submissionID)
    }
  
    setSubmission(i){
        
        const submission = this.props[this.props.listType][i + this.state.skipOffset];
        console.log('setSubmission', i + this.state.skipOffset);
        this.setState({
            submissionID: submission.id,
            submission: submission,
            submissionStatus: submission.submissionStatus,
        });
  
         this.props.holdSubmission(submission.id, this.props.listType) 

    }
    handleRejection(){
        this.props.proccessSubmission(this.state.submissionID,'rejected',this.state.submission.UID)
        this.getNextSubmission()
        this.closeDialog()
    }
    handleAcception(){
        this.props.proccessSubmission(this.state.submissionID,'accepted',this.state.submission.UID)
        this.getNextSubmission()
        this.closeDialog()
    }
    handleNoFeedback=()=>{
        this.props.proccessSubmission(this.state.submissionID,'demographic-rejected',this.state.submission.UID)
        this.getNextSubmission()
        this.closeDialog()
    }
  
    getNextSubmission(){
        this.setSubmission(0)   
    }

    handleSkip() {
        
        if (this.state.skipOffset + 1 === this.props[this.props.listType].length - 1) {
            this.setState({ disableSkip: true });
        }
        if (this.state.skipOffset + 1 < this.props[this.props.listType].length) {
            this.props.returnSubmission(this.state.submissionID)
            this.setState(
                (state) => ({ skipOffset: state.skipOffset + 1 }),
                () => {this.setSubmission(0)}
            );
        }
    }

    closeDialog(){
        this.setState({confirmationDialog:null})
    } 
  
    render(){
        console.log(this.props)
        const {submission,confirmationDialog,submissionStatus} = this.state;
        const {classes} = this.props;
        const firstName = (submission.displayName?submission.displayName.split(' ')[0]:'')
        const acceptedDailog = {title:`Are you sure you want to accept ${firstName}?`,
        body:`This will send ${firstName} calendar invite for an online interview`,
        request:{action:this.handleAcception,label:'yes'},
        cancel:{action:this.closeDialog,label:'cancel'}}
        const rejedctedDailog = {title:`Are you sure you want to reject ${firstName}?`,
        body:`This will update ${firstName} account to pre-review rejected`,
        request:{action:this.handleRejection,
        label:'yes'},cancel:{action:this.closeDialog,label:'cancel'}} 
        const noFeedbackDialog = {
            title: `No Feedback?`,
            body: 'Is this person too experinced or in an unrelated profession to 2hats',
            request: {action:this.handleNoFeedback,label:'Send rejection'},
            cancel: {action:this.closeDialog,label:'Cancel'},
            customText: true,
          };
        let submissionStatusLabel = ''
        switch (submissionStatus) {
            case 'accepted':
            case 'rejected':
            case 'processing':
            submissionStatusLabel = ` – ${submissionStatus} by ${submission.operator && submission.operator.displayName && submission.operator.displayName.split(' ')[0]} `
            console.log('submission',submission)
                break;
        
            default:
                break;
        }
        if(submission){
            console.log(submission);

            //TODO: accept  
            return(<React.Fragment>
                <Grid container className={classes.root}>
                    <Grid item xs className={classes.card}>
                        <PersonDetails
                            submission={ submission }
                            showButtons={ submissionStatus==='pending'|| submissionStatus ==='processing' }
                            submissionStatusLabel={submissionStatusLabel}
                        />
                        <SubmissionDetails submission={submission} />
                    </Grid>
                    <Grid item style={{width:400}}>
                        <FeedbackForm
                            sections={SUBMISSION_FEEDBACK}
                            submissionID={this.state.submissionID}
                            acceptHandler={()=>{this.setState({confirmationDialog:acceptedDailog})}}
                            rejectHandler={()=>{this.setState({confirmationDialog:rejedctedDailog})}}
                            noFeedbackHandler={()=>{this.setState({confirmationDialog:noFeedbackDialog})}}
                            getNextSubmission={this.getNextSubmission}
                            skipHandler={this.handleSkip}
                            disableSkip={this.state.disableSkip}
                            showFeedbackForm={this.props.listType === "rejected" || this.props.listType === "accepted"}
                        />
                    </Grid>
                </Grid>
                {confirmationDialog&& <ConfirmationDailog data={confirmationDialog}/>}
                </React.Fragment>
            );
        }else{
            return(
                <Grid container direction="column" alignItems="center" justify="center"
                    className={classes.root}
                >
                    <CircularProgress size={50} />
                </Grid>
            );
        }
       
    }
}

const enhance = compose(
    withFirestore,
    // Handler functions as props
  withHandlers({
      holdSubmission: props => (submissionID) =>
      props.firestore.update(
        { collection: COLLECTIONS.submissions, doc: submissionID },
        {   
            viewedAt: props.firestore.FieldValue.serverTimestamp(),
            processing: true
        }
      ),
    returnSubmission: props => (submissionID) =>
      props.firestore.update(
        { collection: COLLECTIONS.submissions, doc: submissionID },
        {   
            processing: false
        }
      ),proccessSubmission: props => (submissionID,submissionStatus,candidateUID) =>{
        props.firestore.update(
            { collection: COLLECTIONS.submissions, doc: submissionID },
            {submissionStatus,
            screenedBy: props.uid,
            processing:false,
            reviewed:false,
            screenedAt: props.firestore.FieldValue.serverTimestamp(),
            updatedAt: props.firestore.FieldValue.serverTimestamp()
            }
          )
          let updateObject = {}
          switch (submissionStatus) {
              case 'accepted':
                  updateObject = {
                    stage:'resume',
                    status:'accepted',
                    operator:props.uid,
                    updatedAt:props.firestore.FieldValue.serverTimestamp()
                }
                  break;
                case 'rejected':
                  updateObject = {
                    stage:'pre-review',
                    status:'rejected',
                    operator:props.uid,
                    updatedAt:props.firestore.FieldValue.serverTimestamp()
                }
                case 'demographic-rejected':
                updateObject = {
                  stage:'resume',
                  status:'rejected',
                  operator:props.uid,
                  updatedAt:props.firestore.FieldValue.serverTimestamp()
              }
                  break;
              default:
                  break;
          }
          props.firestore.update(
            { collection: COLLECTIONS.users, doc: candidateUID },
            updateObject
          )
          props.firestore.update(
            { collection: COLLECTIONS.candidates, doc: candidateUID },
            updateObject
          )
      }    
  }),

    connect(({ firestore }) => ({
      pending: firestore.ordered.pendingSubmissions,
      rejected: firestore.ordered.rejectedSubmissions,
      accepted: firestore.ordered.acceptedSubmissions,
    }))
  );

  export default enhance(
      compose(  
        withStyles(styles)(Submission)
      )
  );
