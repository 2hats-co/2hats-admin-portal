import React,{Component} from 'react'
import {withNavigation} from '../components/withNavigation'
import { InstantSearch } from 'react-instantsearch-dom';
import Search from '../components/Candidates/Search'
import Table from '../components/Candidates/Table'
class CandidatesContainer extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                  <InstantSearch
      appId="755HO7BO2Y"
      apiKey="e23c823ac1ef5956b7b41bf49cb8e003"
      indexName="candidate_search"
    >
     <Search/>
    </InstantSearch>
            </div>
        )
    }
}
export default withNavigation(CandidatesContainer)