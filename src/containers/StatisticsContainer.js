import React,{ Component } from 'react'
import { InstantSearch } from 'react-instantsearch-dom'

import { withNavigation } from '../components/withNavigation'
import AnalyticsButtonContainer from '../components/Statistics/AnalyticsButton'

class StatisticsContainer extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            from: "2018-06-01",
            to: "2018-07-31"
        };
    }

    buttonClick = () => {
        this.setState({
            from: "2018-04-01",
            to: "2018-07-31"
        });
    } 

    render(){
        return(
            <div>
            <button onClick={this.buttonClick}/>
            <AnalyticsButtonContainer type="student" heading="Total Students" from={this.state.from} to={this.state.to} timeframe="week" />
            <AnalyticsButtonContainer type="account" heading="New Accounts" from={this.state.from} to={this.state.to} timeframe="week" />
            <AnalyticsButtonContainer type="submission" heading="New Submissions" from={this.state.from} to={this.state.to} timeframe="week" />
            <AnalyticsButtonContainer type="resume" heading="Resume" from={this.state.from} to={this.state.to} timeframe="week" />
            <AnalyticsButtonContainer type="interview" heading="Interview" from={this.state.from} to={this.state.to} timeframe="week" />
            <AnalyticsButtonContainer type="assessment" heading="Assessment" from={this.state.from} to={this.state.to} timeframe="week" />
            <AnalyticsButtonContainer type="placement" heading="Placement" from={this.state.from} to={this.state.to} timeframe="week" />
            </div>
        )
    }
}
export default withNavigation(StatisticsContainer)
