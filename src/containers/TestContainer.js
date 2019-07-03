import React, { useState, useEffect } from 'react';
import adminFetch from '../utilities/adminAPI/adminFetch';
import { functions } from '../store';

function CallablesTestContainer(props) {
  // const [response, setResponse] = useState('');
  // useEffect(() => {
  //   adminFetch('http://localhost:8000/protected', {
  //     method: 'post',
  //     body: JSON.stringify({ hello: 'sfaff' }),
  //     headers: { 'Content-Type': 'application/json' },
  //   })
  //     .then(r => console.log(r))
  //     .catch(r => console.log(r));
  // }, []);
  // // Prepare callable function
  // const emailBlastActions = functions.httpsCallable('emailSendById');
  // useEffect(() => {
  //   async function fetchCallable() {
  //     const data = {
  //       targets: [
  //         '1eZyE6YKFRQJ5j4KuCu1XRJZlzo1',
  //         'u1LUNmN8tXebeSN6K97jUGU3tp52',
  //         '88QDFpyENAfZh0kE7UCOREpEozg2',
  //       ],
  //       templateId: '3TpdHC9ilWji2x1uHqvQ',
  //     };
  //     const res = await emailBlastActions(data);
  //     console.log(res);
  //   }
  //   fetchCallable();
  // }, []);
  // return <>{/* <code>{response}</code> */}</>;
}
export default CallablesTestContainer;
