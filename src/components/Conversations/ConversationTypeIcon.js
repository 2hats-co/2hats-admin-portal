import React from 'react';

import PersonIcon from '@material-ui/icons/PersonOutlined';
import ClientIcon from '@material-ui/icons/BusinessCenterOutlined';
import CandidateIcon from '@material-ui/icons/SchoolOutlined';
import SpamIcon from '@material-ui/icons/ReportOutlined';

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
