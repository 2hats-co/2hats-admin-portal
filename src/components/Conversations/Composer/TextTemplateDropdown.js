import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
const TextTemplateDropdown = props => {
  const { classes, setText } = props;

  const templates = [
    { label: 'sample 1', value: 'hey' },
    { label: 'sample 2', value: 'hi' },
  ];

  const [templateIndex, setTemplateIndex] = useState(-1);

  return (
    <TextField
      select
      InputProps={{
        disableUnderline: true,
        classes: { inputMarginDense: classes.templateDropdown },
      }}
      margin="dense"
      variant="filled"
      value={templateIndex}
      onChange={e => {
        setTemplateIndex(e.target.value);
        console.log(e.target.value);
        setText(e.target.value);
      }}
      style={{ margin: 0, textAlign: 'left' }}
    >
      <MenuItem value={''}>No template</MenuItem>
      {templates &&
        templates.map((x, i) => (
          <MenuItem key={`${x}-${i}`} value={x.value}>
            {x.label}
          </MenuItem>
        ))}
    </TextField>
  );
};

export default TextTemplateDropdown;
