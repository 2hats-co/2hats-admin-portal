import React, { Component } from 'react';
import TrackerLineChart from '../components/Statistics/TrackerLineChart'
import TrackerBarChart from '../components/Statistics/TrackerBarChart'
import TrackerDonutChart from '../components/Statistics/TrackerDonutChart'
import TrackerNumber from '../components/Statistics/TrackerNumber'
import { withNavigation } from '../components/withNavigation';
import TimeBar from '../components/Statistics/TimeBar';
import { COLLECTIONS} from "../constants/firestore";
import { compose } from "redux";
import { withHandlers, lifecycle } from "recompose";
import { connect } from "react-redux";
import { withFirestore } from "../utilities/withFirestore";
import { Button, Grid } from '@material-ui/core';
import ChartBuilder from '../components/Statistics/ChartBuilder';
import SettingsIcon from '@material-ui/icons/Settings'
import IconButton from '@material-ui/core/IconButton'
class StatisticsContainer extends Component {
    constructor(props) {
        super(props);
      this.state = { 
        range:{
        start:1540897200,
        end:1541714400
      },format:{
        stepSize:24,
        label:'Do MMM'
      },
     }
    }
    handleChange=(name, value)=> {
        console.log(name, value)
        this.setState({
            [name]:value })
    }

    render() { 
      const {range,format} = this.state
      const charts = this.props.chartsConfig
      if(charts){
        return (<div>
          <ChartBuilder chart={this.state.chart}/>
          <TimeBar format={format} changeHandler={this.handleChange}/>
             <Grid container>
             {charts.map(chart=>{
               let chartElement;
               switch (chart.type) {
                case 'line':  chartElement=(<TrackerLineChart title={chart.title} key={chart.id} trackers={chart.trackers} range={range} format={format}/>)
                break;
                case 'donut': chartElement=(<TrackerDonutChart title={chart.title} key={chart.id} trackers={chart.trackers} range={range} format={format}/>)
                break;                
                case 'bar':   chartElement=(<TrackerBarChart title={chart.title} key={chart.id} trackers={chart.trackers} range={range} format={format}/>)
                break; 
                case 'number':   chartElement=(<TrackerNumber title={chart.title} key={chart.id} trackers={chart.trackers} range={range} format={format}/>)
                break;                
                default:      chartElement=(<TrackerLineChart title={chart.title} key={chart.id} trackers={chart.trackers} range={range} format={format}/>)
                break;               
              }
               return(<Grid item xs={12} md={chart.width}>
               <IconButton aria-label="Configure" //className={classes.button}
               onClick={()=>{this.handleChange('chart',chart)}}
                >
          <SettingsIcon fontSize="small" />
        </IconButton>
          {chartElement}
                
               </Grid>)
             })} 
             </Grid>       
            </div>)}else{
              return(<div/>)
            }
    }
}
const enhance = compose(
    // add redux store (from react context) as a prop
    withFirestore,
    // Handler functions as props
    withHandlers({
      loadData: props => () =>{
          if(props.uid){
            const chartsConfigListenerSettings = {collection:COLLECTIONS.admins,
              doc:props.uid,
              subcollections: [{collection: COLLECTIONS.charts}],
             storeAs:'chartsConfig'
          }
            props.firestore.setListener(chartsConfigListenerSettings)}
          }
    }),
    // Run functionality on component lifecycle
    lifecycle({
      // Load data when component mounts
      componentDidMount(){
        this.props.loadData()
      },
      componentDidUpdate(prevProps){
        if(!prevProps.uid&&this.props.uid){
          this.props.loadData()
        }
      }
    }),
    connect(({ firestore }) => ({
      chartsConfig: firestore.ordered.chartsConfig // document data by id
    }))
  );



  export default withNavigation(enhance(
      compose(  
            StatisticsContainer
      )
  ));