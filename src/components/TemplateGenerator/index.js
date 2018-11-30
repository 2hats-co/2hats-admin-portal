import React, { useState, useEffect } from 'react';
import {THEME1} from '../../constants/emails/themes'
import {makeEmail, personaliseElements} from '../../utilities/email/templateGenerator'

import {sendEmail} from '../../utilities/email/send'
import {useUserInfo} from '../../hooks/useUserInfo'
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

  const { template, close, recipientUID } = props;

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
        senderName:`${userInfo.givenName} ${userInfo.familyName}`}] 
        const personalisedElements = personaliseElements(templateClone.elements,personalisables)
        const emailBody = makeEmail(theme,personalisedElements)
        setEmailBody(emailBody)
      }
    },[candidate,userInfo,emailBody])
        return (<React.Fragment>
          <Button onClick={()=>{
              const sender = {UID:userInfo.UID,email:`${userInfo.givenName}@2hats.com`}
              const reciever = {UID:recipient.UID,email:recipient.email}
              const email = {subject:template.subject,body:emailBody}
             sendEmail(reciever,sender,email)
             close()
          }}style={{position:'absolute',bottom:10,right:10}}>Send<SendIcon/>
          </Button>
          <div style={{position:'absolute',bottom:10,left:10,width:400,height:300}}  dangerouslySetInnerHTML={{__html: emailBody}} />
          </React.Fragment>);  
}
export default TemplateGenerator
