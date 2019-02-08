import React from 'react';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';

import IndustryLabel from './IndustryLabel';
import SkillsList from './SkillsList';

import { STYLES } from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  ...STYLES.RENDERED_HTML(theme),

  description: {
    ...theme.typography.body2,

    lineClamp: 4,
    display: 'box',
    boxOrient: 'vertical',
    overflow: 'hidden',

    color: theme.palette.text.secondary,
  },
});

const JobDetail = ({ classes, data }) => (
  <>
    <IndustryLabel value={data.industry} />

    <div
      className={classNames(classes.renderedHtml, classes.description)}
      dangerouslySetInnerHTML={{ __html: data.companyDescription }}
    />

    <SkillsList values={data.skillsRequired} />
  </>
);

export default withStyles(styles)(JobDetail);
