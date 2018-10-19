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
        this.setCandidate = this.setCandidate.bind(this)
        this.state = {
            candidateUID:''
        }
    }
    componentDidMount(){

    }
    setCandidate(uid){
        this.setState({candidateUID:uid})
    }
    render(){
        return(<Grid container direction='row'>
            <Grid item xs={3}>
                 <CandidatesList setCandidate={this.setCandidate}/>
            </Grid>
            <Grid item xs={6}>
                 <Submission UID={this.state.candidateUID}/>
            </Grid>
            <Grid item xs={3}>
                 <FeedbackForm sections={sections}/>
            </Grid>
        </Grid>)
    }
}
export default withNavigation(ResumeContainer)