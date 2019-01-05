import React from 'react';

import PersonIcon from '@material-ui/icons/Person';
import ClientIcon from '@material-ui/icons/BusinessCenter';
import CandidateIcon from '@material-ui/icons/School';
import SpamIcon from '@material-ui/icons/Report';

function ConversationTypeIcon(props) {
  const { className, type } = props;

  switch (type) {
    case 'client':
      return <ClientIcon className={className} />;

    case 'candidate':
      return <CandidateIcon className={className} />;

    case 'spam':
      return <SpamIcon className={className} />;

    default:
      return <PersonIcon className={className} />;
  }
}

export default ConversationTypeIcon;
