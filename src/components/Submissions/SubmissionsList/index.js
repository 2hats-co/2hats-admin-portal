import React, { useState, useEffect } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';

import Submissions2Icon from '@material-ui/icons/RateReviewOutlined';
import JobIcon from '@material-ui/icons/BusinessCenterOutlined';
import AssessmentIcon from '@material-ui/icons/AssignmentOutlined';
import SkillIcon from '../../../assets/icons/SkillAchieved';
import IndustryIcon from '@material-ui/icons/Business';

import FilterMenu from './FilterMenu';
import JobFilterMenu from './JobFilterMenu';
import ScrollyRolly from '../../ScrollyRolly';
import Item from './Item';

import useCollection from '../../../hooks/useCollection';
import {
  COLLECTIONS,
  SKILLS,
  ASSESSMENT_CATEGORIES,
} from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  topFilterWrapper: {
    marginTop: -theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit,
    textAlign: 'right',
    paddingRight: theme.spacing.unit,
  },
  topFilterToggleButtons: { display: 'inline-block' },

  filterBar: {
    padding: theme.spacing.unit,
    paddingTop: 0,
    paddingLeft: theme.spacing.unit * 2,
    boxShadow: `0 -1px 0 ${theme.palette.divider} inset`,
  },
  filterLabel: {
    userSelect: 'none',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,

    fontWeight: 500,
    color: theme.palette.text.secondary,
  },

  noConvs: {
    height: '100%',
    color: theme.palette.text.secondary,
    textAlign: 'center',
    cursor: 'default',
    userSelect: 'none',
    '& svg': {
      fontSize: 48,
      color: theme.palette.text.disabled,
    },
  },
});

const typeFilter = type => ({ field: 'type', operator: '==', value: type });
const skillFilter = (type, skill) => {
  if (type === 'assessment')
    return { field: 'skillAssociated', operator: '==', value: skill };
  else if (type === 'job')
    return {
      field: 'skillsRequired',
      operator: 'array-contains',
      value: skill,
    };
};
const industryFilter = (type, industry) => {
  if (type === 'assessment')
    return { field: 'category', operator: '==', value: industry };
  else if (type === 'job')
    return { field: 'industry', operator: '==', value: industry };
};
const jobFilter = jobId => ({ field: 'jobId', operator: '==', value: jobId });
const outcomeFilter = outcome => ({
  field: 'outcome',
  operator: '==',
  value: outcome,
});

const orderBySubmissionTime = { field: 'createdAt', direction: 'asc' };

function SubmissionsList(props) {
  const { classes, setSelectedSubmission, selectedSubmission } = props;

  const [selectedFilters, setSelectedFilters] = useState({
    type: 'assessment',
    skill: '',
    industry: '',
    job: '',
    outcome: 'pending',
  });

  const [submissionsState, submissionsDispatch] = useCollection({
    path: COLLECTIONS.submissions,
    sort: [orderBySubmissionTime],
    filters: [outcomeFilter('pending')],
  });
  const submissions = submissionsState.documents;

  useEffect(
    () => {
      const filters = [];
      if (selectedFilters.type) filters.push(typeFilter(selectedFilters.type));
      if (selectedFilters.skill)
        filters.push(skillFilter(selectedFilters.type, selectedFilters.skill));
      if (selectedFilters.industry)
        filters.push(
          industryFilter(selectedFilters.type, selectedFilters.industry)
        );
      if (selectedFilters.job) filters.push(jobFilter(selectedFilters.job));
      if (selectedFilters.outcome)
        filters.push(outcomeFilter(selectedFilters.outcome));
      submissionsDispatch({ filters });
    },
    [selectedFilters]
  );

  const setFilter = (name, val) => {
    setSelectedFilters({ ...selectedFilters, [name]: val });
  };

  if (submissionsState.loading)
    return (
      <Grid
        container
        style={{ height: 'calc(100vh - 64px)' }}
        justify="center"
        alignItems="center"
      >
        <CircularProgress size={64} />
      </Grid>
    );

  return (
    <Grid container direction="column" style={{ height: 'calc(100vh - 64px)' }}>
      <Grid item className={classes.topFilterWrapper}>
        <ToggleButtonGroup
          value={selectedFilters.type}
          exclusive
          onChange={(e, val) => {
            setFilter('type', val);
          }}
          classes={{ root: classes.topFilterToggleButtons }}
        >
          <ToggleButton value="assessment">
            <Tooltip title="Assessments">
              <AssessmentIcon />
            </Tooltip>
          </ToggleButton>

          <ToggleButton value="job">
            <Tooltip title="Jobs">
              <JobIcon />
            </Tooltip>
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>

      <Grid item className={classes.filterBar}>
        <Grid container alignItems="center">
          <Typography variant="body2" className={classes.filterLabel}>
            Filters:
          </Typography>
          <FilterMenu
            title="skill"
            Icon={SkillIcon}
            items={SKILLS}
            selection={selectedFilters.skill}
            setSelection={val => {
              setFilter('skill', val);
            }}
          />
          <FilterMenu
            title="industry"
            Icon={IndustryIcon}
            items={ASSESSMENT_CATEGORIES}
            selection={selectedFilters.industry}
            setSelection={val => {
              setFilter('industry', val);
            }}
          />
          <FilterMenu
            title="outcome"
            Icon={Submissions2Icon}
            items={[
              { value: 'pending', label: 'Pending' },
              { value: 'pass', label: 'Pass' },
              { value: 'fail', label: 'Fail' },
            ]}
            selection={selectedFilters.outcome}
            setSelection={val => {
              setFilter('outcome', val);
            }}
          />
          {selectedFilters.type === 'job' && (
            <JobFilterMenu
              selectedFilters={selectedFilters}
              setFilter={setFilter}
            />
          )}
        </Grid>
      </Grid>

      {submissions && submissions.length === 0 ? (
        <Grid item xs>
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.noConvs}
          >
            <Grid item>
              <Submissions2Icon />
              <Typography variant="subtitle1" color="textSecondary">
                No submissions
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid item xs style={{ overflowY: 'scroll' }}>
          <ScrollyRolly
            classes={{ listLoader: classes.listLoader }}
            dataState={submissionsState}
            dataDispatch={submissionsDispatch}
            disablePadding
          >
            {data => (
              <Item
                onClick={() => {
                  setSelectedSubmission(data);
                }}
                submission={data}
                key={data.id}
                selected={
                  selectedSubmission && data.id === selectedSubmission.id
                }
              />
            )}
          </ScrollyRolly>
        </Grid>
      )}
    </Grid>
  );
}

export default withStyles(styles)(SubmissionsList);
