import React,{Component} from 'react'
import {withNavigation} from '../components/withNavigation'
import CandidatesList from '../components/Resumes/CandidatesList'
import Grid from '@material-ui/core/Grid'
import Submission from '../components/Submission'
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
            <Grid item xs={9}>
            <Submission UID={this.state.candidateUID}/>
            </Grid>
        </Grid>)
    }
}
export default withNavigation(ResumeContainer)