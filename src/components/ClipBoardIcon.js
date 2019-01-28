import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import copyToClipboard from '../utilities';
function ClipBoardIcon(props) {
  const { value, isHighlighted, children } = props;
  return (
    <Tooltip title={value}>
      <IconButton
        onClick={() => {
          copyToClipboard(value);
        }}
        color={isHighlighted ? 'secondary' : 'default'}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
}
export default ClipBoardIcon;
