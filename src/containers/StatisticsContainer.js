import React,{ Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment'

import { withNavigation } from '../components/withNavigation';
import AnalyticsButton from '../components/Statistics/AnalyticsButton';
import StatsCard from '../components/Statistics/StatsCard';
import TimeBar from '../components/Statistics/TimeBar'
import { CLOUD_FUNCTIONS, cloudFunction } from '../firebase/functions';
import { totalCandidates } from '../utilities/algolia'

const FROM = moment().subtract(1, 'weeks').format(DATE_FORMAT)
const TO = moment().subtract(1, 'days').format(DATE_FORMAT)
const TIMESTEP = 'daily'
const DATE_FORMAT = 'YYYY-MM-DD'


const timestampLabel = (x,timeStep)=>{
    switch (timeStep) {
        case 'weekly'://return `${moment(x).fromNow()}`
        case 'daily':return `${moment(x).tz('Australia/Sydney').format('Do MMM')}`
        case 'monthly':return `${moment(x).tz('Australia/Sydney').format('MMM')}`
        case 'hourly':return `${moment(x).tz('Australia/Sydney').format('ha ddd')}`
        default:
            break;
    }
}
const getGoal = (current) =>{
    return 10000 * Math.round(current*2 / 10000);
}

function combineData(data,combiner){
        var patches = [];
        while (data.length) {
            patches.push(data.splice(0, combiner));
        }
       const reducer = (accumulator, currentValue) => accumulator + currentValue;
       const results = patches.map(patch=> patch.reduce(reducer))	 
           return results
}

const formatData = (data,timeStep)=>{
    switch (timeStep) {
        case 'hourly':return data;
          
        case 'daily':return data;
        case 'weekly':return combineData(data,7)
        case 'monthly':return combineData(data,30)
        default:
            break;
    }

}

const formatTimeStep = (timestamps,timeSteps)=>{
    switch (timeSteps) {
        case 'hourly':
        case 'daily':
            return timestamps
        case 'weekly':return timestamps.filter((timestamp,index) => index%7===0);
        case 'monthly':return timestamps.filter((timestamp,index) => index%30===0);
        default:
            break;
    }
    
}
class StatisticsContainer extends Component{
    state = {isLoading:true}
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
    
    componentDidMount(){
     
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

                
                if(this.checkCache(timeStep)){
                    let statsData = this.checkCache(timeStep)
                    this.setState({statsData})
                    this.handleChange('isLoading',false)
                }else{
                    switch (timeStep) {
                        case 'hourly':
                        this.getChartData(from,to,timeStep)
                        console.log('getting hourly data')

                            break;
                        case 'weekly':
                        case 'monthly':
                        case 'daily':
                            this.getChartData(from,to,'daily')
                            break;
                        default:
                            break;
                    }
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
    checkCache(timeStep){
        const {from,to,cache} = this.state
        let dataTimeStep = 'daily'
        if(timeStep==='hourly'){
            dataTimeStep = 'hourly'
        }
        let cachedData = false
        cache.forEach(x=>{
            if(x.from === from && x.to === to && x.timeStep === dataTimeStep){
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
        const {statsData,timeStep,totalCandidates,isLoading} = this.state
        const lineType = 'total'
        if (statsData||isLoading){
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
                                data: formatTimeStep(statsData.xAxis,timeStep).map(x=>timestampLabel(x,timeStep))
                            },
                            yAxis: {},
                            series: [{
                                name: 'Accounts',
                                type: 'line',
                                data: formatData(statsData.series.account[lineType].slice(0),timeStep),
                                smooth: true,
                                animation: true,
                                animationDuration: 2000,
                                andimationDelay: 1000,
                            },{
                                name: 'Submissions',
                                type: 'line',
                                data: formatData(statsData.series.submission[lineType].slice(0),timeStep),
                                smooth: true,
                            }]
                        }}
                        analyticsButtons={[
                            <AnalyticsButton type="account" heading="New accounts" from={this.state.from} to={this.state.to} timeframe="week" />,
                            <AnalyticsButton type="submission" heading="New Submissions" from={this.state.from} to={this.state.to} timeframe="week" />,
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
                                data: formatTimeStep(statsData.xAxis,timeStep).map(x=>timestampLabel(x,timeStep))
                                 },
                            yAxis: {},
                            series: [{
                                name: 'Interview',
                                type: 'line',
                                data: formatData(statsData.series.interview[lineType].slice(0),timeStep),
                                smooth: true,
                                animation: true,
                                animationDuration: 2000,
                                andimationDelay: 1000,
                            },{
                                name: 'Assessment',
                                type: 'line',
                                data: formatData(statsData.series.assessment[lineType].slice(0),timeStep),
                                smooth: true,
                            },{
                                name: 'Resume',
                                type: 'line',
                                data: formatData(statsData.series.resume[lineType].slice(0),timeStep),
                                smooth: true,
                            },{
                                name: 'Placement',
                                type: 'line',
                                data: formatData(statsData.series.placed[lineType].slice(0),timeStep),
                                smooth: true,
                            }]
                        }}
                        analyticsButtons={[
                            <AnalyticsButton type="resume" heading="Resume" from={this.state.from} to={this.state.to} timeframe="week" />,
                            <AnalyticsButton type="interview" heading="Interview" from={this.state.from} to={this.state.to} timeframe="week" />,
                            <AnalyticsButton type="assessment" heading="Assessment" from={this.state.from} to={this.state.to} timeframe="week" />,
                            <AnalyticsButton type="placement" heading="Placement" from={this.state.from} to={this.state.to} timeframe="week" />,
                        ]}
                    />
                </Grid>
            </Grid>
            </div>
        )}else{
            return(<div>

                <TimeBar timeStep={timeStep} changeHandler={this.handleChange}/>
                <CircularProgress size={50} />

            </div>)
        }
        
    }
}
export default withNavigation(StatisticsContainer)
