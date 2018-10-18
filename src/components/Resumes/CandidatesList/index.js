import React,{Component} from 'react'
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { ALGOLIA_INDEX, createAlgoliaIndex } from '../../../config/algolia'
import CandidateItem from './CandidateItem'
class CandidatesList extends Component{

    constructor(props){
        super(props)
        this.state = {
            candidateFilter:'all',
            candidates:[]
        }
        this.handleCandidateFilter = this.handleCandidateFilter.bind(this)
        this.updateCandidates = this.updateCandidates.bind(this)
    }
    componentDidMount(){
        this.getCandidates(this.state.candidateFilter)
    }
    updateCandidates(response){
       this.setState({candidates:response.hits})
    }
    handleCandidateFilter(event,value){
        if(value){
            this.setState({candidateFilter:value})
        }
        this.getCandidates(value)
    }
    getCandidates(filter){
        let filters = ''
        switch (filter) {
            case 'all': filters = 'stage:resume OR stage:pre-review AND status:accepted OR status:rejected OR status:in-review'
                break;
            case 'accepted': filters = 'stage:resume AND status:accepted'
                break;
            case 'rejected': filters = 'stage:resume AND status:rejected'
                break;
            case 'in-review': filters = 'status:in-review'
                break;
            default:
                break;
        }
        const index = createAlgoliaIndex(ALGOLIA_INDEX.candidates);
        index.search('',{
            "filters":filters,
            "hitsPerPage": 40,
            "page": 0,
            "restrictSearchableAttributes": '',
            "analytics": false,
            "attributesToRetrieve": "*",             
        }).then(res => {
          this.updateCandidates(res)
        }).catch(err => {
            console.error("Search stage and status total error: ", err.message);
        });
    }
    render(){
        const {candidateFilter,candidates} = this.state
        return(<div><ToggleButtonGroup
            value={candidateFilter}
            exclusive
            onChange={this.handleCandidateFilter}>
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="in-review">inreview</ToggleButton>
            <ToggleButton value="accepted">accepted</ToggleButton>
            <ToggleButton value="rejected">rejected</ToggleButton>
          </ToggleButtonGroup>

        {candidates.map(x=> <CandidateItem onClick={()=>{this.props.setCandidate(x.objectID)}}data={x}/>)}
          </div>)
    }
}
export default CandidatesList