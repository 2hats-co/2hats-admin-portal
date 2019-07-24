import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import ScrollyRolly from '../../ScrollyRolly';
import useCollection from '../../../hooks/useCollection';
import { COLLECTIONS } from '../../../constants/firestore';

const TemplateDropdown = props => {
  const { classes, setTemplate, UID } = props;

  const disabled = x => !UID && x.html && x.html.includes('<route>');

  const [templatesState, templatesDispatch, loadMore] = useCollection({
    path: COLLECTIONS.emailTemplates,
    filters: [
      {
        field: 'type',
        operator: '==',
        value: 'conversations',
      },
    ],
    sort: { field: 'updatedAt', order: 'desc' },
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
      <ScrollyRolly dataState={templatesState} loadMore={loadMore}>
        {(x, i) => (
          <MenuItem
            key={`${x}-${i}`}
            value={i}
            disabled={disabled(x)}
            onClick={() => {
              setTemplateIndex(i);
              setTemplate(templates[i]);
            }}
          >
            {x.label}
            {disabled(x) && ' (DISABLED – contains invalid link)'}
          </MenuItem>
        )}
      </ScrollyRolly>
    </TextField>
  );
};

export default TemplateDropdown;
