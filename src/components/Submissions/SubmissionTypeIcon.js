import React from 'react';

import PersonIcon from '@material-ui/icons/Person';
import ClientIcon from '@material-ui/icons/BusinessCenter';
import CandidateIcon from '@material-ui/icons/School';

function ConversationTypeIcon(props) {
  const { className, type } = props;

  switch (type) {
    case 'job':
      return <ClientIcon className={className} />;
    case 'assessment':
      return <CandidateIcon className={className} />;
    default:
      return <PersonIcon className={className} />;
  }
}

export default ConversationTypeIcon;
