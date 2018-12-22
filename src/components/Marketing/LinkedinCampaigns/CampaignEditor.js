import React from 'react';
import remove from 'ramda/es/remove';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import AddIcon from '@material-ui/icons/Add';
import { Formik } from 'formik';
import Modal from '@material-ui/core/Modal';
//import Yup from 'yup';
const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 5,
    padding: theme.spacing.unit * 3,
    maxWidth: 600,
  },
  title: {
    marginBottom: theme.spacing.unit * 2,
  },
  addButton: {
    marginRight: -theme.spacing.unit * 2,
    marginBottom: -theme.spacing.unit,
  },
  chip: {
    marginTop: theme.spacing.unit,
  },
  messageBox: {
    marginTop: theme.spacing.unit * 2,
  },
  done: {
    display: 'block',
    marginLeft: 'auto',
    marginTop: theme.spacing.unit,
  },
  modal: {},
});

const emptyForm = {
  email: '',
  password: '',
  query: '',
  ignoreTerm: '',
  requiredTerm: '',
  ignoreList: [],
  requiredList: [],
  message: '',
};
function CampaignEditor(props) {
  const { classes, action, actions, open, campaign } = props;
  const initialValues = campaign
    ? {
        email: campaign.email,
        password: '',
        query: campaign.query,
        ignoreTerm: '',
        requiredTerm: '',
        ignoreList: [campaign.ignoreList],
        requiredList: [campaign.requiredList],
        message: campaign.message,
      }
    : emptyForm;
  console.log(initialValues, campaign);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        actions[action](values);
      }}
    >
      {formikProps => {
        const { values, handleChange, handleSubmit, setValues } = formikProps;
        const handleDeleteFromList = (list, index) => {
          const newList = remove(index, 1, values[list]);
          setValues({ ...values, [list]: newList });
        };
        const handleAddToList = (list, item) => {
          const currentList = values[list];
          const newItem = values[item].toLowerCase().trim();
          if (newItem.length > 0 && !currentList.includes(newItem)) {
            const newList = currentList.concat([newItem]);
            setValues({ ...values, [list]: newList, [item]: '' });
          } else {
            setValues({ ...values, [item]: '' });
          }
        };
        return (
          <form onSubmit={handleSubmit}>
            <Modal
              open={open}
              onClose={actions.close}
              className={classes.modal}
            >
              <Paper className={classes.root}>
                <Grid container direction="column" spacing={8}>
                  <Grid item>
                    <Typography variant="title">{action} Campaign</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Linkedin email"
                      id="email"
                      placeholder="Linkedin account"
                      type="text"
                      onChange={handleChange}
                      autoFocus
                      fullWidth
                      value={values.email}
                    />
                    <TextField
                      label="Linkedin password"
                      id="password"
                      placeholder="Linkedin password"
                      type="password"
                      onChange={handleChange}
                      fullWidth
                      value={values.password}
                    />
                    <TextField
                      label="Search query"
                      id="query"
                      placeholder="Linkedin search"
                      type="text"
                      onChange={handleChange}
                      fullWidth
                      value={values.query}
                    />
                  </Grid>
                  <Grid item>
                    <Grid container alignItems="flex-end">
                      <Grid item xs>
                        <TextField
                          id="ignoreTerm"
                          placeholder="Ignored keyword"
                          type="text"
                          onChange={handleChange}
                          fullWidth
                          value={values.ignoreTerm}
                          label="Ignored keywords"
                          onKeyPress={e => {
                            if (e.key === 'Enter') {
                              handleAddToList('ignoreList', 'ignoreTerm');
                            }
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <IconButton
                          className={classes.addButton}
                          onClick={() => {
                            handleAddToList('ignoreList', 'ignoreTerm');
                          }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                    </Grid>
                    {values.ignoreList.map((x, i) => (
                      <Chip
                        key={i}
                        label={x}
                        className={classes.chip}
                        variant="outlined"
                        onDelete={() => {
                          handleDeleteFromList('ignoreList', i);
                        }}
                      />
                    ))}
                  </Grid>

                  <Grid item>
                    <Grid container alignItems="flex-end">
                      <Grid item xs>
                        <TextField
                          id="requiredTerm"
                          placeholder="Required keyword"
                          type="text"
                          onChange={handleChange}
                          fullWidth
                          value={values.requiredTerm}
                          label="Required keywords"
                          onKeyPress={e => {
                            if (e.key === 'Enter') {
                              handleAddToList('requiredList', 'requiredTerm');
                            }
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <IconButton
                          className={classes.addButton}
                          onClick={() => {
                            handleAddToList('requiredList', 'requiredTerm');
                          }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                    </Grid>

                    {values.requiredList.map((x, i) => (
                      <Chip
                        key={i}
                        label={x}
                        className={classes.chip}
                        variant="outlined"
                        onDelete={() => {
                          handleDeleteFromList('requiredList', i);
                        }}
                      />
                    ))}
                  </Grid>

                  <Grid item>
                    <TextField
                      className={classes.messageBox}
                      variant="outlined"
                      multiline
                      fullWidth
                      rows={3}
                      label="Message"
                      id="message"
                      onChange={handleChange}
                      value={values.message}
                    />
                  </Grid>

                  <Grid item>
                    <Button
                      onClick={handleSubmit}
                      variant="contained"
                      color="primary"
                      className={classes.done}
                    >
                      Done
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Modal>
          </form>
        );
      }}
    </Formik>
  );
}

export default withStyles(styles)(CampaignEditor);
