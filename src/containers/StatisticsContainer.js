import React,{ Component } from 'react';
import Grid from '@material-ui/core/Grid';
import moment from 'moment'
import { withNavigation } from '../components/withNavigation';
import AnalyticsButton from '../components/Statistics/AnalyticsButton';
import StatsCard from '../components/Statistics/StatsCard';
import TimeBar from '../components/Statistics/TimeBar'
import { CLOUD_FUNCTIONS, cloudFunction } from '../firebase/functions';
import { totalCandidates } from '../utilities/algolia'

const FROM = '2018-09-01'
const TO = '2018-09-11'
const TIMESTEP = 'daily'
const DATE_FORMAT = 'YYYY-MM-DD'


const timestampLabel = (x,timeStep)=>{
    switch (timeStep) {
        case 'daily':return `${moment.tz(x, 'Australia/Sydney').format('Do MMM')}`
        case 'hourly':return `${moment.tz(x, 'Australia/Sydney').format('h a D-M')}`
        default:
            break;
    }
}
const getGoal = (current) =>{
    return 10000 * Math.round(current*2 / 10000);
}
class StatisticsContainer extends Component{
    constructor(props){
        super(props)
        const _8daysAgo = moment().subtract(1, 'weeks').format(DATE_FORMAT)
        const _1dayAgo = moment().subtract(1, 'days').format(DATE_FORMAT)
        this.state = {
            from:_8daysAgo,
            to: _1dayAgo,
            statsData:null,
            timeStep:TIMESTEP,
            totalCandidates:5000,
            cache:[],
            isLoading:false
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleChartData = this.handleChartData.bind(this)

    }
    handleChange(name, value){
        console.log(name, value)
        this.setState({
            [name]:value
        })
    }
    
    componentWillMount(){
     
       this.getChartData(FROM,TO,this.state.timeStep)
       this.getTotalCandidates()
    }
    async getTotalCandidates(){
       let t = await totalCandidates()
        this.handleChange('totalCandidates',t)
    }
    componentDidUpdate(prevProps,prevState){
        const {from,to,timeStep} = this.state
        let stateListeners = ['from','to','timeStep']
        stateListeners.forEach(prop => {
            if(prevState[prop] !== this.state[prop]){
                if(this.checkCache()){
                    let statsData = this.checkCache()
                    this.setState({statsData})
                    this.handleChange('isLoading',false)
                }else{
                    this.getChartData(from,to,timeStep)
                }
            }
        });
    }
    handleChartData(from,to,timeStep,statsData){
        let cache = this.state.cache.slice(0)
        const newItem = {from,to,timeStep,statsData}
        cache.push(newItem)
        this.setState({statsData,cache})
    }
    checkCache(){
        const {from,to,timeStep,cache} = this.state
        let cachedData = false
        cache.forEach(x=>{
            if(x.from === from && x.to === to && x.timeStep === timeStep){
                cachedData= x.statsData
            }
        })
        return cachedData
    }
    getChartData(from,to,timeStep){
        const _chartDataLoader = this.handleChartData
        cloudFunction(CLOUD_FUNCTIONS.stats,{dates:[{
            from: moment(from, DATE_FORMAT).unix()*1000,
            to: moment(to, DATE_FORMAT).unix()*1000
        }],timeStep:timeStep}, (o)=>{_chartDataLoader(from,to,timeStep,o.data.statsData)}, (o)=>{console.log(o)})
    }
    render(){
        const {statsData,timeStep,totalCandidates} = this.state
        const lineType = 'total'
        if (statsData){

        
        return(
            <div>
                <TimeBar timeStep={timeStep} changeHandler={this.handleChange}/>
            <Grid container>
                <Grid item xs={6}>
                    <StatsCard bar
                        heading="Total Students"
                        value={totalCandidates}
                        goal={getGoal(totalCandidates)}
                    />
                    <StatsCard chart
                        chartHeight={400}
                        heading="Conversion Trend"
                        chartOptions={{
                            tooltip: {
                                trigger: 'axis',
                            },
                            
                            xAxis: {
                                data: statsData.xAxis.map(x=>timestampLabel(x,timeStep))
                            },
                            yAxis: {},
                            series: [{
                                name: 'Accounts',
                                type: 'line',
                                data: statsData.series.account[lineType],
                                smooth: true,
                                animation: true,
                                animationDuration: 2000,
                                andimationDelay: 1000,
                            },{
                                name: 'Submissions',
                                type: 'line',
                                data: statsData.series.submission[lineType],
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
                         chartHeight={500}
                        heading="Stage Passed Trend"
                        chartOptions={{
                            tooltip: {
                                trigger: 'axis',
                            },
                            xAxis: {
                                data: statsData.xAxis.map(x=>timestampLabel(x,timeStep))
                                 },
                            yAxis: {},
                            series: [{
                                name: 'Interview',
                                type: 'line',
                                data: statsData.series.interview[lineType],
                                smooth: true,
                                animation: true,
                                animationDuration: 2000,
                                andimationDelay: 1000,
                            },{
                                name: 'Assessment',
                                type: 'line',
                                data: statsData.series.assessment[lineType],
                                smooth: true,
                            },{
                                name: 'Resume',
                                type: 'line',
                                data: statsData.series.resume[lineType],
                                smooth: true,
                            },{
                                name: 'Placement',
                                type: 'line',
                                data: statsData.series.placed[lineType],
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
            </div>
        )}else{
            return(<div>

                <TimeBar timeStep={timeStep} changeHandler={this.handleChange}/>

            </div>)
        }
        
    }
}
export default withNavigation(StatisticsContainer)
