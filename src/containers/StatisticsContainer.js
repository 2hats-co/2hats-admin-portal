import React,{ Component } from 'react'
import { InstantSearch } from 'react-instantsearch-dom'

import { withNavigation } from '../components/withNavigation'
import AnalyticsButton from '../components/Statistics/AnalyticsButton'

class StatisticsContainer extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <AnalyticsButton />
        )
    }
}
export default withNavigation(StatisticsContainer)