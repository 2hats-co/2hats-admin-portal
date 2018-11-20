import React, { Component } from 'react';
import { withNavigation } from '../components/withNavigation';
import { COLLECTIONS} from "../constants/firestore";
import { compose } from "redux";
import { withHandlers, lifecycle } from "recompose";
import { connect } from "react-redux";
import { withFirestore } from "../utilities/withFirestore";
import { Button, Grid } from '@material-ui/core';
import Messaging from '../components/Messaging/index'
class LeadsContainer extends Component {
    constructor(props) {
        super(props);
        this.state ={
          leadId:'pl5R6K1qBMJ9JVllEkwK'
        }
    }

    handleThreadSelector = (leadId) =>{
      this.setState({leadId})
      console.log('setting thread listener',leadId)
        const linkedInMessagesListenerSettings = {
        collection:COLLECTIONS.linkedinClients,
        doc:leadId,
        subcollections: [{collection: COLLECTIONS.messages}],
        storeAs:'linkinThreadMessages',
        orderBy:['sentAt', 'asc'],
      }
        this.props.firestore.setListener(linkedInMessagesListenerSettings)
    }
    handleSendMessage = (content)=>{
        const lead = this.props.leads.filter(x=>x.id === this.state.leadId) 
        this.props.sendMessage(lead[0].thread.id,content)
    }
    render() { 

        const leads = this.props.leads
        let messages = []
        if(this.props.messages){
          messages = this.props.messages
        }
        if(leads){
          const threads = leads.map(lead=>{
            let fullName = lead.fullName
            let id = lead.id
            let body = lead.lastMessage.body
            let date = lead.lastMessage.sentAt

            return({fullName,body,date,id})
          })
        return (
          <Grid container direction="row" wrap="nowrap" style={{height: 'calc(100vh - 64px)'}}>
            <Messaging 
            threads={threads} 
            handleSendMessage={this.handleSendMessage} 
            handleThreadSelector={this.handleThreadSelector}
            messages={messages}/>
          </Grid>
        )}
            else{
                return(<div/>)
            }
    }

}
const enhance = compose(
    withFirestore,
    withHandlers({
      loadData: props => () =>{
            const chartsConfigListenerSettings = {collection:COLLECTIONS.linkedinClients,
            where:['hasResponed','==',true],
             storeAs:'linkedinClients',
             orderBy:['thread.lastMessageAt', 'desc'],
             limit: 20
          }
            props.firestore.setListener(chartsConfigListenerSettings)
          },
          sendMessage: props => (threadId,message) =>{
            props.firestore.add( { collection: COLLECTIONS.linkedinMessageQueue},
              {   
                threadId,message,hasSent:false
              })
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
      leads: firestore.ordered.linkedinClients,
      messages: firestore.ordered.linkinThreadMessages
    }))
  );



  export default withNavigation(enhance(
      compose(  
        LeadsContainer
      )
  ));