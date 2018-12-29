import React, { useEffect } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';

import { Formik } from 'formik';
import remove from 'ramda/es/remove';
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
  connectionsPerSession: 10,
};
function CampaignEditor(props) {
  const { classes, action, actions, open, campaign } = props;
  let initialValues = emptyForm;

  let reload = true;
  useEffect(
    () => {
      if (campaign) {
        initialValues = {
          id: campaign.id,
          email: campaign.email,
          password: campaign.password,
          query: campaign.query,
          ignoreTerm: '',
          requiredTerm: '',
          ignoreList: campaign.ignoreList,
          requiredList: campaign.requiredList,
          message: campaign.message,
          connectionsPerSession: campaign.connectionsPerSession,
        };
      } else {
        initialValues = emptyForm;
      }
      reload = true;
    },
    [campaign]
  );
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        actions[action](values);
      }}
    >
      {formikProps => {
        const { values, handleChange, handleSubmit, setValues } = formikProps;
        if (reload) {
          setValues({ ...values, ...initialValues });
          reload = false;
        }
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
            <Dialog
              open={open}
              onClose={actions.close}
              className={classes.modal}
            >
              <DialogTitle>
                {action} Campaign{campaign && `: ${campaign.query}`}
              </DialogTitle>

              <DialogContent>
                <Grid container direction="column" spacing={8}>
                  <Grid item>
                    <TextField
                      label="LinkedIn email"
                      id="email"
                      type="text"
                      onChange={handleChange}
                      autoFocus
                      fullWidth
                      value={values.email}
                    />
                    <TextField
                      label="LinkedIn password"
                      id="password"
                      type="password"
                      onChange={handleChange}
                      fullWidth
                      value={values.password}
                    />
                    <TextField
                      label="Search query"
                      id="query"
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
                </Grid>
              </DialogContent>
              <Grid container>
                <Grid item xs className={classes.sliderWrapper}>
                  <Slider
                    classes={{ container: classes.slider }}
                    onChange={(e, v) => {
                      setValues({ ...values, connectionsPerSession: v });
                    }}
                    id="connectionsPerSession"
                    value={values.connectionsPerSession}
                    min={5}
                    max={180}
                    step={5}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    {values.connectionsPerSession} Connections
                  </Typography>
                </Grid>
              </Grid>
              <DialogActions>
                <Button
                  onClick={handleSubmit}
                  color="primary"
                  className={classes.done}
                >
                  Done
                </Button>
              </DialogActions>
            </Dialog>
          </form>
        );
      }}
    </Formik>
  );
}

export default withStyles(styles)(CampaignEditor);
