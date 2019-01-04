import React, { useState, useContext } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';

import PersonIcon from '@material-ui/icons/Person';
import DropDownIcon from '@material-ui/icons/ArrowDropDown';

import { AdminsContext } from '../contexts/AdminsContext';
import { getInitials } from '../utilities';

const styles = theme => ({
  buttonRoot: {
    padding: theme.spacing.unit / 2,
    paddingRight: 0,
    '& svg': { marginRight: 0 },
  },
  dropdownIcon: {
    'svg&': { opacity: 0.54 },
  },
  selectRoot: {
    display: 'none',
  },
  avatar: {
    marginRight: theme.spacing.unit * 1.5,
  },
});

function AdminSelector(props) {
  const {
    classes,
    className,
    children,
    onSelect,
    tooltip,
    noneText,
    disableNone,
    extraItems,
  } = props;
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const context = useContext(AdminsContext);

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const childrenWithProps = children
    ? React.Children.map(children, child =>
        React.cloneElement(child, { onClick: handleClick })
      )
    : null;

  if (context.admins) {
    const currentUser = context.admins.filter(x => x.id === selected)[0];
    const displayedAdmins = context.admins.filter(x => !x.fired);

    const defaultPicker = (
      <Tooltip title={tooltip || 'Choose admin'}>
        <Button
          onClick={handleClick}
          classes={{ root: classes.buttonRoot }}
          className={className}
        >
          {currentUser ? (
            currentUser.avatarURL ? (
              <Avatar src={currentUser.avatarURL} />
            ) : (
              <Avatar>
                {getInitials(
                  `${currentUser.givenName} ${currentUser.familyName}`
                )}
              </Avatar>
            )
          ) : (
            <Avatar>
              <PersonIcon />
            </Avatar>
          )}
          <DropDownIcon className={classes.dropdownIcon} />
        </Button>
      </Tooltip>
    );

    return (
      <React.Fragment>
        {childrenWithProps || defaultPicker}
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
          {!disableNone && (
            <MenuItem value="">
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
              {noneText || 'None'}
            </MenuItem>
          )}
          {extraItems &&
            extraItems.map(x => (
              <MenuItem key={x.value} value={x.value}>
                <Avatar className={classes.avatar}>
                  {x.icon || <PersonIcon />}
                </Avatar>
                {x.label}
              </MenuItem>
            ))}
          {displayedAdmins.map(x => (
            <MenuItem key={x.id} value={x.id}>
              {x.avatarURL ? (
                <Avatar className={classes.avatar} src={x.avatarURL} />
              ) : (
                <Avatar className={classes.avatar}>
                  {getInitials(`${x.givenName} ${x.familyName}`)}
                </Avatar>
              )}
              {x.givenName} {x.familyName}
            </MenuItem>
          ))}
        </Select>
      </React.Fragment>
    );
  } else {
    return <CircularProgress />;
  }
}

export default withStyles(styles)(AdminSelector);
