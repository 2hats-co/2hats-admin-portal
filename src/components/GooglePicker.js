import React, { useEffect, useState } from 'react';
// import { useAuthedUser } from '../hooks/useAuthedUser';

import { CLOUD_FUNCTIONS, callable } from '../firebase/functions';
import { auth } from 'firebase';
import CircularProgress from '@material-ui/core/CircularProgress';

// const CLIENT_ID =
//   '1045443129080-2h5be5vcltqa5ba7ak5rh6lvttf7k59k.apps.googleusercontent.com';
// const DEVELOPER_KEY = 'AIzaSyD9EnwYfFxTvnaDMA7r6MbKoXmZbQmukrg';
// const SCOPE = ['https://www.googleapis.com/auth/drive'];

function GooglePicker(props) {
  const { children, className, onChange, spinnerSize, spinnerPadding } = props;

  const [OAuthToken, setOAuthToken] = useState('');
  // const currentUser = useAuthedUser();

  // useEffect(
  //   () => {
  //     console.log(currentUser);
  //     // if (currentUser && currentUser.token)
  //     //   setOAuthToken(currentUser.token.auth);
  //   },
  //   [currentUser]
  // );

  useEffect(() => {
    if (!window.gapi) {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/client.js';

      script.onload = () => {
        window.gapi.load('picker');
        window.gapi.load('client');
        window.gapi.load('auth');
        console.log('loaded file picker');
        // gapi.load('client', () => {
        //   gapi.client.setApiKey(API_KEY);
        //   gapi.client.load('youtube', 'v3', () => {
        //     this.setState({ gapiReady: true });
        //   });
        // });
      };

      document.body.appendChild(script);

      callable(
        CLOUD_FUNCTIONS.refreshAccessToken,
        null,
        response => {
          console.log('got refreshed google token', response);
          setOAuthToken(response.data);
        },
        response => {
          console.log('fail', response);
        }
      );
    }
  }, []);

  const createPicker = () => {
    if (window.gapi && window.google) {
      const googleViewId = window.google.picker.ViewId.DOCS;

      const docsView = new window.google.picker.DocsView(googleViewId)
        .setIncludeFolders(true)
        .setSelectFolderEnabled(true)
        .setOwnedByMe(true);

      const uploadView = new window.google.picker.DocsUploadView().setIncludeFolders(
        true
      );

      const picker = new window.google.picker.PickerBuilder()
        .addView(docsView)
        .addView(uploadView)
        .setOAuthToken(OAuthToken)
        // .setDeveloperKey(DEVELOPER_KEY)
        .setCallback(
          onChange
            ? onChange
            : () => {
                console.log(
                  'onChange() triggered but was not provided to GooglePicker'
                );
              }
        );

      picker.build().setVisible(true);
    }
  };

  if (window.gapi && window.google && OAuthToken) {
    return (
      /* <GooglePicker
      key="googlepicker"
      clientId={CLIENT_ID}
      developerKey={DEVELOPER_KEY}
      scope={SCOPE}
      onChange={data => console.log('on change:', data)}
      onAuthFailed={data => console.log('on auth failed:', data)}
      multiselect={true}
      navHidden={false}
      authImmediate={false}
      viewId={'FOLDERS'}
      createPicker={google => {
        
    > */
      <div className={className} onClick={createPicker}>
        {children}
      </div>
      /* </GooglePicker> */
    );
  } else {
    return (
      <CircularProgress
        size={spinnerSize}
        style={{ verticalAlign: 'middle', padding: spinnerPadding }}
      />
    );
  }
}

export default GooglePicker;
