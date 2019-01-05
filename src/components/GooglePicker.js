import React, { useEffect, useState } from 'react';

import { CLOUD_FUNCTIONS, callable } from '../firebase/functions';
import CircularProgress from '@material-ui/core/CircularProgress';

function GooglePicker(props) {
  const {
    children,
    className,
    onChange,
    spinnerSize,
    spinnerPadding,
    pickerToken,
    setPickerToken,
  } = props;

  const [loading, setLoading] = useState(false);

  const getGAPI = () => {
    if (!window.gapi) {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/client.js';

      script.onload = () => {
        window.gapi.load('picker');
        window.gapi.load('client');
        window.gapi.load('auth');
        console.log('loaded google api');
      };

      document.body.appendChild(script);
    }
  };

  const getPickerToken = () => {
    callable(
      CLOUD_FUNCTIONS.refreshAccessToken,
      null,
      response => {
        console.log('got refreshed google token', response);
        setPickerToken(response.data);
      },
      response => {
        console.log('fail', response);
      }
    );
  };

  const createPicker = () => {
    if (!window.gapi || !window.google) {
      setLoading(true);
      getGAPI();
      getPickerToken();
      return;
    }
    if (!pickerToken) {
      setLoading(true);
      getPickerToken();
      return;
    }
    if (window.gapi && window.google && pickerToken) {
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
        .setOAuthToken(pickerToken)
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
      setLoading(false);
    }
  };

  useEffect(
    () => {
      if (loading) createPicker();
    },
    [pickerToken]
  );

  if (!loading) {
    return (
      <div className={className} onClick={createPicker}>
        {children}
      </div>
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
