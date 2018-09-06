import React,{Component} from 'react'
import {withNavigation} from '../components/withNavigation'
import Table from '../components/Candidates/Table'
import { ALGOLIA_INDEX, createAlgoliaIndex } from '../config/algolia'
import SearchBar from '../components/Candidates/SearchBar';
import CandidateDialog from '../components/CandidateDialog';

class CandidatesContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            selectedCandidate:'',
            hits:[],
            searchString:'',
            hitsPerPage:20,
            currentPage:0,
            nHits:0,
            fieldRestriction:[]
        }
        this.handleChange = this.handleChange.bind(this)
        this.searchQuery = this.searchQuery.bind(this)
        this.handleDismiss = this.handleDismiss.bind(this)
    }
    handleChange(name,value){
        console.log(name,value)
        this.setState({[name]:value})
    }
    handleResults(res){
        this.setState({hits:res.hits,nPages:res.nbPages,nHits:res.nbHits})
    }
    componentWillMount(){
        this.searchQuery()
    }
    handleDismiss(){
        this.setState({selectedCandidate:''})
    }
    componentDidUpdate(prevProps,prevState){
        if(prevState.searchString !== this.state.searchString || prevState.currentPage !== this.state.currentPage ||prevState.hitsPerPage !== this.state.hitsPerPage){
        this.searchQuery()
        }
    }
    searchQuery(){
        const index = createAlgoliaIndex(ALGOLIA_INDEX.candidates);
        index.search(this.state.searchString,{
            "hitsPerPage": this.state.hitsPerPage,
            "page": this.state.currentPage,
            "restrictSearchableAttributes": this.state.fieldRestriction,
            "analytics": false,
            "attributesToRetrieve": "*",             
        }).then(res => {
          this.handleResults(res)
            
        }).catch(err => {
            console.error("Search stage and status total error: ", err.message);
        });
    }
   
    render(){
        const {searchString,
            hitsPerPage,
            currentPage,
            nHits,hits,selectedCandidate} = this.state
            
            const resultData = {currentPage,nHits,hitsPerPage}
        return(
            <div>
                <SearchBar value={searchString} changeHandler={this.handleChange}/>
                <Table candidateData={hits} resultData={resultData} changeHandler={this.handleChange}/>
                {selectedCandidate !=='' &&<CandidateDialog dismiss={this.handleDismiss}
                    infoData={selectedCandidate}
                />}
            </div>
        )
    }
}
export default withNavigation(CandidatesContainer)