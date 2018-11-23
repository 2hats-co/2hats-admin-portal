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

import GridLayout from 'react-grid-layout';
import { WidthProvider } from 'react-grid-layout';
import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(GridLayout);
class StatisticsContainer extends Component {
    constructor(props) {
        super(props);
      this.state = { 
        range: {
          start: 1540897200,
          end: 1541714400,
        },
        format: {
          stepSize: 24,
          label: 'Do MMM',
        },
        layout: [
          {i: 'HA7IAUmVjhSzUJSYRxbC', x: 0, y: 0, w: 1, h: 8},
          {i: 'OEKsB7skUccUop2GwMH6', x: 1, y: 0, w: 3, h: 8},
          {i: 'brcOktgxv4iv4D8ffd6W', x: 4, y: 0, w: 1, h: 8},
        ],
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
        return (<div style={{boxShadow:'0 -1px 0 #ddd'}}>
          <ChartBuilder chart={this.state.chart}/>
          <TimeBar format={format} changeHandler={this.handleChange}/>
          <Grid container style={{width:'100%', height:'calc(100vh - 64px)', overflowX:'hidden', verflowY:'auto'}}>
            <ResponsiveGridLayout style={{width:'100%'}} className="layout" layout={this.state.layout} cols={12} rowHeight={40} width={1200}>
              {charts.map(chart => {
                let chartElement;
                switch (chart.type) {
                  case 'line':
                    chartElement = (<TrackerLineChart title={chart.title} key={chart.id} trackers={chart.trackers} range={range} format={format}/>)
                    break;
                  case 'donut':
                    chartElement = (<TrackerDonutChart title={chart.title} key={chart.id} trackers={chart.trackers} range={range} format={format}/>)
                    break;
                  case 'bar':
                    chartElement = (<TrackerBarChart title={chart.title} key={chart.id} trackers={chart.trackers} range={range} format={format}/>)
                    break; 
                  case 'number':
                    chartElement = (<TrackerNumber title={chart.title} key={chart.id} trackers={chart.trackers} range={range} format={format}/>)
                    break;
                  default:
                    chartElement = (<TrackerLineChart title={chart.title} key={chart.id} trackers={chart.trackers} range={range} format={format}/>)
                    break;
                }
                return(
                  <Grid key={chart.id} item xs>
                    <IconButton aria-label="Configure" //className={classes.button}
                      onClick={()=>{this.handleChange('chart',chart)}}
                    >
                      <SettingsIcon />
                    </IconButton>
                    {chartElement}
                
                  </Grid>
                )
              })}
            </ResponsiveGridLayout>
          </Grid>
        </div>)
        } else { return(<div/>) }
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
