import React,{Component} from 'react'
import {withNavigation} from '../components/withNavigation'
import CandidatesList from '../components/Resumes/CandidatesList'
import Grid from '@material-ui/core/Grid'
import Submission from '../components/Submission'
import FeedbackForm from '../components/FeedbackForm';
import {SUBMISSION_FEEDBACK} from '../constants/feedback'

//redux 
import { COLLECTIONS} from "../constants/firestore";
import { compose } from "redux";
import { withHandlers, lifecycle } from "recompose";
import { connect } from "react-redux";
import { withFirestore } from "../utilities/withFirestore";
import SubmissionsList from '../components/Submission/SubmissionsList';
class SubmissionsContainer extends Component{
    constructor(props){
        super(props)
     //   this.candidates = React.createRef()
    //    this.setCandidate = this.setCandidate.bind(this)
        this.getNextCandidate = this.getNextCandidate.bind(this)
        this.state = {
            submissionID: '',
            showFeedbackForm: false,
        }
        this.handleShowFeedbackForm = this.handleShowFeedbackForm.bind(this);
        this.setSubmission = this.setSubmission.bind(this)
    }
    getNextCandidate = () =>{

    }
    componentDidMount(){
 
    }
    setSubmission(id){
        this.setState({ submissionID: id, showFeedbackForm: false });
    }
    handleShowFeedbackForm() {
        
        this.setState({ showFeedbackForm: true });
    }

    render(){
        this.getNextCandidate()
        return(
               
      
        <Grid container direction="row" wrap="nowrap" style={{height: 'calc(100vh - 64px)'}}>
            <Grid item style={{maxWidth: 360}}>
                <SubmissionsList setSubmission={this.setSubmission}
                    selectedCandidate={this.state.candidateUID}
                />
            </Grid>
            <Grid item xs>
                <Submission id={this.state.submissionID}
                showFeedbackFormHandler={this.handleShowFeedbackForm} />
            </Grid>
            { this.state.showFeedbackForm ?
                <Grid item style={{width: 296}}>
                    <FeedbackForm sections={SUBMISSION_FEEDBACK} submissionID={this.state.submissionID}/>
                </Grid>
                : null
            }   
        </Grid>
        );
    }
}

const filters = [{storeName:'acceptedSubmissions',query:['submissionStatus','==','accepted'],sort:[['createdAt', 'desc']],limit:20},
{storeName:'rejectedSubmissions',query:['submissionStatus','==','rejected'],sort:[['createdAt', 'desc']],limit:20},
{storeName:'pendingSubmissions',query:['submissionStatus','==','pending'],sort:[['createdAt', 'asc']],limit:300},
{storeName:'submissions',query:[],sort:[['createdAt', 'desc']],limit:20}
]
const enhance = compose(
    // add redux store (from react context) as a prop
    withFirestore,
    // Handler functions as props
    withHandlers({
      loadData: props => listenerSettings =>
        props.firestore.setListener(listenerSettings),
    }),
    // Run functionality on component lifecycle
    lifecycle({
      // Load data when component mounts
      componentWillMount() {
        filters.map((x)=>{
            const submissionsListenerSettings = {collection:COLLECTIONS.submissions,
                                                    storeAs:x.storeName, 
                                                    where:x.query,orderBy:x.sort,
                                                    limit: x.limit}
            this.props.loadData(submissionsListenerSettings);
        })
      },
    //   componentDidUpdate(prevProps, prevState) {
    //       console.log('lifecycle',this.props)
    //   },
      componentWillUnmount() {
        
      }
    }),
    // Connect todos from redux state to props.todos
    connect(({ firestore }) => ({
      submissions: firestore.ordered.submissions, // document data by id
    }))
  );

  export default enhance(
      compose(  
            withNavigation(SubmissionsContainer)
      )
  );
  
//export default withNavigation(SubmissionsContainer)
