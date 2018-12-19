import React, { useState, useEffect } from 'react';
import { firestore } from '../../../store';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import DonutIcon from '@material-ui/icons/DonutLarge';
import BarIcon from '@material-ui/icons/BarChart';
import LineIcon from '@material-ui/icons/Timeline';

import AddCircleIcon from '@material-ui/icons/AddCircleOutline';

import ChartItem from './ChartItem';
import { getRandomId } from '../../../utilities';

const styles = theme => ({
    dialogRoot: {
        minWidth: 480,
        height: 600,
        maxWidth: 'none',
    },
    chartTypeButtons: {
        display: 'flex',
    },
    titleField: {
        marginBottom: theme.spacing.unit * 2,
    },
    addItemButton: {
        marginLeft: -theme.spacing.unit * 2.25,
    },
});

function ChartEditor(props) {
    const { classes, showDialog, setShowDialog, uid, chartToEdit } = props;

    const [chart, setChart] = useState({
        type: '',
        title: '',
        items: [],
    });

    let disableAddItemButton = false;
    if (chart.type === 'number') {
        disableAddItemButton = true;
    } else if (chart.type === 'percentage' && chart.items.length >= 2) {
        disableAddItemButton = true;
    } else if (chart.items.length > 0 && !chart.items[chart.items.length - 1].preset) {
        disableAddItemButton = true;
    }

    const handleDone = () => {
        // firestore.collection('admins').doc(uid).collection('charts').add(chart);
        setShowDialog(false);
    }

    console.log('chart', chart);

    const handleChangeItem = (index, colour, preset) => {
        const newItems = chart.items;
        newItems[index] = { ...newItems[index], colour, preset };
        setChart({ ...chart, items: newItems });
    }

    const handleDeleteItem = (index) => {
        const newItems = chart.items;
        newItems.splice(index, 1);
        setChart({ ...chart, items: newItems });
    }

    return(
    <Dialog
        classes={{ paper: classes.dialogRoot }}
        open={showDialog}
        onClose={() => { setShowDialog(false) }}
    >
        <DialogTitle>
            { chartToEdit ? `Edit ${chartToEdit.title}` : 'New chart' }
        </DialogTitle>

        <DialogContent>
            <Typography variant="caption">Type</Typography>
            <ToggleButtonGroup
                className={classes.chartTypeButtons}
                exclusive
                value={chart.type}
                onChange={(e, val) => { setChart({ ...chart, type: val, items: [{ id: getRandomId() }] }) }}
            >
                <ToggleButton value="bar"><BarIcon/></ToggleButton>
                <ToggleButton value="line"><LineIcon/></ToggleButton>
                <ToggleButton value="donut"><DonutIcon/></ToggleButton>
                <ToggleButton value="number">123</ToggleButton>
                <ToggleButton value="percentage">%</ToggleButton>
            </ToggleButtonGroup>

            { chart.type && <React.Fragment>
                { chart.type !== 'number' &&
                    <TextField
                        value={ chart.title }
                        onChange={(e) => { setChart({ ...chart, title: e.target.value }) }}
                        label="Title"
                        fullWidth
                        className={classes.titleField}
                    />
                }
                <Button
                    className={classes.addItemButton}
                    color="primary"
                    onClick={() => { setChart({ ...chart, items: [...chart.items, { id: getRandomId() }] }) }}
                    disabled={disableAddItemButton}
                >
                    <AddCircleIcon /> Add Item
                </Button>
                { chart.items.map((x, i) => {
                    console.log(i, x)
                    return <ChartItem
                        key={x.id} index={i}
                        chartType={chart.type}
                        handleChangeItem={handleChangeItem}
                        handleDeleteItem={handleDeleteItem}
                    />
                })}
            </React.Fragment>}
        </DialogContent>

        <DialogActions>
            <Button
                color="primary"
                onClick={() => { setShowDialog(false) }}
            >
                Cancel
            </Button>
            <Button
                color="primary" variant="contained"
                onClick={handleDone}
                disabled={ !chart.type || chart.type.length === 0 || chart.items.length === 0 || (chart.items.length === 1 && !chart.items[0].preset) }
            >
                Done
            </Button>
        </DialogActions>
    </Dialog>);
}

export default withStyles(styles)(ChartEditor);
// firestore.collection('admins').doc(uid).collection('charts').add(chart)
// firestore.collection('admins').doc(uid).collection('charts').doc(chartid).update(chart)
