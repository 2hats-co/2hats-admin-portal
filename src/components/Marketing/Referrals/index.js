import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';

import Form from '../../Form';
import AddIcon from '@material-ui/icons/Add';
import societyProfileFields from '../../../constants/forms/societyProfile';
import { addSociety } from '../../../utilities/referralPrograms';

import LoadingHat from '../../LoadingHat';
import Society from './Society';

import useCollection from '../../../hooks/useCollection';
import CurrentUserContext from '../../../contexts/CurrentUserContext';

const styles = theme => ({
  root: {
    maxWidth: 960,
    padding: theme.spacing(1),
    margin: '0 auto',
  },

  addButton: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
});

const Referrals = ({ classes }) => {
  const [showForm, setShowForm] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  const [societiesState] = useCollection({
    path: 'societies',
    sort: { field: 'createdAt', direction: 'desc' },
    filters: [{ field: 'assignee', operator: '==', value: currentUser.UID }],
  });

  if (societiesState.loading)
    return <LoadingHat message={<i>we live in a society</i>} />;

  return (
    <main className={classes.root}>
      {societiesState.documents && societiesState.documents.length > 0 ? (
        societiesState.documents.map(x => <Society key={x.id} {...x} />)
      ) : (
        <Typography variant="h6">Nothing yet</Typography>
      )}

      <Fab
        color="primary"
        className={classes.addButton}
        onClick={() => setShowForm(true)}
      >
        <AddIcon />
      </Fab>

      <Form
        open={showForm}
        action="Add"
        formTitle="Society"
        data={societyProfileFields()}
        actions={{
          Add: data => {
            addSociety(data, currentUser.UID).then(setShowForm(false));
          },
          close: () => setShowForm(false),
        }}
      />
    </main>
  );
};

Referrals.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Referrals);
