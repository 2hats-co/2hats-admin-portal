import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

import AddIcon from '@material-ui/icons/AddOutlined';

import Form from '../../Form';
import Criterion from './Criterion';

import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import useCollection from '../../../hooks/useCollection';
import { createDoc, updateDoc, deleteDoc } from '../../../utilities/firestore';

import { styles as formStyles } from '../../Form';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import assessmentCriteriaFields from '../../../constants/forms/assessmentCriteria';

const styles = theme => ({
  ...formStyles(theme),

  addButton: {
    position: 'absolute',
    top: theme.spacing.unit * 1.5 + 1,
    right: theme.spacing.unit * 1.5 + 1,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const CriteriaDialog = props => {
  const { classes, theme, data, showDialog, setShowDialog } = props;

  const subcollectionPath = `${COLLECTIONS.assessments}/${data.id}/criteria`;

  const [criteriaState] = useCollection({
    path: subcollectionPath,
    sort: { field: 'createdAt', direction: 'asc' },
  });
  const criteria = criteriaState.documents;

  const [showForm, setShowForm] = useState(false);
  const [selectedCriterion, setSelectedCriterion] = useState(null);

  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const handleClose = () => {
    setShowDialog(false);
  };
  const closeForm = () => {
    setShowForm(false);
    setSelectedCriterion(null);
  };
  const handleSetEditTarget = data => () => {
    setSelectedCriterion(data);
    setShowForm(true);
  };

  const handleCreate = data => {
    createDoc(subcollectionPath, data);
    closeForm();
  };
  const handleEdit = data => {
    updateDoc(subcollectionPath, selectedCriterion.id, data);
    closeForm();
  };
  const handleDelete = id => () => {
    deleteDoc(subcollectionPath, id);
  };

  return (
    <>
      <Dialog
        open={showDialog}
        classes={{
          paper: isMobile ? classes.mobilePaperRoot : classes.paperRoot,
        }}
        fullScreen={isMobile}
        className={isMobile ? classes.mobile : ''}
        TransitionComponent={Transition}
      >
        <DialogTitle
          className={classes.capitalise}
          classes={{ root: classes.dialogTitle }}
        >
          Criteria for {data.title}
        </DialogTitle>

        <IconButton
          onClick={() => {
            setShowForm(true);
          }}
          className={classes.addButton}
        >
          <AddIcon color="primary" />
        </IconButton>

        <DialogContent classes={{ root: classes.dialogContent }}>
          {criteriaState.loading && <LinearProgress />}
          {criteria &&
            criteria.map(x => (
              <Criterion
                key={x.id}
                data={x}
                handleDelete={handleDelete(x.id)}
                setEditTarget={handleSetEditTarget(x)}
              />
            ))}
          {!criteriaState.loading && (!criteria || criteria.length === 0) && (
            <Typography variant="subtitle1" color="textSecondary">
              No criteria yet
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Done
          </Button>
        </DialogActions>
      </Dialog>

      <Form
        action={selectedCriterion ? 'Edit' : 'Create'}
        actions={{
          Create: handleCreate,
          Edit: handleEdit,
          close: closeForm,
        }}
        open={showForm}
        data={assessmentCriteriaFields(selectedCriterion)}
        formTitle={'criteria'}
      />
    </>
  );
};

export default withStyles(styles, { withTheme: true })(CriteriaDialog);
