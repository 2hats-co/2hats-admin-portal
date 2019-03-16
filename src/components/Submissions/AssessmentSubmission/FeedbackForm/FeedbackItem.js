import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import PassIcon from '@material-ui/icons/CheckCircleOutlined';
import FailIcon from '@material-ui/icons/ErrorOutline';
import EditIcon from '@material-ui/icons/EditOutlined';

import Form from '../../../Form';
import assessmentFeedbackCustomFields from '../../../../constants/forms/assessmentFeedbackCustom';

import { STYLES } from '@bit/sidney2hats.2hats.global.common-constants';
import { passFailStyles } from './index';

const styles = theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
  },

  title: { lineHeight: 1.5 },

  ...passFailStyles(theme),

  renderedHtml: {
    ...STYLES.RENDERED_HTML(theme).renderedHtml,
    ...theme.typography.body2,

    marginTop: theme.spacing.unit,
  },
});

const FeedbackItem = props => {
  const {
    classes,
    data,
    selections,
    updateFeedback,
    removeFeedbackItem,
  } = props;

  const [showForm, setShowForm] = useState(false);

  let selected = [];
  const filtered = selections.filter(x => x.id === data.id);
  if (filtered.length > 0) selected = filtered[0];

  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" className={classes.title} gutterBottom>
        {data.title}
      </Typography>

      <Grid container alignItems="center">
        <Grid item xs>
          <ToggleButtonGroup
            value={selected.outcome || ''}
            exclusive
            onChange={(e, v) => {
              if (!v) removeFeedbackItem();
              else updateFeedback(v, data[v]);
            }}
            className={classes.toggleButtons}
          >
            <ToggleButton
              classes={{
                root: classes.passButton,
                selected: classes.toggleButtonSelected,
                label: classes.toggleButtonLabel,
              }}
              value="pass"
            >
              <PassIcon />
              Pass
            </ToggleButton>
            <ToggleButton
              classes={{
                root: classes.failButton,
                selected: classes.toggleButtonSelected,
                label: classes.toggleButtonLabel,
              }}
              value="fail"
            >
              <FailIcon />
              Fail
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>

        {selected.outcome && (
          <Grid item>
            <Button
              onClick={() => {
                setShowForm(true);
              }}
            >
              <EditIcon />
              Customise
            </Button>
          </Grid>
        )}
      </Grid>

      {selected.outcome && (
        <div
          className={classes.renderedHtml}
          dangerouslySetInnerHTML={{ __html: selected.message }}
        />
      )}

      {showForm && (
        <Form
          action="Edit"
          actions={{
            Edit: res => {
              updateFeedback(selected.outcome, res.message);
              setShowForm(false);
            },
            close: () => {
              setShowForm(false);
            },
          }}
          open={showForm}
          data={assessmentFeedbackCustomFields(selected.message)}
          formTitle={`${selected.outcome} message for ${data.title}`}
        />
      )}
    </div>
  );
};

FeedbackItem.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  selections: PropTypes.array.isRequired,
  updateFeedback: PropTypes.func.isRequired,
  removeFeedbackItem: PropTypes.func.isRequired,
};

export default withStyles(styles)(FeedbackItem);
