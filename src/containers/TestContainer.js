import React, { useState, useEffect } from 'react';
import adminFetch from '../utilities/adminAPI/adminFetch';

function CallablesTestContainer(props) {
  const [response, setResponse] = useState('');

  useEffect(() => {
    adminFetch('http://localhost:8000/protected', {
      method: 'post',
      body: JSON.stringify({ hello: 'sfaff' }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(r => console.log(r))
      .catch(r => console.log(r));
  }, []);

  return (
    <>
      <code>{response}</code>
    </>
  );
}
export default CallablesTestContainer;
