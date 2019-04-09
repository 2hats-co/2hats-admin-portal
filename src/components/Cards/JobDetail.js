import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import IndustryLabel from './IndustryLabel';
import SkillsList from './SkillsList';

import { removeHtmlTags } from '../../utilities';

const styles = theme => ({
  description: {
    ...theme.typography.body2,

    lineClamp: 4,
    display: 'box',
    boxOrient: 'vertical',
    overflow: 'hidden',

    // color: theme.palette.text.secondary,
  },
});

export const JobMeta = ({ data }) => <IndustryLabel value={data.industry} />;

const JobDetail = ({ classes, data }) => (
  <>
    <Typography variant="body2" className={classes.description}>
      {removeHtmlTags(
        data.companyDescription.replace('</p>', '\n').replace('&nbsp;', '')
      )}
    </Typography>

    {data.skillsRequired && <SkillsList values={data.skillsRequired} />}
  </>
);

export default withStyles(styles)(JobDetail);
