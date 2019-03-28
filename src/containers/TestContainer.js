import React from 'react';
//import Button from '@material-ui/core/Button';
import { callable, CLOUD_FUNCTIONS } from '../firebase/functions';

function CallablesTestContainer(props) {
  const { UID } = props;
  console.log(UID);
  const handleClick = () => {
    console.log('youve clicked the button');
    const inputData = {
      query: {},
      searchString: 'test2hats@gmail.com',
      templateId: 'vMtGdsXYXRYMc9iYKgWQ',
    };
    const cb = o => console.log(o);
    callable(CLOUD_FUNCTIONS.callablesSendTargeted, inputData, cb, cb);
  };
  return <button onClick={handleClick} />;
}
export default CallablesTestContainer;
