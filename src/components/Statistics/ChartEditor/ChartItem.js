import React, { useState, useEffect } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import { ChromePicker } from 'react-color';
import { randomColor } from 'randomcolor';

import IconButton from '@material-ui/core/IconButton';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Fade from '@material-ui/core/Fade';

import IntegrationReactSelect from '../../IntegrationReactSelect';
import { trackers, trackersList } from '../../../constants/statsTrackers';

const styles = theme => ({
  root: {},
  deleteButton: {
    marginLeft: -theme.spacing.unit * 1.75,
  },
  formControl: {
    minWidth: 80,
  },
  swatchWrapper: {
    marginLeft: -theme.spacing.unit * 1.5,
  },
  swatch: {
    background: '#fff',
    width: 20,
    height: 20,
    borderRadius: 10,
    boxShadow: '0 0 1px 0 rgba(0,0,0,.5) inset',
  },
  popover: {
    position: 'fixed',
    zIndex: '2',
  },
  cover: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});

function ChartItem(props) {
  const {
    classes,
    chartType,
    index,
    chartItem,
    handleChangeItem,
    handleDeleteItem,
  } = props;

  const [showColourPicker, setShowColourPicker] = useState(false);
  const [colour, setColour] = useState(
    chartItem.colour ? chartItem.colour : randomColor({ format: 'rgb' })
  );
  const [preset, setPreset] = useState(
    chartItem.preset
      ? { value: chartItem.preset, label: trackers[chartItem.preset].label }
      : ''
  );

  let suggestions;
  if (chartType === 'bar' || chartType === 'line') {
    suggestions = trackersList
      .filter(x => x.itemType !== 'query')
      .map(x => ({ value: x.name, label: x.label }));
  } else {
    suggestions = trackersList.map(x => ({ value: x.name, label: x.label }));
  }

  useEffect(
    () => {
      handleChangeItem(index, colour, preset.value);
    },
    [colour, preset]
  );

  return (
    <Grid container alignItems="center" className={classes.root}>
      <Grid item>
        <IconButton
          className={classes.deleteButton}
          onClick={() => {
            handleDeleteItem(index);
          }}
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
      </Grid>

      <Grid item className={classes.swatchWrapper}>
        <IconButton
          onClick={() => {
            setShowColourPicker(!showColourPicker);
          }}
        >
          <div className={classes.swatch} style={{ background: colour }} />
        </IconButton>
        {showColourPicker ? (
          <Fade in>
            <div className={classes.popover}>
              <div
                className={classes.cover}
                onClick={() => {
                  setShowColourPicker(!showColourPicker);
                }}
              />
              <ChromePicker
                color={colour}
                onChange={val => {
                  setColour(`rgb(${val.rgb.r}, ${val.rgb.g}, ${val.rgb.b})`);
                }}
              />
            </div>
          </Fade>
        ) : null}
      </Grid>

      <Grid item xs>
        <IntegrationReactSelect
          placeholder="Select item…"
          suggestions={suggestions}
          changeHandler={data => {
            setPreset(data);
          }}
          value={preset}
        />
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(ChartItem);
