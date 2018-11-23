import React, { Component } from 'react';
import { withNavigation } from '../components/withNavigation';
import { COLLECTIONS} from "../constants/firestore";
import { compose } from "redux";
import { withHandlers, lifecycle } from "recompose";
import { connect } from "react-redux";
import { withFirestore } from "../utilities/withFirestore";
import { Button, Grid } from '@material-ui/core';
import Messaging from '../components/Messaging/index';
import * as R from 'ramda'

const messageSort = R.sortWith([
  R.ascend(R.prop('sentAt')),
]);
const threadSort = R.sortWith([
  R.ascend(R.prop('lastMessage.sentAt')),
]);
class LeadsContainer extends Component {
    constructor(props) {
        super(props);
        this.state ={
          leadId:'',
        }
    }
 
    handleThreadSelector = (leadId) =>{
      this.setState({leadId})
        const linkedInMessagesListenerSettings = {
        collection:COLLECTIONS.linkedinClients,
        doc:leadId,
        subcollections: [{collection: COLLECTIONS.messages}],
        storeAs:'linkedinThreadMessages',
        orderBy:['sentAt', 'asc']}
        this.props.firestore.setListener(linkedInMessagesListenerSettings)

        const queuedMessagesListenerSettings = {
          collection:COLLECTIONS.linkedinMessageQueue,
          where:[
           ['leadId','==',leadId],
           ['hasSynced','==',false]
         ],
          storeAs:'queuedMessages',
        //  orderBy:['createdAt', 'asc']
        }
          this.props.firestore.setListener(queuedMessagesListenerSettings)
    }
    handleSendMessage = (content)=>{
        const lead = this.props.leads.filter(x=>x.id === this.state.leadId) 
        this.props.sendMessage(this.state.leadId,lead[0].thread.id,content)
    }
    render() { 
        const leads = this.props.leads
        const queuedMessages =  this.props.queuedMessage
        let messages = []
        if(this.props.messages){
          messages = this.props.messages
        }
        if(!R.isNil(queuedMessages)){
          console.log('queuedMessages',queuedMessages)
         const formatedMessages = queuedMessages.map(message=> {
            const sentAt = message.createdAt
            const isIncoming = false
          return ({body:message.body,sentAt,isIncoming})
         })
         messages = [...this.props.messages,...formatedMessages]
        }else if(this.props.messages){
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
            threads={threadSort(R.dropRepeats(threads))} 
            handleSendMessage={this.handleSendMessage} 
            handleThreadSelector={this.handleThreadSelector}
            messages={messageSort(R.dropRepeats(messages))}/>
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
            const leadsListenerSettings = {collection:COLLECTIONS.linkedinClients,
            where:['hasResponded','==',true],
             storeAs:'linkedinClients',
             orderBy:['lastMessage.sentAt', 'desc'],
             limit: 20
          }
            props.firestore.setListener(leadsListenerSettings)
          },
          sendMessage: props => (leadId,threadId,body) =>{
            props.firestore.add( { collection: COLLECTIONS.linkedinMessageQueue},
              {   
                leadId,threadId,body,hasSent:false,hasSynced:false,createdAt:new Date(),
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
      messages: firestore.ordered.linkedinThreadMessages,
      queuedMessages: firestore.ordered.queuedMessages
    }))
  );

  export default withNavigation(enhance(
      compose(  
        LeadsContainer
      )
  ));