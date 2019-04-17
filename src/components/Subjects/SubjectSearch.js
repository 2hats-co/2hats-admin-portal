import React, { useState } from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import queryString from 'query-string';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import SearchIcon from '@material-ui/icons/Search';

const SEARCH_HEIGHT = 40;
const styles = theme => ({
  root: {
    width: 'auto',
    height: SEARCH_HEIGHT,
  },

  count: {
    marginRight: theme.spacing.unit * 3,
    cursor: 'default',
  },

  input: {
    paddingTop: theme.spacing.unit * 1.25,
    paddingBottom: theme.spacing.unit * 1.25,
    height: 20,
  },
  inputRoot: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  searchButton: {
    minWidth: 0,
    height: SEARCH_HEIGHT,
    padding: `0 ${theme.spacing.unit}px`,

    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,

    marginLeft: -1,
    boxShadow: 'none',

    '& svg': { margin: 0 },
  },
});

const SubjectSearch = props => {
  const {
    classes,
    searchForQuery,
    className,
    location,
    numResults,
    numDisplayedResults,
  } = props;
  const parsedQuery = queryString.parse(location.search);

  const [query, setQuery] = useState(parsedQuery.query);
  // const [showEnterPrompt, setShowEnterPrompt] = useState(false);

  return (
    <Grid
      container
      alignItems="center"
      className={classNames(classes.root, className)}
    >
      <Typography
        variant="body2"
        color="textSecondary"
        className={classes.count}
      >
        {numDisplayedResults} of {numResults} results
      </Typography>

      <TextField
        InputProps={{
          classes: {
            root: classes.inputRoot,
            input: classes.input,
          },
          disableUnderline: true,
        }}
        placeholder="Search"
        variant="filled"
        margin="none"
        onKeyPress={e => {
          if (e.key === 'Enter') searchForQuery(query);
          //else if (!showEnterPrompt) setShowEnterPrompt(true);
        }}
        value={query}
        onChange={e => {
          setQuery(e.target.value);
        }}
      />
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          searchForQuery(query);
        }}
        className={classes.searchButton}
      >
        <SearchIcon />
      </Button>
    </Grid>
  );
};

export default withStyles(styles)(SubjectSearch);
