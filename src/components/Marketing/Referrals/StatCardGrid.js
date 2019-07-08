import React, { useState } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import EditIcon from '@material-ui/icons/Edit';

import Form from '../../Form';
import { referralProgramEditFields } from '../../../constants/forms/referralProgram';
import { updateReferralProgram } from '../../../utilities/referralPrograms';

import StatCard from './StatCard';
import GoIcon from '../../../assets/icons/Go';

const styles = theme => ({
  cards: { margin: theme.spacing * -0.5 },
});

const StatCardGrid = ({ classes, referralProgramData }) => {
  const [editFormOpen, setEditFormOpen] = useState(false);

  const startDate = referralProgramData.createdAt
    ? referralProgramData.createdAt.toDate()
    : new Date();

  return (
    <>
      <Grid container justify="space-between">
        <Typography variant="h6">
          Referral Program: {referralProgramData.label} (
          {referralProgramData.referrerId})
        </Typography>

        <Button color="primary" onClick={() => setEditFormOpen(true)}>
          <EditIcon />
          Edit Referral Program
        </Button>
      </Grid>
      <Grid container className={classes.cards}>
        <Grid item xs={12} sm={6}>
          <StatCard
            title="Total Sign-ups"
            stat={referralProgramData.signups + referralProgramData.signins}
            date={startDate}
            ButtonProps={{
              disabled: true,
              children: (
                <>
                  View List
                  <GoIcon />
                </>
              ),
            }}
          />

          <Grid container>
            <Grid item xs={6}>
              <StatCard
                title="Assessments Started"
                stat={referralProgramData.assessmentStarts}
                date={startDate}
                fullHeight
                ButtonProps={{
                  disabled: true,
                  children: (
                    <>
                      View List
                      <GoIcon />
                    </>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <StatCard
                title="Assessments Passed"
                stat={referralProgramData.assessmentPasses}
                date={startDate}
                fullHeight
                ButtonProps={{
                  disabled: true,
                  children: (
                    <>
                      View List
                      <GoIcon />
                    </>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
          <StatCard
            title="Total Hired"
            description={`${
              referralProgramData.paymentRate.jobPlacements
            } AUD per job placement`}
            stat={
              <>
                {referralProgramData.jobPlacements}{' '}
                <small>
                  (
                  {referralProgramData.jobPlacements *
                    referralProgramData.paymentRate.jobPlacements}{' '}
                  AUD)
                </small>
              </>
            }
            date={startDate}
            fullHeight
          />
        </Grid>
      </Grid>

      <Form
        open={editFormOpen}
        action="Edit"
        formTitle={referralProgramData.label}
        data={referralProgramEditFields(referralProgramData)}
        actions={{
          Edit: data => {
            updateReferralProgram(referralProgramData.id, data).then(
              setEditFormOpen(false)
            );
          },
          close: () => setEditFormOpen(false),
        }}
      />
    </>
  );
};

StatCardGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  referralProgramData: PropTypes.object,
};

export default withStyles(styles)(StatCardGrid);
