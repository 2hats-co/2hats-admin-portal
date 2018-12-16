

import React,{useEffect} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Slide from '@material-ui/core/Slide';

import moment from 'moment';
  
import Message from './Message';
  
import {useMessages} from '../../../hooks/useMessages'
const DUMMY_MESSAGES = [
    {
      "id": "o9ekBMcXq8ARDfl5hJB4",
      "body": "Keen for a coffee next week?",
      "createdAt": {
        "seconds": 1544400544,
        "nanoseconds": 176000000
      },
      "isIncoming": true,
      "sentAt": {
        "seconds": 1544400544,
        "nanoseconds": 0
      },
      "type": "linkedin",
    },
    {
      "id": "o9ekBMcXq8ARDfl5hJB4",
      "body": "Keen for a coffee next week?",
      "createdAt": {
        "seconds": 1544400545,
        "nanoseconds": 176000000
      },
      "isIncoming": true,
      "sentAt": {
        "seconds": 1544400545,
        "nanoseconds": 0
      },
      "type": "linkedin",
    },
    {
      "id": "o9ekBMcXq8ARDfl5hJB4",
      "body": "Keen for a coffee next week?",
      "createdAt": {
        "seconds": 1544400744,
        "nanoseconds": 176000000
      },
      "isIncoming": true,
      "sentAt": {
        "seconds": 1543976041,
        "nanoseconds": 0
      },
      "type": "linkedin",
    },
    {
      "id": "o9ekBMcXq8ARDfl5hJB4",
      "body": "Keen for a coffee next week?",
      "createdAt": {
        "seconds": 1544400744,
        "nanoseconds": 176000000
      },
      "isIncoming": true,
      "sentAt": {
        "seconds": 1543976041,
        "nanoseconds": 0
      },
      "type": "linkedin",
    },
    {
      "id": "fPxfgLyuAb4g746e6iGW",
      "body": "Not yet - let's do next week, say Thursday morning :)",
      "createdAt": {
        "seconds": 1544400744,
        "nanoseconds": 177000000
      },
      "isIncoming": false,
      "sentAt": {
        "seconds": 1543979400,
        "nanoseconds": 0
      },
      "type": "linkedin",
    },
    {
      "id": "G5G3WCTJdPjNIweMtccg",
      "body": "Sounds good. What is your email. Will send you a diary invite",
      "createdAt": {
        "seconds": 1544400744,
        "nanoseconds": 176000000
      },
      "isIncoming": true,
      "sentAt": {
        "seconds": 1543980660,
        "nanoseconds": 0
      },
      "type": "linkedin",
    },
    {
      "id": "bOeUoaEmMPVMCFz25ttV",
      "body": "Also where is your office near. We are at Circular Quay",
      "createdAt": {
        "seconds": 1544400744,
        "nanoseconds": 178000000
      },
      "isIncoming": true,
      "sentAt": {
        "seconds": 1543980661,
        "nanoseconds": 0
      },
      "type": "linkedin",
    },
    {
      "id": "kfRpwHxRUHWGd3sVrnWL",
      "body": "sure, it's gloria@2hats.com.au. We are based right next to Central station - Would love to show your around our space (we're based in Academy Xi's old office) :)",
      "createdAt": {
        "seconds": 1544400744,
        "nanoseconds": 176000000
      },
      "isIncoming": false,
      "sentAt": {
        "seconds": 1543983780,
        "nanoseconds": 0
      },
      "type": "linkedin",
    },
    {
      "id": "EWHC3W2isHvImrb1GTeO",
      "body": "No problems! Shall we say 9am",
      "createdAt": {
        "seconds": 1544400744,
        "nanoseconds": 177000000
      },
      "isIncoming": true,
      "sentAt": {
        "seconds": 1543984680,
        "nanoseconds": 0
      },
      "type": "linkedin",
    },
    {
      "id": "AkwdZ72AUBDnwzc9yJ2V",
      "body": "Oh wait - can we do 1030?",
      "createdAt": {
        "seconds": 1544400744,
        "nanoseconds": 177000000
      },
      "isIncoming": true,
      "sentAt": {
        "seconds": 1543984920,
        "nanoseconds": 0
      },
      "type": "linkedin",
    },
    {
      "id": "kd1f2PwpLZSr407KjpTF",
      "body": "I have a client meeting at 9",
      "createdAt": {
        "seconds": 1544400744,
        "nanoseconds": 178000000
      },
      "isIncoming": true,
      "sentAt": {
        "seconds": 1543984921,
        "nanoseconds": 0
      },
      "type": "linkedin",
    },
    {
        "id": "kfRpwHxRUHWGd3sVrnWX",
        "body": "these are messages from me",
        "createdAt": {
          "seconds": 1544654106,
          "nanoseconds": 176000000
        },
        "isIncoming": false,
        "sentAt": {
          "seconds": 1544654106,
          "nanoseconds": 0
        },
        "type": "linkedin",
    },
    {
        "id": "kfRpwHxRUHWGd3sVrnWXd",
        "body": "these are messages from me",
        "createdAt": {
          "seconds": 1544654107,
          "nanoseconds": 176000000
        },
        "isIncoming": false,
        "sentAt": {
          "seconds": 1544654107,
          "nanoseconds": 0
        },
        "type": "linkedin",
    },
    {
        "id": "kfRpwHxRUHWGd3sVrnWdjflk",
        "body": "Baby, can't you see  I'm calling A guy like you should wear a warning It's dangerous I'm falling There's no escape I can't wait I need a hit Baby, give me it You're dangerous I'm loving it Too high Can't come down Losin' my head Spinnin' 'round and 'round Do you feel me now?",
        "createdAt": {
          "seconds": 1544654206,
          "nanoseconds": 176000000
        },
        "isIncoming": false,
        "sentAt": {
          "seconds": 1544654206,
          "nanoseconds": 0
        },
        "type": "note",
    },
    {
        "id": "kfRpwHxRUHWGd3sVrnWs",
        "body": `<h1>Toxic</h1><h2>Britney Spears</h2><iframe width="560" height="315" src="https://www.youtube.com/embed/LOZuxwVk7TU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        "createdAt": {
          "seconds": 1544654209,
          "nanoseconds": 176000000
        },
        "isIncoming": false,
        "sentAt": {
          "seconds": 1544654209,
          "nanoseconds": 0
        },
        "type": "activity",
    },
    {
        "id": "kfRpwHxRUHWGd3sVrnWasfd",
        "subject": "VERY IMPORTEN MESSAGE",
        "body": "<h1>Toxic</h1><h2>Britney Spears</h2><p>Baby, can't you see I'm calling A guy like you should wear a warning</p><p>It's dangerous I'm falling There's no escape I can't wait I need a hit Baby, give me it You're dangerous I'm loving it Too high Can't come down Losin' my head Spinnin' 'round and 'round Do you feel me now?</p>",
        "createdAt": {
          "seconds": 1544654208,
          "nanoseconds": 176000000
        },
        "isIncoming": false,
        "sentAt": {
          "seconds": 1544654208,
          "nanoseconds": 0
        },
        "type": "email",
    },
    {
        "id": "kfRpwHxRUHWGd3sVrnWasfd2",
        "subject": "VERY IMPORTEN MESSAGE2",
        "body": "<h1>Toxic</h1><h2>Britney Spears</h2><p>Baby, can't you see I'm calling A guy like you should wear a warning</p><p>It's dangerous I'm falling There's no escape I can't wait I need a hit Baby, give me it You're dangerous I'm loving it Too high Can't come down Losin' my head Spinnin' 'round and 'round Do you feel me now?</p>",
        "createdAt": {
          "seconds": 1544654209,
          "nanoseconds": 176000000
        },
        "isIncoming": false,
        "sentAt": {
          "seconds": 1544654209,
          "nanoseconds": 0
        },
        "type": "email",
        "sentBy": "Profasia Caming",
    },
    {
        "id": "kfRpwHxRUHWGd3sVrnWasfdd",
        "subject": "VERY IMPORTEN MESSAGE",
        "body": "<h1>Toxic</h1><h2>Britney Spears</h2><p>Baby, can't you see I'm calling A guy like you should wear a warning</p><p>It's dangerous I'm falling There's no escape I can't wait I need a hit Baby, give me it You're dangerous I'm loving it Too high Can't come down Losin' my head Spinnin' 'round and 'round Do you feel me now?</p>",
        "createdAt": {
          "seconds": 1544654218,
          "nanoseconds": 176000000
        },
        "isIncoming": true,
        "sentAt": {
          "seconds": 1544615428,
          "nanoseconds": 0
        },
        "type": "email",
    },
  ];
  const styles = theme => ({
      root: {
          padding: theme.spacing.unit * 2,
      },
      messageContainer: {
          width: '100%',
      },
  });
  
  const isSameType = (a, b) => (
      a.isIncoming === b.isIncoming &&
      a.type === b.type &&
      a.sentBy === b.sentBy &&
      moment(a.sentAt.seconds * 1000).fromNow() === moment(b.sentAt.seconds * 1000).fromNow()
  );
  
  function Messages(props){
      // componentDidUpdate(prevProps) {
      //     if (!prevProps.data) {
      //         this.messagesEnd.scrollIntoView();
      //     } else {
      //         this.messagesEnd.scrollIntoView({ behavior: "smooth" });
      //     }
      // }


          const {classes,conversation} = props;
          
          const [messagesState,messagesDispatch] = useMessages(conversation.id)
          useEffect(()=>{
            console.log('change conversation',conversation)
            messagesDispatch({conversationId:conversation.id})
          },[conversation])
          const {messages} = messagesState
          console.log('messages',messages)
          return(<Slide in direction="down">
          <div className={classes.root}>
               { messages && messages.map((data, i) => (
                  <Message key={data.id} data={data}
                      firstOfType={i > 0 ? !isSameType(messages[i-1], data) : true}
                      lastOfType={i < messages.length - 1 ? !isSameType(messages[i+1], data) : true}
                  />
              ))}
              <div style={{ float:"left", clear: "both" }}
                 // ref={(el) => { this.messagesEnd = el; }}
                  >
              </div>
          </div>
          </Slide>)
      }
  
  export default withStyles(styles)(Messages);
  