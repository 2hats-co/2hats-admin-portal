import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';

import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import { DatePicker } from 'material-ui-pickers';
import moment from 'moment';
import NativeSelect from '@material-ui/core/NativeSelect';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { useWindowSize } from '../../hooks/useWindowSize';

const styles = theme => ({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 'auto',
    height: 64,
    paddingTop: (64 - 32) / 2,
    paddingBottom: (64 - 32) / 2,
    zIndex: 99,
  },
  toggleContainer: {
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 0,
    background: theme.palette.background.paper,
    padding: '0 16px',

    '& + &': { borderLeft: `1px solid ${theme.palette.divider}` },
  },
  form: {
    marginLeft: 20,
  },
  datePicker: {
    '& + &': { marginLeft: theme.spacing.unit },
  },
  toggleButtonLabel: {
    textTransform: 'capitalize',
  },
});
function TimeBar(props) {
  const { classes, setFormat, setRange } = props;
  const windowSize = useWindowSize();
  const [rangeType, setRangeType] = useState('custom');
  const [stepSize, setStepSize] = useState('24');
  const [start, setStart] = useState(
    moment()
      .startOf('day')
      .subtract(2, 'weeks')
  );
  const [end, setEnd] = useState(moment().startOf('hour'));

  useEffect(
    () => {
      setRange({ start: start.unix(), end: end.unix() });
    },
    [start, end]
  );

  useEffect(
    () => {
      switch (stepSize) {
        case '1':
          setFormat({ stepSize: 1, label: 'ha ddd' });
          break;
        case '24':
          setFormat({ stepSize: 24, label: 'DD/MM' });
          break;
        case '168':
          setFormat({ stepSize: 24 * 7, label: 'DD/MM' });
          break;
        default:
          break;
      }
    },
    [stepSize]
  );

  useEffect(
    () => {
      switch (rangeType) {
        case 'week':
          setRange({
            start: moment()
              .startOf('day')
              .subtract(1, 'weeks')
              .unix(),
            end: moment()
              .startOf('hour')
              .unix(),
          });
          break;
        case 'month':
          setRange({
            start: moment()
              .startOf('day')
              .subtract(1, 'months')
              .unix(),
            end: moment()
              .startOf('hour')
              .unix(),
          });
          break;
        case 'quarter':
          setRange({
            start: moment()
              .startOf('day')
              .subtract(3, 'months')
              .unix(),
            end: moment()
              .startOf('hour')
              .unix(),
          });
          break;
        default:
          setRange({ start: start.unix(), end: end.unix() });
          break;
      }
    },
    [rangeType]
  );
  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.toggleContainer}>
        {windowSize.isMobile ? (
          <NativeSelect
            value={rangeType}
            onChange={e => {
              setRangeType(e.target.value);
            }}
            input={
              <OutlinedInput name="Range" id="range-native-label-placeholder" />
            }
          >
            <option value="week">Past week</option>
            <option value="month">past month</option>
            <option value="quarter">past quarter</option>
          </NativeSelect>
        ) : (
          <React.Fragment>
            {' '}
            <ToggleButtonGroup
              value={rangeType}
              exclusive
              onChange={(e, v) => {
                setRangeType(v);
              }}
            >
              <ToggleButton
                classes={{ label: classes.toggleButtonLabel }}
                value="week"
              >
                Past week
              </ToggleButton>
              <ToggleButton
                classes={{ label: classes.toggleButtonLabel }}
                value="month"
              >
                past month
              </ToggleButton>
              <ToggleButton
                classes={{ label: classes.toggleButtonLabel }}
                value="quarter"
              >
                past quarter
              </ToggleButton>
              <ToggleButton
                classes={{ label: classes.toggleButtonLabel }}
                value="custom"
              >
                custom
              </ToggleButton>
            </ToggleButtonGroup>
            {rangeType === 'custom' && (
              <form className={classes.form} noValidate>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <DatePicker
                    label="From"
                    value={start}
                    onChange={dt => {
                      setStart(dt);
                    }}
                    leftArrowIcon={<LeftIcon />}
                    rightArrowIcon={<RightIcon />}
                    showTodayButton
                    className={classes.datePicker}
                  />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <DatePicker
                    label="To"
                    value={end}
                    onChange={dt => {
                      setEnd(dt);
                    }}
                    leftArrowIcon={<LeftIcon />}
                    rightArrowIcon={<RightIcon />}
                    showTodayButton
                    className={classes.datePicker}
                  />
                </MuiPickersUtilsProvider>
              </form>
            )}
          </React.Fragment>
        )}
      </Grid>
      <Grid item className={classes.toggleContainer}>
        {windowSize.isMobile ? (
          <NativeSelect
            value={stepSize}
            onChange={(e, v) => setStepSize(e.target.value)}
            input={
              <OutlinedInput name="format" id="format-label-placeholder" />
            }
          >
            <option value={1}>hourly</option>
            <option value={24}>daily</option>
            <option value={24 * 7}>weekly</option>
          </NativeSelect>
        ) : (
          <ToggleButtonGroup
            value={stepSize}
            exclusive
            onChange={(t, v) => setStepSize(v)}
          >
            <ToggleButton
              classes={{ label: classes.toggleButtonLabel }}
              value="1"
            >
              hourly
            </ToggleButton>
            <ToggleButton
              classes={{ label: classes.toggleButtonLabel }}
              value="24"
            >
              daily
            </ToggleButton>
            <ToggleButton
              classes={{ label: classes.toggleButtonLabel }}
              value="168"
            >
              weekly
            </ToggleButton>
          </ToggleButtonGroup>
        )}
      </Grid>
    </Grid>
  );
}
TimeBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TimeBar);
