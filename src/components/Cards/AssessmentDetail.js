import React from 'react';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';

import IndustryLabel from './IndustryLabel';
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

const AssessmentDetail = ({ classes, data }) => (
  <>
    <IndustryLabel value={data.category} />

    {/* <Typography
      variant="subtitle2"
      style={{
        marginLeft: theme.spacing.unit / 4,
        marginTop: theme.spacing.unit * 2,
      }}
    >
      Skill awarded
    </Typography>
    <SkillItem value={data.skillAssociated} style={{ marginLeft: 0 }} dense /> */}

    <div
      className={classNames(classes.renderedHtml, classes.description)}
      dangerouslySetInnerHTML={{ __html: data.jobDescription }}
    />
  </>
);

export default withStyles(styles)(AssessmentDetail);
