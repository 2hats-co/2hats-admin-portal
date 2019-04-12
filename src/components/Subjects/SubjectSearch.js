import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  input: { paddingTop: theme.spacing.unit * 1.25 },
});

const SubjectSearch = props => {
  const { classes, setQuery, count, className } = props;

  const [showEnterPrompt, setShowEnterPrompt] = useState(false);

  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        disableUnderline: true,
        classes: { input: classes.input },
      }}
      placeholder="Search"
      variant="filled"
      className={className}
      onKeyPress={e => {
        if (e.key === 'Enter') setQuery(e.target.value);
        else if (!showEnterPrompt) setShowEnterPrompt(true);
      }}
    />
  );
};

export default withStyles(styles)(SubjectSearch);
