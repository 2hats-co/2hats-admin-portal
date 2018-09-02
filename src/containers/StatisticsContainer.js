import React,{Component} from 'react'
import {withNavigation} from '../components/withNavigation'
class StatisticsContainer extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                stats page
            </div>
        )
    }
}
export default withNavigation(StatisticsContainer)