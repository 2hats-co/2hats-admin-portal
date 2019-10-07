import React from 'react';

import CheckIcon from '@material-ui/icons/CheckCircle';
import ScheduledIcon from '@material-ui/icons/AccessTimeOutlined';
import PausedIcon from '@material-ui/icons/PauseCircleOutline';

const BlastStatusIcon = ({ data, className }) => {
  if (data.blasted) return <CheckIcon className={className} />;
  else if (data.willBlast) return <ScheduledIcon className={className} />;
  return <PausedIcon className={className} />;
};

export default BlastStatusIcon;
