import React, { useState } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

import AddIcon from '@material-ui/icons/Add';

import NoneGraphic from '../../../assets/images/graphics/PersonArmsOnHips.svg';

import Form from '../../Form';
import paymentRecordFields from '../../../constants/forms/paymentRecord';
import { addPaymentRecord } from '../../../utilities/referralPrograms';

const styles = theme => ({
  section: { marginBottom: theme.spacing.unit * 8 },
  header: { marginBottom: theme.spacing.unit * 2 },

  graphicWrapper: {
    textAlign: 'center',
    marginBottom: theme.spacing.unit * 6,
  },
  graphic: {
    userSelect: 'none',
    userDrag: 'none',
    width: 120,
    marginBottom: theme.spacing.unit * 1,
  },
  message: {
    maxWidth: 480,
    margin: '0 auto',
  },
});

const PaymentHistory = ({ classes, paymentHistoryState, societyId }) => {
  const [showForm, setShowForm] = useState(false);

  let contents = null;

  if (paymentHistoryState.loading) contents = <LinearProgress />;
  else if (paymentHistoryState.documents.length === 0)
    contents = (
      <div className={classes.graphicWrapper}>
        <img
          src={NoneGraphic}
          alt="Confused person graphic"
          className={classes.graphic}
          style={{ width: 20 }}
        />
        <Typography
          variant="h6"
          className={classes.message}
          color="textSecondary"
        >
          Nothing yet
        </Typography>
      </div>
    );
  else
    contents = (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Referral Program</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Paid at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paymentHistoryState.documents.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.label}</TableCell>
              <TableCell align="right">$ {row.amount}</TableCell>
              <TableCell align="right">
                {row.paidAt.toDate().toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );

  return (
    <>
      <section className={classes.section}>
        <Grid container justify="space-between">
          <Typography variant="h6" className={classes.header}>
            Payment History
          </Typography>

          <Button color="primary" onClick={() => setShowForm(true)}>
            <AddIcon />
            Payment Record
          </Button>
        </Grid>

        {contents}
      </section>

      <Form
        open={showForm}
        action="Add"
        formTitle="Payment Record"
        data={paymentRecordFields(societyId)}
        actions={{
          Add: data => {
            addPaymentRecord(societyId, data).then(setShowForm(false));
          },
          close: () => setShowForm(false),
        }}
      />
    </>
  );
};

PaymentHistory.propTypes = {
  classes: PropTypes.object.isRequired,
  paymentHistoryState: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaymentHistory);
