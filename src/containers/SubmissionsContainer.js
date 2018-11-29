import React,{Component} from 'react'
import {withNavigation} from '../components/withNavigation'
import CandidatesList from '../components/Resumes/CandidatesList'
import Grid from '@material-ui/core/Grid'
import Submission from '../components/Submission'
import CircularProgress from '@material-ui/core/CircularProgress';

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
        this.state = {
            submissionID: '',
            showFeedbackForm: false,
        }
        this.handleShowFeedbackForm = this.handleShowFeedbackForm.bind(this);
        this.setSubmission = this.setSubmission.bind(this)
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
        console.log('props',this.props)
        return(
            <Submission
                id={this.state.submissionID}
                showFeedbackFormHandler={this.handleShowFeedbackForm}
                listType={this.props.location.pathname.split('/')[1]}
            />
        );
    }
}

const filters = [
    {storeName:'acceptedSubmissions',
    query:[['submissionStatus','==','accepted'],
    ['processing','==',false],
    ['reviewed','==',false]],
    sort:[['createdAt', 'asc']],
    limit:10},
    {storeName:'rejectedSubmissions',
    query:[['submissionStatus','==','rejected'],
    ['processing','==',false],
    ['reviewed','==',false]],
    sort:[['createdAt', 'asc']],
    limit:10},
    {storeName:'pendingSubmissions',
    query:[
    ['submissionStatus','==','pending'],
    ['processing','==',false],
    //['reviewed','==',false]
],
    sort:[['createdAt', 'asc']],
    limit:10}
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
      componentDidMount() {
        filters.map((x)=>{
            const submissionsListenerSettings = {collection:COLLECTIONS.submissions,
                                                    storeAs:x.storeName, 
                                                    where:x.query,orderBy:x.sort,
                                                    limit: x.limit}
            this.props.loadData(submissionsListenerSettings);
        })
      },
    }),
  );

  export default enhance(
      compose(  
            withNavigation(SubmissionsContainer)
      )
  );
  
//export default withNavigation(SubmissionsContainer)
