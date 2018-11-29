import React, { useState, useEffect } from 'react';
import {THEME1} from '../../constants/emails/themes'
import {makeEmail, personaliseElements} from '../../utilities/email/templateGenerator'
import {rejectedWithFeedback,outsideDemographic,outsideIndusty} from '../../constants/emails/templates'
import {sendEmail} from '../../utilities/email/send'
import renderHTML from 'react-render-html';
import smartLinks from '../../utilities/smartLinks'
import {useUserInfo} from '../../hooks/useUserInfo'
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import * as R from 'ramda'
import { userInfo } from 'os';


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
  const [smartLink, setSmartLinks] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const UserInfo = useUserInfo()
  const template =  R.clone(props.template)
  const theme = R.clone(THEME1)
    useEffect(() => {
    if(smartLink === ''){
   // const smartLink = await smartLinks.create('w1MOePRfhWV54CYsZIjSkW1v2Jw1','prevSubmission?6Lwl3roQDOiWSyW7tWZb')
    const smartLink = 'w1MOePRfhWV54CYsZIjSkW1v2Jw1'
    setSmartLinks(smartLink)
    }},[smartLink])

    useEffect(() => {
      console.log('UserInfo',UserInfo)
      if(smartLink!==''&&emailBody ==='' && UserInfo){
        const personalisables = [{firstName:'shams',
        smartLink,
        senderTitle:UserInfo.title,
        senderName:`${UserInfo.givenName} ${UserInfo.familyName}`}] 
        const personalisedElements = personaliseElements(template.elements,personalisables)
        const emailBody = makeEmail(theme,personalisedElements)
        setEmailBody(emailBody)
      }
    },[smartLink,UserInfo,emailBody])
        return (<React.Fragment>
          <Button onClick={()=>{
              const sender = {UID:UserInfo.UID,email:userInfo.email}
              const reciever = {UID:props.reciever.UID,email:props.reciever.email}
              const email = {subject:template.subject,body:emailBody}
             //sendEmail(reciever,sender,email)
             props.close()
          }}style={{position:'absolute',bottom:10,right:10}}>Send<SendIcon/>
          </Button>{renderHTML(emailBody)}
          </React.Fragment>);  
}
export default TemplateGenerator