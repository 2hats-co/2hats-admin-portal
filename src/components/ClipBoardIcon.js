import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
function copyToClipboard(text){
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute('value', text);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }
function ClipBoardIcon(props){
    const {value,isHighlighted,children} = props
    return(
        <Tooltip title={value}>
          <IconButton onClick={()=>{copyToClipboard(value)}} color={isHighlighted?'secondary':'default'}>
              {children}
          </IconButton>
        </Tooltip>
      
    )
}
export default ClipBoardIcon