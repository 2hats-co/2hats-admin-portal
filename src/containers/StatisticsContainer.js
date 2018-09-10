import React,{ Component } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';

import Grid from '@material-ui/core/Grid';

import { withNavigation } from '../components/withNavigation';
import AnalyticsButton from '../components/Statistics/AnalyticsButton';
import StatsCard from '../components/Statistics/StatsCard';

class StatisticsContainer extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            from: "2018-06-01",
            to: "2018-07-31"
        };
    }

    render(){
        return(
            <Grid container>
                <Grid item xs={6}>
                    <StatsCard bar
                        heading="Total Students"
                        value={5065}
                        goal={10000}
                    />
                    <StatsCard chart
                        heading="Conversion Trend"
                        chartOptions={{
                            tooltip: {
                                trigger: 'axis',
                            },
                            xAxis: {
                                data: ["Argon","Boron","Cobalt","D","E","Figment"]
                            },
                            yAxis: {},
                            series: [{
                                name: 'Atoms',
                                type: 'line',
                                data: [5, 20, 36, 10, 10, 20],
                                smooth: true,
                                animation: true,
                                animationDuration: 2000,
                                andimationDelay: 1000,
                            },{
                                name: 'Frequency',
                                type: 'line',
                                data: [15, 2, 69, 30, 1, 20],
                                smooth: true,
                            }]
                        }}
                        analyticsButtons={[
                            <AnalyticsButton type="student" heading="Total students" from={this.state.from} to={this.state.to} timeframe="week" />,
                            <AnalyticsButton type="account" heading="New accounts" from={this.state.from} to={this.state.to} timeframe="day" />,
                            <AnalyticsButton type="submission" heading="New Submissions" from={this.state.from} to={this.state.to} timeframe="year" />,
                        ]}
                    />
                </Grid>
                <Grid item xs={6}>
                    <StatsCard chart 
                        
                        heading="Stage Passed Trend"
                        chartOptions={{
                            tooltip: {
                                trigger: 'axis',
                            },
                            xAxis: {
                                data: ["Argon","Boron","Cobalt","D","E","Figment"]
                            },
                            yAxis: {},
                            series: [{
                                name: 'Atoms',
                                type: 'line',
                                data: [5, 20, 36, 10, 10, 20],
                                smooth: true,
                                animation: true,
                                animationDuration: 2000,
                                andimationDelay: 1000,
                            },{
                                name: 'Frequency',
                                type: 'line',
                                data: [15, 2, 69, 30, 1, 20],
                                smooth: true,
                            },{
                                name: 'Velocity',
                                type: 'line',
                                data: [34, 12, 23, 3, 9, 20],
                                smooth: true,
                            },{
                                name: 'Price',
                                type: 'line',
                                data: [0, 2, 59, 20, 12, 25],
                                smooth: true,
                            }]
                        }}
                        analyticsButtons={[
                            <AnalyticsButton type="resume" heading="Resume" from={this.state.from} to={this.state.to} timeframe="month" />,
                            <AnalyticsButton type="interview" heading="Interview" from={this.state.from} to={this.state.to} timeframe="Olympics" />,
                            <AnalyticsButton type="assessment" heading="Assessment" from={this.state.from} to={this.state.to} timeframe="election" />,
                            <AnalyticsButton type="placement" heading="Placement" from={this.state.from} to={this.state.to} timeframe="day" />,
                        ]}
                    />
                </Grid>
            </Grid>
        )
    }
}
export default withNavigation(StatisticsContainer)
