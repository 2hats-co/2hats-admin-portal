import React,{Component} from 'react'
import {withNavigation} from '../components/withNavigation'
import CandidatesList from '../components/Resumes/CandidatesList'
import Grid from '@material-ui/core/Grid'
import Submission from '../components/Submission'
import FeedbackForm from '../components/FeedbackForm';
const sections = [{name:'Resume',
                   options:[{label:'Clear link between resume/job applied for',
                            content:'Your resume shows a clear link between the industry you’re applying for, your experience and your interests - well done.',
                            isPositive:true
                            },
                            {label:'Resume shows no clear interest in the job',
                            content:'Your resume shows a clear link between the industry you’re applying for, your experience and your interests - well done.',
                            isPositive:false
                            },
                            {label:'Resume lacks required information',
                            content:'Your resume shows a clear link between the industry you’re applying for, your experience and your interests - well done.',
                            isPositive:false
                            },
                            ]
                    },{name:'Skills',
                    options:[{label:'Clear link between resume/job applied for',
                             content:'Your resume shows a clear link between the industry you’re applying for, your experience and your interests - well done.',
                             isPositive:true
                             },
                             {label:'Resume shows no clear interest in the job',
                             content:'Your resume shows a clear link between the industry you’re applying for, your experience and your interests - well done.',
                             isPositive:false
                             },
                             {label:'Resume lacks required information',
                             content:'Your resume shows a clear link between the industry you’re applying for, your experience and your interests - well done.',
                             isPositive:false
                             },
                             ]
                     }
                ]
class ResumeContainer extends Component{
    constructor(props){
        super(props)
     //   this.candidates = React.createRef()
        this.setCandidate = this.setCandidate.bind(this)
        this.getNextCandidate = this.getNextCandidate.bind(this)
        this.state = {
            candidateUID: '',
            showFeedbackForm: false,
        }
        this.handleShowFeedbackForm = this.handleShowFeedbackForm.bind(this);
    }
    getNextCandidate = () =>{
        if(this.candidates){
            console.log(this.candidates)
            //this.candidates.setNextCandidate(this.state.candidateUID)
        }
      
    }
    componentDidMount(){
 
    }
    setCandidate(uid){
        this.setState({ candidateUID: uid, showFeedbackForm: false });
    }

    handleShowFeedbackForm() {
        this.setState({ showFeedbackForm: true });
    }

    render(){
        this.getNextCandidate()
        return(
        <Grid container direction='row' style={{height: 'calc(100vh - 70px)'}}>
            <Grid item style={{width: 360}}>
                <CandidatesList setCandidate={this.setCandidate}
                    selectedCandidate={this.state.candidateUID}
                />
            </Grid>
            <Grid item xs>
                <Submission UID={this.state.candidateUID}
                showFeedbackFormHandler={this.handleShowFeedbackForm} />
            </Grid>
            { this.state.showFeedbackForm ?
                <Grid item style={{width: 360}}>
                    <FeedbackForm sections={sections}/>
                </Grid>
                : null
            }

            
        </Grid>

        );
    }
}
export default withNavigation(ResumeContainer)
