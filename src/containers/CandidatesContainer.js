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
            fieldRestriction:[],
            catFilters:{
                updatedAt: [],
                stage: [],
                status: [],
                careerInterests: [],
                industry: [],
                score: [],
            },
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleAddFilter = this.handleAddFilter.bind(this)
        this.handleDeleteFilter = this.handleDeleteFilter.bind(this)
        this.searchQuery = this.searchQuery.bind(this)
        this.handleDismiss = this.handleDismiss.bind(this)
    }
    handleChange(name,value){
        console.log(name,value)
        this.setState({[name]:value})
    }
    handleAddFilter(category, value) {
        console.log('addFilter: ', category, value);
        const filtersToAppend = {};
        filtersToAppend[category] = value;
        this.setState((state, props) => ({
            catFilters: { ...state.catFilters, ...filtersToAppend }
        }));
    }
    handleDeleteFilter(category, value) {
        console.log('deleteFilter:', category, value);
        const newFilters = {};
        newFilters[category] = this.state.catFilters[category];
        newFilters[category].splice(newFilters[category].indexOf(value), 1);
        this.setState((state, props) => ({
            catFilters: { ...state.catFilters, ...newFilters }
        }));
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
        if(prevState.searchString !== this.state.searchString || prevState.currentPage !== this.state.currentPage ||prevState.hitsPerPage !== this.state.hitsPerPage ||prevState.catFilters !== this.state.catFilters ){
        this.searchQuery()
        }
    }
    searchQuery(){
        const index = createAlgoliaIndex(ALGOLIA_INDEX.candidates);
        const filters = ['stage','status']
        let queryFilters = ''
        filters.forEach(category => {
            if (this.state.catFilters[category].length !== 0){
              if(queryFilters!==''){
                queryFilters += ' AND '
              }
                let categoryQuery =''
                this.state.catFilters[category].forEach(option=>
                    {
                        if(categoryQuery!==''){
                            categoryQuery += ' OR '
                          }
                          categoryQuery += `${category}:${option}` 
                    })
                    queryFilters += categoryQuery
            }else{

            }
        })
        console.log(queryFilters)
        index.search(this.state.searchString,{
            "filters":queryFilters,
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
                <SearchBar
                    value={searchString}
                    changeHandler={this.handleChange}
                    catFilters={this.state.catFilters}
                    deleteFilterHandler={this.handleDeleteFilter}
                />
                <Table
                    candidateData={hits}
                    resultData={resultData}
                    changeHandler={this.handleChange}
                    addFilterHandler={this.handleAddFilter}
                    catFilters={this.state.catFilters}
                />
                {selectedCandidate !=='' &&<CandidateDialog dismiss={this.handleDismiss}
                    infoData={selectedCandidate}
                />}
            </div>
        )
    }
}
export default withNavigation(CandidatesContainer)
