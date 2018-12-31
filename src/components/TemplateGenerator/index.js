import React, { useState, useEffect } from 'react';
import { THEME1 } from '../../constants/emails/themes';
import {
  makeEmail,
  personaliseElements,
} from '../../utilities/email/templateGenerator';

import { useAuthedUser } from '../../hooks/useAuthedUser';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slide from '@material-ui/core/Slide';

import clone from 'ramda/es/clone';

import useDocument from '../../hooks/useDocument';

const styles = theme => ({
  root: {
    // position: 'absolute',
    // left: 64,
    // bottom: 0,
    // zIndex: 2,

    backgroundColor: '#fff',
    // width: 'calc(100vw - 64px - 400px)',
    height: 300,
    overflowY: 'auto',
    borderTop: `1px solid ${theme.palette.divider}`,
  },
});

// const initialState = { count: 0 };

// function reducer(state, action) {
//   switch (action.type) {
//     case 'reset':
//       return initialState;
//     case 'increment':
//       return { count: state.count + 1 };
//     case 'decrement':
//       return { count: state.count - 1 };
//     default:
//       // A reducer must always return a valid state.
//       // Alternatively you can throw an error if an invalid action is dispatched.
//       return state;
//   }
// }

function TemplateGenerator(props) {
  const [emailBody, setEmailBody] = useState('');

  const {
    classes,
    template,
    recipientUID,
    smartLink,
    setEmail,
    setEmailReady,
  } = props;
  const authedUser = useAuthedUser();
  const [candidateState, candidateDispatch] = useDocument();
  useEffect(
    () => {
      candidateDispatch({ path: `candidates/${recipientUID}` });
    },
    [recipientUID]
  );
  const candidate = candidateState.doc;

  if (!candidate)
    return (
      <Slide in direction="up">
        <React.Fragment>
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.root}
            direction="row"
          >
            <CircularProgress size={64} />
          </Grid>
        </React.Fragment>
      </Slide>
    );

  const recipient = { UID: candidate.id, email: candidate.email };
  console.log('recipient', recipient);

  const templateClone = clone(template);
  const theme = clone(THEME1);

  useEffect(
    () => {
      if (
        candidate &&
        authedUser &&
        emailBody === '' &&
        authedUser.title &&
        candidate
      ) {
        const personalisables = [
          {
            firstName: candidate.firstName,
            senderTitle: authedUser.title,
            senderName: `${authedUser.givenName} ${authedUser.familyName}`,
            smartLink,
          },
        ];
        const personalisedElements = personaliseElements(
          templateClone.elements,
          personalisables
        );
        const emailBody = makeEmail(theme, personalisedElements);
        setEmailBody(emailBody);

        const sender = {
          UID: authedUser.UID,
          email: `${authedUser.givenName}@2hats.com`,
        };
        const recipient = { UID: candidate.UID, email: candidate.email };
        const email = { subject: template.subject, body: emailBody };
        setEmail({ recipient, sender, email });
        setEmailReady(true);
      }
    },
    [candidate, authedUser, emailBody, template]
  );

  return (
    <Slide in direction="up">
      <div className={classes.root}>
        <div
          style={{ width: '100%', height: '100%' }}
          dangerouslySetInnerHTML={{ __html: emailBody }}
        />
      </div>
    </Slide>
  );
}
export default withStyles(styles)(TemplateGenerator);
