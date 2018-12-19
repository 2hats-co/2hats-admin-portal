import React, { useState, useEffect } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import { SketchPicker } from 'react-color';

import IconButton from '@material-ui/core/IconButton';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

import IntegrationReactSelect from '../../IntegrationReactSelect';
import { trackersList } from '../../../constants/statsTrackers';

const styles = theme => ({
    root: {
    },
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
      width:20,
      height:20,
      borderRadius: 10,
      boxShadow: '0 0 1px 0 rgba(0,0,0,.5) inset',
    },
    popover: {
      position: 'absolute',
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
    const { classes, chartType, index, handleChangeItem, handleDeleteItem } = props;

    const [showColourPicker, setShowColourPicker] = useState(false);
    const [colour, setColour] = useState('');
    const [preset, setPreset] = useState('');

    let suggestions;
    if (chartType === 'bar' || chartType === 'line') {
        suggestions = trackersList.filter(x => x.itemType !== 'query')
            .map(x => ({ value:x.name, label:x.label }));
    } else {
        suggestions = trackersList.map(x => ({ value:x.name, label:x.label }));
    }

    useEffect(() => {
        handleChangeItem(index, colour, preset);
    }, [colour, preset]);

    return (
    <Grid container alignItems="center" className={classes.root}>
        <Grid item>
            <IconButton className={classes.deleteButton} onClick={() => { handleDeleteItem(index) }}>
                <RemoveCircleOutlineIcon />
            </IconButton>
        </Grid>

        <Grid item className={classes.swatchWrapper}>
            <IconButton onClick={() => { setShowColourPicker(!showColourPicker) }}>
                <div className={ classes.swatch } style={{background:colour}} />
            </IconButton>
            { showColourPicker ?
                //<ClickAwayListener onClick={() => { setShowColourPicker(false) }}>
                    <div className={ classes.popover }>
                        <div className={ classes.cover } onClick={() => { setShowColourPicker(!showColourPicker) }}/>
                        <SketchPicker color={colour} onChange={(val) => { setColour(val.hex) }} />
                    </div>
                //</ClickAwayListener>
            : null }
        </Grid>

        <Grid item xs>
            <IntegrationReactSelect
                placeholder="Select item…"
                suggestions={suggestions}
                changeHandler={(data) => { setPreset(data.value) }}
            />
        </Grid>
    </Grid>
    );
}

export default withStyles(styles)(ChartItem);
