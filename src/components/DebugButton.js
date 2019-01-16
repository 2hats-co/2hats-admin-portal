import React, { useContext } from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DebugIcon from '@material-ui/icons/BugReport';

import { copyToClipboard } from '../utilities';
import DebugContext from '../contexts/DebugContext';

function DebugButton(props) {
  const { className, fontSize, title, toCopy } = props;

  const debugContext = useContext(DebugContext);

  return (
    <Tooltip
      title={
        <React.Fragment>
          {title || 'Copy UID'}
          <br />
          {toCopy}
        </React.Fragment>
      }
    >
      <IconButton
        className={className}
        onClick={() => {
          copyToClipboard(toCopy);
        }}
        style={debugContext.enabled ? {} : { display: 'none' }}
      >
        <DebugIcon fontSize={fontSize || 'default'} />
      </IconButton>
    </Tooltip>
  );
}

export default DebugButton;
