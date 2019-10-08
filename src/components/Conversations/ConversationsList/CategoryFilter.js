import React, { useState } from 'react';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import SearchIcon from '@material-ui/icons/Search';
import FilterIcon from '@material-ui/icons/FilterListOutlined';

import Search from '../../Search';
import { ALGOLIA_INDEX } from '../../../config/algolia';
import conversationCategories from '../../../constants/conversationCategories';

const styles = theme => ({
  button: {
    padding: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  selectedButton: {
    color: '#fff',
    backgroundColor: `${theme.palette.primary.main} !important`,
  },
  selectRoot: {
    display: 'none',
  },
});

function CategoryFilter(props) {
  const { classes, onSelect, selected, setSelected } = props;

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  return (
    <>
      <Tooltip title="Search conversation">
        <IconButton
          className={classes.button}
          onClick={() => {
            setShowSearch(true);
          }}
        >
          <SearchIcon />
        </IconButton>
      </Tooltip>
      <Tooltip
        title={
          selected
            ? `Filtered by ${
                conversationCategories().filter(x => x.value === selected)[0]
                  .label
              }`
            : 'Filter by category'
        }
      >
        <IconButton
          onClick={handleClick}
          className={classNames(
            classes.button,
            selected && classes.selectedButton
          )}
        >
          <FilterIcon />
        </IconButton>
      </Tooltip>
      <Select
        classes={{ root: classes.selectRoot }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        value={selected}
        onChange={e => {
          setSelected(e.target.value);
          onSelect(e.target.value);
        }}
        MenuProps={{ anchorEl }}
      >
        <MenuItem value="">No category</MenuItem>
        {conversationCategories().map(x => (
          <MenuItem key={x.value} value={x.value}>
            {x.label}
          </MenuItem>
        ))}
      </Select>

      {showSearch && (
        <Search
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          useSearchIndex={ALGOLIA_INDEX.conversations}
          placeholder="Search conversations…"
        />
      )}
    </>
  );
}

export default withStyles(styles)(CategoryFilter);
