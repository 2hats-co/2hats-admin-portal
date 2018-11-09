import React, { Component } from 'react';
import TrackerChart from '../components/Statistics/TrackerChart'
import { withNavigation } from '../components/withNavigation';
import TimeBar from '../components/Statistics/TimeBar';
import { COLLECTIONS} from "../constants/firestore";
import { compose } from "redux";
import { withHandlers, lifecycle } from "recompose";
import { connect } from "react-redux";
import { withFirestore } from "../utilities/withFirestore";
import { Button } from '@material-ui/core';
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
          <Button onClick={()=>{this.props.updateChart('F8WOuvceKXR5RFNHM2oF',[{label:'Reviewed',type:'talentTeam',name:'submissionReviewed'},{label:'Accepted',type:'talentTeam',name:'submissionAccepted'},{label:'Rejected',type:'talentTeam',name:'submissionRejected'}])}}>update chart</Button>
          <Button onClick={()=>{this.props.addChart([{label:'Submissions',type:'candidate',name:'submission'},{label:'Processed',type:'talentTeam',name:'submissionProcessed'}])}}>Add chart</Button>
             <TimeBar format={format} changeHandler={this.handleChange}/>
             {charts.map(chart=>{
               return(<TrackerChart key={chart.id} trackers={chart.trackers} range={range} format={format}/>)
             })}
            
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
      loadData: props => listenerSettings =>
        props.firestore.setListener(listenerSettings),
        updateChart: props => (chartId,trackers) =>
      props.firestore.update(
        { collection: COLLECTIONS.admins, doc: props.uid ,subcollections:[{collection:COLLECTIONS.charts,doc:chartId}]},
        {   
            trackers
        }
      ),
      addChart: props => (trackers) =>
      props.firestore.add(
        { collection: COLLECTIONS.admins, doc: props.uid ,subcollections:[{collection:COLLECTIONS.charts}]},
        {   
            trackers
        }
      ),
    }),
    // Run functionality on component lifecycle
    lifecycle({
      // Load data when component mounts
      componentDidUpdate(prevProps){
        if(!prevProps.uid&&this.props.uid){
          console.log('uid',this.props.uid)
          const chartsConfigListenerSettings = {collection:COLLECTIONS.admins,
              doc:this.props.uid,
              subcollections: [{collection: COLLECTIONS.charts}],
             storeAs:'chartsConfig'
          }
          this.props.loadData(chartsConfigListenerSettings);
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