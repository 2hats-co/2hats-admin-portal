import React, { useState } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import SocietyIcon from '../../../assets/icons/Society';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import MobileIcon from '@material-ui/icons/Phone';
import BankIcon from '@material-ui/icons/AccountBalance';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import AddIcon from '@material-ui/icons/Add';
import WarningIcon from '@material-ui/icons/Warning';

import StatCardGrid from './StatCardGrid';
import PaymentHistory from './PaymentHistory';

import Form from '../../Form';
import societyProfileFields from '../../../constants/forms/societyProfile';
import { referralProgramCreateFields } from '../../../constants/forms/referralProgram';
import {
  updateSocietyInfo,
  addReferralProgram,
} from '../../../utilities/referralPrograms';

import useCollection from '../../../hooks/useCollection';

const styles = theme => ({
  icon: {
    verticalAlign: 'text-bottom',
    marginRight: theme.spacing.unit,
    color: theme.palette.text.secondary,
    fontSize: 18,
  },
  details: {
    display: 'block',
  },

  divider: {
    margin: `${theme.spacing.unit * 2}px 0`,
  },
});

const Society = props => {
  const {
    classes,
    id,
    societyName,
    university,
    firstName,
    lastName,
    email,
    mobileNumber,
    bankAccName,
    bankBsb,
    bankAccNo,
  } = props;

  const [editFormOpen, setEditFormOpen] = useState(false);
  const [addFormOpen, setAddFormOpen] = useState(false);
  const [bankVisible, setBankVisible] = useState(false);

  const [referralProgramsState] = useCollection({
    path: 'referralPrograms',
    sort: { field: 'createdAt', direction: 'desc' },
    filters: [{ field: 'societyId', operator: '==', value: id }],
  });
  const [paymentRecordsState] = useCollection({
    path: `societies/${id}/paymentRecords`,
    sort: { field: 'paidAt', direction: 'desc' },
  });

  let referralPrograms = null;
  if (referralProgramsState.loading) referralPrograms = <LinearProgress />;
  else if (referralProgramsState.documents.length > 0)
    referralPrograms = referralProgramsState.documents.map(x => (
      <StatCardGrid key={x.id} referralProgramData={x} />
    ));

  const hasBankInfo = bankBsb && bankAccNo;

  return (
    <>
      <ExpansionPanel defaultExpanded elevation={0}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container alignItems="center" spacing={8}>
            <Grid item>
              <SocietyIcon />
            </Grid>
            <Grid item xs>
              <Typography variant="h6">
                {societyName} – {university}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                onClick={e => {
                  e.stopPropagation();
                  setEditFormOpen(true);
                }}
              >
                <EditIcon />
                Edit Society Info
              </Button>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <Grid container spacing={8} component="section">
            <Grid item xs={6}>
              <Typography variant="subtitle1" gutterBottom>
                Contact Information
              </Typography>
              <Typography gutterBottom>
                <PersonIcon className={classes.icon} />
                {firstName} {lastName}
              </Typography>
              <Typography gutterBottom>
                <EmailIcon className={classes.icon} />
                {email}
              </Typography>
              <Typography gutterBottom>
                <MobileIcon className={classes.icon} />
                {mobileNumber}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Grid container justify="space-between" alignItems="center">
                <Typography variant="subtitle1">
                  <BankIcon className={classes.icon} />
                  Payment Information
                </Typography>

                {hasBankInfo && (
                  <IconButton
                    size="small"
                    onClick={() => setBankVisible(state => !state)}
                  >
                    {bankVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                )}
              </Grid>
              {hasBankInfo ? (
                <>
                  <Typography gutterBottom>
                    {bankVisible ? bankAccName : '•••••'}
                  </Typography>
                  <Typography gutterBottom>
                    <b>BSB</b> {bankVisible ? bankBsb : '•••••'}
                  </Typography>
                  <Typography gutterBottom>
                    <b>Acc. No.</b> {bankVisible ? bankAccNo : '•••••'}
                  </Typography>
                </>
              ) : (
                <Typography>
                  <WarningIcon className={classes.icon} />
                  No payment info. Click Edit Society Info above to add this
                  info
                </Typography>
              )}
            </Grid>
          </Grid>

          <Divider className={classes.divider} />

          {referralPrograms}

          {/* To-do: multiple referral programs per society
          Currently, society portal does not support this */}
          <Button
            color="primary"
            onClick={() => setAddFormOpen(true)}
            disabled={
              referralProgramsState.documents &&
              referralProgramsState.documents.length > 0
            }
          >
            <AddIcon /> Add Referral Program
          </Button>

          <Divider className={classes.divider} />

          <PaymentHistory
            paymentHistoryState={paymentRecordsState}
            societyId={id}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <Form
        open={editFormOpen}
        action="Edit"
        formTitle={societyName}
        data={societyProfileFields(props)}
        actions={{
          Edit: data => {
            updateSocietyInfo(id, data).then(setEditFormOpen(false));
          },
          close: () => setEditFormOpen(false),
        }}
      />

      <Form
        open={addFormOpen}
        action="Add"
        formTitle={`Referral Program for ${societyName}`}
        data={referralProgramCreateFields(props)}
        actions={{
          Add: data => {
            addReferralProgram(id, data).then(setAddFormOpen(false));
          },
          close: () => setAddFormOpen(false),
        }}
      />
    </>
  );
};

Society.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  societyName: PropTypes.string.isRequired,
  university: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  mobileNumber: PropTypes.string.isRequired,
  bankAccName: PropTypes.string,
  bankBsb: PropTypes.string,
  bankAccNo: PropTypes.string,
};

export default withStyles(styles)(Society);
