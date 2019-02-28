import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import useCollection from '../../../hooks/useCollection';
import { COLLECTIONS } from '../../../constants/firestore';

const TemplateDropdown = props => {
  const { classes, setTemplate } = props;

  const [templatesState] = useCollection({
    path: COLLECTIONS.emailTemplates,
    filters: [
      {
        field: 'type',
        operator: '==',
        value: 'conversations',
      },
    ],
  });
  const templates = templatesState.documents;

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
        setTemplate(e.target.value > -1 ? templates[e.target.value] : {});
      }}
      style={{ margin: 0, textAlign: 'left' }}
    >
      <MenuItem value={-1}>No template</MenuItem>
      {templates &&
        templates.map((x, i) => (
          <MenuItem key={`${x}-${i}`} value={i}>
            {x.label}
          </MenuItem>
        ))}
    </TextField>
  );
};

export default TemplateDropdown;
