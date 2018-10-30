import React, { Component } from 'react';
import moment from 'moment';

// mui
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FlagIcon from '@material-ui/icons/Flag';
import AcceptIcon from '@material-ui/icons/Done';
import RejectIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Chip from '@material-ui/core/Chip';
//redux 
import { COLLECTIONS} from "../../constants/firestore";
import { compose } from "redux";
import { withHandlers } from "recompose";
import { connect } from "react-redux";
import { withFirestore } from "../../utilities/withFirestore";


import ConfirmationDailog from '../ConfirmationDialog';
import { Document,Page } from 'react-pdf';
import EduExpCard from './EduExpCard';

const styles = theme =>{ console.log(theme) 
    return({
   
    root: {
        height: '900px',
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
    pdfDocument: {
        width: 'calc(100vw - 800px)',
    },
    pdfPage: {
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        marginBottom: 8,
    },
})};

class Submission extends Component {
    
    constructor(props){
        super(props);
        this.setSubmission = this.setSubmission.bind(this);
        this.handleRejection = this.handleRejection.bind(this);
        this.handleAcception = this.handleAcception.bind(this);
        this.proccessSubmission = this.props.proccessSubmission.bind(this)
        this.closeDialog = this.closeDialog.bind(this)
        this.getNextSubmission = this.getNextSubmission.bind(this)
        this.state = {
            submission: false,
            submissionID:'',
            submissionStatus:'',
            confirmationDialog:null
        };
    }
    
    componentDidUpdate(prevProps,prevState){
       const {submissionStatus,submissionID} = this.state
        if(prevProps.id !== this.props.id){
            if(submissionID!==''){
                if(submissionStatus ==='pending' ||submissionStatus ==='processing'){
                    this.props.returnSubmission(submissionID)
                }
            }
            this.setSubmission(this.props.id)
        }
        if(prevState.submission !== this.state.submission){
            if(this.state.submission.submissionStatus ==='rejected'){
                this.props.showFeedbackFormHandler()
            }
        } 
    }
    componentDidMount() {
       
    }
    
    componentWillUnmount() {
        window.removeEventListener('onbeforeunload', this.handleWindowClose);
    }
  
    setSubmission(id){
        const {submissionID,submissionStatus} = this.state
        let submissions = Object.assign(this.props.all,this.props.accepted)
        submissions = Object.assign(submissions,this.props.rejected)
        submissions = Object.assign(submissions,this.props.pending)

        console.log('submissions:',submissions)
       
        this.setState({submissionID:id,submission:submissions[id],submissionStatus:submissions[id].submissionStatus})
        if(submissions[id].submissionStatus ==='pending'){
            this.props.holdSubmission(id)
        }
       
    }
    handleRejection(){
        this.props.proccessSubmission(this.state.submissionID,'rejected',this.state.submission.UID)
        this.getNextSubmission()
    }
    handleAcception(){
        this.props.proccessSubmission(this.state.submissionID,'accepted',this.state.submission.UID)
        this.getNextSubmission()
    }
    getNextSubmission(){
        this.setSubmission(this.props.pendingArray[0].id)
    }
    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }  
    closeDialog(){
        this.setState({confirmationDialog:null})
    } 
  
    render(){
    
    
        const {submission,confirmationDialog,submissionStatus} = this.state;
        const {classes, showFeedbackFormHandler} = this.props;
        const firstName = (submission.displayName?submission.displayName.split(' ')[0]:'')
        const acceptedDailog = {title:`are you sure you want to accept ${firstName}?`,body:'this will send the candidate with calender invite for the online interview',request:{action:()=>{this.handleAcception(),this.closeDialog()},label:'yes'},cancel:{action:this.closeDialog,label:'cancel'}}
        const rejedctedDailog = {title:`are you sure you want to reject ${firstName}?`,
        body:`this will update ${firstName} account to pre-review rejected`,request:{action:()=>{this.handleRejection(),this.closeDialog()},label:'yes'},cancel:{action:this.closeDialog,label:'cancel'}}

        
        let submissionStatusLabel = ''
            switch (submissionStatus) {
                case 'accepted':
                case 'rejected':
                case 'processing':
                submissionStatusLabel = ` - ${submissionStatus} by ${submission.operator&& submission.operator.displayName.split(' ')[0]} `
                console.log('submission',submission)
                    break;
            
                default:
                    break;
            }
        const pages = [];
        for (let i = 0; i < this.state.numPages; i++) {
            pages.push(<Page pageNumber={i + 1} key={i} width={window.innerWidth - 800 - 64}
            className={classes.pdfPage} />);
        }

        if(submission){
            console.log(submission);
            const timestamp = moment.unix(submission.createdAt.seconds)
                .format('LLLL');

            let interests = '';
            if (submission.submissionContent.careerInterests.value) {
                for (let i = 0; i < submission.submissionContent.careerInterests.value.length; i++) {
                    interests += submission.submissionContent.careerInterests.value[i];
                    if (i < submission.submissionContent.careerInterests.value.length - 1) interests += ', ';
                }
            }
            //TODO: accept  
            return(<div>
                <Grid container direction="column" wrap="nowrap" className={classes.root}>

                    <Grid item>
                        <Grid container justify="space-between">
                            <Grid item xs>
                                <Grid container>
                                    <Grid item>
                                        <Avatar className={classes.avatar}><PersonIcon /></Avatar>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="headline">{submission.displayName} {submissionStatusLabel} </Typography>
                                        <Typography variant="body2">{interests}</Typography>
                                        <Typography variant="body1">Submitted on {timestamp}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {(submissionStatus==='pending'|| submissionStatus ==='processing')&&<Grid item>
                                <Button variant="fab" className={classes.greyButton} aria-label="reject">
                                    <FlagIcon />
                                </Button>
                                <Button variant="fab" className={classes.greenButton} 
                                onClick={()=>{this.setState({confirmationDialog:acceptedDailog})}}
                                aria-label="accept">
                                    <AcceptIcon />
                                </Button>
                                <Button variant="fab" className={classes.redButton} aria-label="reject"
                                onClick={()=>{this.setState({confirmationDialog:rejedctedDailog})}}>
                                    <RejectIcon />
                                </Button>
                            </Grid>}
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Typography className={classes.subheading} variant="subheading">Bio:</Typography>
                        <Typography variant="body1">{submission.submissionContent.bio}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography className={classes.subheading} variant="subheading">Available Days:</Typography>
                        <Typography variant="body1">{submission.submissionContent.availableDays}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography className={classes.subheading} variant="subheading">Skills:</Typography>
                        {submission.submissionContent.skills.map(x =>
                            <Chip color="primary" label={x} key={x} className={classes.chip} />
                        )}
                    </Grid>
                    <Grid item >
                        <Typography className={classes.subheading} variant="subheading">{submission.submissionContent.process === 'upload' ?'Resume':'profile'}:</Typography>
                        {submission.submissionContent.process === 'upload' &&<Document 
                            onLoadSuccess={this.onDocumentLoadSuccess}
                            file={submission.submissionContent.resumeFile.downloadURL}
                            className={classes.pdfDocument}
                        >
                            { pages }
                        </Document>}
                        {submission.submissionContent.process === 'build' && 
                        <div>
                        <Typography className={classes.subheading} variant="subheading">education</Typography>
                        {submission.submissionContent.education.map(x=> <EduExpCard title={x.degree} label={x.major} description={x.description} startDate={x.startDate} endDate={x.endDate}/>)}
                        <Typography className={classes.subheading} variant="subheading">experince</Typography>
                        {submission.submissionContent.experience.map(x=> <EduExpCard title={`${x.title} - ${x.type}`} label={x.organisation} description={x.description} startDate={x.startDate} endDate={x.endDate}/>)}
                        </div>
                        }
                    </Grid>
                </Grid>
                {confirmationDialog&& <ConfirmationDailog data={confirmationDialog}/>}
                </div>
            );
        }else{
            return(
                <Grid container direction="column" alignItems="center" justify="center"
                    style={{height: '100%', color: '#808080'}}
                >
                    <PersonIcon style={{width: 64, height: 64, opacity: 0.87}} />
                    No candidate selected
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
        {   operator:{
            displayName:props.displayName,
            UID: props.uid,
            },
            viewedAt: props.firestore.FieldValue.serverTimestamp(),
            submissionStatus:'processing'
        //  updatedAt: props.firestore.FieldValue.serverTimestamp()
        }
      ),
    returnSubmission: props => (submissionID) =>
      props.firestore.update(
        { collection: COLLECTIONS.submissions, doc: submissionID },
        {   
            submissionStatus:'pending'
        //  updatedAt: props.firestore.FieldValue.serverTimestamp()
        }
      ),proccessSubmission: props => (submissionID,submissionStatus,candidateUID) =>{
        props.firestore.update(
            { collection: COLLECTIONS.submissions, doc: submissionID },
            {submissionStatus,
            reviewedBy: props.uid,
             reviewedAt: props.firestore.FieldValue.serverTimestamp()
            }
          )
          let updateObject = {}
          switch (submissionStatus) {
              case 'accepted':
                  updateObject = {stage:'resume',status:'accepted',
                  operator:props.uid,
                  updatedAt:props.firestore.FieldValue.serverTimestamp()}
                  break;
                case 'rejected':
                  updateObject = {stage:'pre-review',
                  status:'rejected',
                  operator:props.uid,
                  updatedAt:props.firestore.FieldValue.serverTimestamp()}
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
      all: firestore.data.submissions,
      accepted: firestore.data.acceptedSubmissions,
      pending: firestore.data.pendingSubmissions,
      pendingArray: firestore.ordered.pendingSubmissions,
      rejected: firestore.data.rejectedSubmissions,
    }))
  );

  export default enhance(
      compose(  
        withStyles(styles)(Submission)
      )
  );
  

