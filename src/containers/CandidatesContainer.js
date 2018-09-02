import React,{Component} from 'react'
import {withNavigation} from '../components/withNavigation'
import SearchBar from '../components/Candidates/SearchBar'
import Table from '../components/Candidates/Table'
class CandidatesContainer extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <SearchBar/>
                <Table/>
            </div>
        )
    }
}
export default withNavigation(CandidatesContainer)