import React, { Component } from 'react';
import { withNavigation } from '../components/withNavigation';
import { COLLECTIONS} from "../constants/firestore";
import { compose } from "redux";
import { withHandlers, lifecycle } from "recompose";
import { connect } from "react-redux";
import { withFirestore } from "../utilities/withFirestore";
import Grid from '@material-ui/core/Grid';
import Messaging from '../components/Messaging/index';
import Toolbar from '../components/Messaging/Toolbar'
import prop from 'ramda/es/prop'
import ascend from 'ramda/es/ascend'
import sortWith from 'ramda/es/sortWith'
import isNil from 'ramda/es/isNil'
import findIndex from 'ramda/es/findIndex'
import propEq from 'ramda/es/propEq'
import dropRepeats from 'ramda/es/dropRepeats'


const messageSort = sortWith([
  ascend(prop('sentAt')),
]);
const threadSort = sortWith([
  ascend(prop('lastMessage.sentAt')),
]);
class LeadsContainer extends Component {
    constructor(props) {
        super(props);
        this.state ={
          leadId:'',
        }
    }
    
    handleStarThread = (isStarred)=>{
      this.props.starThread(this.state.leadId, isStarred);
    }
    handleThreadSelector = (leadId) =>{
      this.props.readThread(leadId);
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
        console.log(this.state.leadId,lead[0].thread.id,content)
        this.props.sendMessage(this.state.leadId,lead[0].thread.id,content)
    }
    render() { 
        const leads = this.props.leads
        const {leadId} = this.state
        const queuedMessages =  this.props.queuedMessage
        let messages = []
        if(this.props.messages){
          messages = this.props.messages
        }
        if(!isNil(queuedMessages)){
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
            let isUnread = lead.thread.isUnread
            let isStarred = lead.thread.isStarred

            return({fullName,body,date,id,isUnread,isStarred})
          })
       let leadHeader = {label:'',path:''}
       if(leadId !==''){
         const leadIndex = findIndex(propEq('id',leadId))(leads)

         const currentLead = leads[leadIndex]
          leadHeader = {label:currentLead.fullName,path:currentLead.profileURL}

       }
        return (
        <React.Fragment>
          <Toolbar header={leadHeader}/>
          <Grid container direction="row" wrap="nowrap" style={{height: 'calc(100vh - 64px)'}}>
            <Messaging 
            threads={threadSort(dropRepeats(threads))} 
            handleSendMessage={this.handleSendMessage} 
            handleThreadSelector={this.handleThreadSelector}
            messages={messageSort(dropRepeats(messages))}
            handleStarThread={this.handleStarThread}/>
          </Grid>
        </React.Fragment>

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
             limit:  60
          }
            props.firestore.setListener(leadsListenerSettings)
          },
          sendMessage: props => (leadId,threadId,body) =>{
            props.firestore.add( { collection: COLLECTIONS.linkedinMessageQueue},
              {   
                leadId,threadId,body,hasSent:false,hasSynced:false,
                createdAt:props.firestore.FieldValue.serverTimestamp(),
              })
          },
          readThread: props => leadId =>{
            props.firestore.update({
              collection: COLLECTIONS.linkedinClients,
              doc: leadId
            },{
              thread: {isUnread: false}
            })
          },
          starThread: props => (leadId,isStarred) =>{
            props.firestore.update({
              collection: COLLECTIONS.linkedinClients,
              doc: leadId
            },{
              thread: {isStarred}
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
