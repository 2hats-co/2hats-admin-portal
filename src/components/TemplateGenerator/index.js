import React, { useState, useEffect } from 'react';
import {THEME1} from '../../constants/emails/themes'
import {makeEmail, personaliseElements} from '../../utilities/email/templateGenerator'

import {sendEmail} from '../../utilities/email/send'
import {useUserInfo} from '../../hooks/useUserInfo'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import * as R from 'ramda'

import { useCandidate } from '../../hooks/useCandidate';

const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'reset':
      return initialState;
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      // A reducer must always return a valid state.
      // Alternatively you can throw an error if an invalid action is dispatched.
      return state;
  }
}

function TemplateGenerator(props) {
  const [emailBody, setEmailBody] = useState('');

  const { template, close, recipientUID, smartLink } = props;

  const userInfo = useUserInfo()
  const candidate = useCandidate(recipientUID)

  if (!candidate) return null;
  
  const recipient = { UID: candidate.UID, email: candidate.email };
  console.log(recipient)

  const templateClone =  R.clone(template)
  const theme = R.clone(THEME1)

    useEffect(() => {
      console.log('userInfo',userInfo)
      console.log('candidate',candidate)
      if(emailBody ==='' && userInfo&&candidate){
        const personalisables = [{firstName:candidate.firstName,
        senderTitle:userInfo.title,
        senderName:`${userInfo.givenName} ${userInfo.familyName}`,
        smartLink}] 
        const personalisedElements = personaliseElements(templateClone.elements,personalisables)
        const emailBody = makeEmail(theme,personalisedElements)
        setEmailBody(emailBody)
      }
    },[candidate,userInfo,emailBody])
        return (<div style={{position:'absolute',left:64,bottom:0,width:'calc(100vw - 64px - 400px)',height:200,overflowY:'scroll',borderTop:'1px solid #ddd'}}>
          <Button
            variant="extendedFab"
            color="primary"
            style={{position:'fixed',bottom:16,right:416}}
            onClick={()=>{
              const sender = {UID:userInfo.UID,email:`${userInfo.givenName}@2hats.com`}
              const reciever = {UID:recipient.UID,email:recipient.email}
              const email = {subject:template.subject,body:emailBody}
             sendEmail(reciever,sender,email)
             close()
          }}><SendIcon style={{marginRight:8}}/> Send
          </Button>
          <div style={{width:'100%',height:'100%'}}  dangerouslySetInnerHTML={{__html: emailBody}} />
          </div>);
}
export default TemplateGenerator
