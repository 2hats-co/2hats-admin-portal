import React, { useState, useEffect } from 'react';
import adminFetch from '../utilities/adminAPI/adminFetch';
import { functions } from '../store';

function CallablesTestContainer(props) {
  const [response, setResponse] = useState('');

  // useEffect(() => {
  //   adminFetch('http://localhost:8000/protected', {
  //     method: 'post',
  //     body: JSON.stringify({ hello: 'sfaff' }),
  //     headers: { 'Content-Type': 'application/json' },
  //   })
  //     .then(r => console.log(r))
  //     .catch(r => console.log(r));
  // }, []);

  //Prepare callable function
  // const emailBlastActions = functions.httpsCallable(
  //   'functions-emailBlastActions'
  // );

  // useEffect(() => {
  //   async function fetchCallable() {
  //     const data = {
  //       action: 'create',
  //       blastId: 'testBlastId',
  //       args: {
  //         query: 'victorchan.io',
  //         blastsAt: new Date().toISOString(),
  //         templateId: 'testTemplateId',
  //         createdBy: '1231313123123',
  //       },
  //     };
  //     const res = await emailBlastActions(data);
  //     console.log(res);
  //   }
  //   fetchCallable();
  // }, []);

  return <>{/* <code>{response}</code> */}</>;
}
export default CallablesTestContainer;
