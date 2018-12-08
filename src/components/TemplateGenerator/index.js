import React, { useState, useEffect } from 'react';
import {THEME1} from '../../constants/emails/themes'
import {makeEmail, personaliseElements} from '../../utilities/email/templateGenerator'

import {useUserInfo} from '../../hooks/useUserInfo'

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slide from '@material-ui/core/Slide';

import clone from 'ramda/es/clone'

import { useCandidate } from '../../hooks/useCandidate';

const styles = theme => ({
  root: {
    position: 'absolute',
    left: 64,
    bottom: 0,
    zIndex: 2,

    backgroundColor: '#fff',
    width: 'calc(100vw - 64px - 400px)',
    height: 300,
    overflowY: 'scroll',
    borderTop: '1px solid #ddd'
  }
})

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

  const { classes, template, recipientUID, smartLink, setEmail, setEmailReady } = props;
  console.log(template)

  const userInfo = useUserInfo()
  const candidate = useCandidate(recipientUID)

  if (!candidate) return (<Slide in direction="up">
  <Grid container justify="center" alignItems="center" className={classes.root}>
    <CircularProgress />
  </Grid>
  </Slide>);
  
  const recipient = { UID: candidate.UID, email: candidate.email };
  console.log(recipient)

  const templateClone =  clone(template)
  const theme = clone(THEME1)

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

        const sender = {UID:userInfo.UID,email:`${userInfo.givenName}@2hats.com`}
        const recipient = {UID:candidate.UID,email:candidate.email}
        const email = {subject:template.subject,body:emailBody}
        setEmail({recipient,sender,email});
        setEmailReady(true);
      }
    },[candidate,userInfo,emailBody,template]);

    return (<Slide in direction="up">
    <div className={classes.root}>
      <div style={{width:'100%',height:'100%'}} dangerouslySetInnerHTML={{__html: emailBody}} />
    </div>
    </Slide>);
}
export default withStyles(styles)(TemplateGenerator);
