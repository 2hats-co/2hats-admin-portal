import React, { useState } from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import DropdownIcon from '@material-ui/icons/KeyboardArrowDown';

const styles = theme => ({
  root: { marginLeft: theme.spacing(0.75) },
  selected: {
    '& svg': { color: theme.palette.primary.main },
  },

  button: {
    minWidth: theme.spacing(6),
    padding: `${theme.spacing(0.5)}px ${theme.spacing(0.75)}px`,
    '$selected &': { backgroundColor: theme.palette.primary.light },
  },
  icon: {
    'svg&': { marginRight: 0 },
  },
  dropdownIcon: {
    opacity: 0.67,
    'svg&': { marginRight: -theme.spacing(1) / 2 },
  },
});

const FilterMenu = props => {
  const { classes, selection, setSelection, Icon, items, title } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classNames(classes.root, selection && classes.selected)}>
      <Tooltip
        title={
          selection ? (
            <>
              Filtered by {title}
              <br />
              <b>{items.filter(x => x.value === selection)[0].label}</b>
            </>
          ) : (
            `Filter by ${title}`
          )
        }
      >
        <Button
          aria-haspopup="true"
          onClick={handleClick}
          className={classes.button}
        >
          <Icon className={classes.icon} />
          <DropdownIcon className={classes.dropdownIcon} fontSize="small" />
        </Button>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            setSelection('');
            handleClose();
          }}
          selected={!selection}
        >
          None
        </MenuItem>
        {items.map(x => (
          <MenuItem
            key={x.value}
            onClick={() => {
              setSelection(x.value);
              handleClose();
            }}
            selected={x.value === selection}
          >
            {x.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default withStyles(styles)(FilterMenu);
