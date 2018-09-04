import React,{Component} from 'react'
import {withNavigation} from '../components/withNavigation'
import Table from '../components/Candidates/Table'
import { ALGOLIA_INDEX, createAlgoliaIndex } from '../config/algolia'
import SearchBar from '../components/Candidates/SearchBar';

class CandidatesContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            hits:[],
            searchString:'',
            hitsPerPage:20,
            currentPage:0,
            nHits:0,
            fieldRestriction:[]
        }
        this.handleChange = this.handleChange.bind(this)
        this.searchQuery = this.searchQuery.bind(this)
    }
    handleChange(name,value){
        this.setState({[name]:value})
    }
    handleResults(res){
        console.log(res)
        this.setState({hits:res.hits,nPages:res.nbPages,nHits:res.nbHits})
    }
    componentWillMount(){
        this.searchQuery()
    }
    componentDidUpdate(prevProps,prevState){
        let updateProps = ['currentPage','searchString']
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
            nHits,hits} = this.state
            console.log('hits',hits)
            const resultData = {currentPage,nHits,hitsPerPage}
        return(
            <div>
                <SearchBar value={searchString} changeHandler={this.handleChange}/>
                <Table candidateData={hits} resultData={resultData} changeHandler={this.handleChange}/>
            </div>
        )
    }
}
export default withNavigation(CandidatesContainer)


{/* <InstantSearch
appId="755HO7BO2Y"
apiKey="e23c823ac1ef5956b7b41bf49cb8e003"
indexName="candidate_search"
>
<Search/>
</InstantSearch> */}