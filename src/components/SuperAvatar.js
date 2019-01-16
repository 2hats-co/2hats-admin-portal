import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import PersonIcon from '@material-ui/icons/Person';
import { getInitials } from '../utilities';

function SuperAvatar(props) {
  const { className, data, tooltip } = props;

  let name;
  if (data.displayName) name = data.displayName;
  else if (data.givenName) name = `${data.givenName} ${data.familyName}`;
  else if (data.firstName) name = `${data.firstName} ${data.lastName}`;

  const avatar = data.avatarURL ? (
    <Avatar className={className} src={data.avatarURL} />
  ) : (
    <Avatar className={className}>
      {name ? getInitials(name) : <PersonIcon />}
    </Avatar>
  );

  if (tooltip) return <Tooltip title={name}>{avatar}</Tooltip>;
  else return avatar;
}

export default SuperAvatar;
