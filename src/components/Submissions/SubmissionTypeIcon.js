import React from 'react';

import ResumeIcon from '@material-ui/icons/PersonOutlined';
import JobIcon from '@material-ui/icons/BusinessCenterOutlined';
import AssessmentIcon from '@material-ui/icons/AssignmentOutlined';

function ConversationTypeIcon(props) {
  const { className, type } = props;

  switch (type) {
    case 'job':
      return <JobIcon className={className} />;
    case 'assessment':
      return <AssessmentIcon className={className} />;
    default:
      return <ResumeIcon className={className} />;
  }
}

export default ConversationTypeIcon;
