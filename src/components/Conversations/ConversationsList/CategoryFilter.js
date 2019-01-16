import React, { useState } from 'react';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import FilterIcon from '@material-ui/icons/FilterList';

import conversationCategories from '../../../constants/conversationCategories';

const styles = theme => ({
  button: {
    padding: theme.spacing.unit,
    marginRight: theme.spacing.unit,
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

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Tooltip
        title={
          selected
            ? `Filtered by ${
                conversationCategories.filter(x => x.value === selected)[0]
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
        {conversationCategories.map(x => (
          <MenuItem key={x.value} value={x.value}>
            {x.label}
          </MenuItem>
        ))}
      </Select>
    </React.Fragment>
  );
}

export default withStyles(styles)(CategoryFilter);
