import React, { useState, useEffect } from 'react';
import { firestore } from '../../../store';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import DonutIcon from '@material-ui/icons/DonutLarge';
import BarIcon from '@material-ui/icons/BarChart';
import LineIcon from '@material-ui/icons/Timeline';

import AddCircleIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';

import ChartItem from './ChartItem';
import { getRandomId } from '../../../utilities';
import { trackers } from '../../../constants/statsTrackers';

const styles = theme => ({
    dialogRoot: {
        minWidth: 480,
        height: 600,
        maxWidth: 'none',
        position: 'relative',
    },
    dialogTitle: {
        paddingRight: theme.spacing.unit * 8,
    },
    deleteButton: {
        position: 'absolute',
        top: theme.spacing.unit * 1.25,
        right: theme.spacing.unit * 1.25,
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

const getDefaultLayout = (chartType) => {
    switch (chartType) {
        case 'line':
        case 'bar':
            return { x:0, y:0, w:6, h:3 };

        case 'donut':
            return { x:0, y:0, w:4, h:3 };

        case 'percentage':
            return { x:0, y:0, w:2, h:2 };

        case 'number':
        default:
            return { x:0, y:0, w:2, h:1 };
    }
};

const getChartToEdit = (chartToEdit) => {
    const output = Object.assign({}, chartToEdit);

    let trackers = [];
    let queries = [];
    if (chartToEdit.trackers) {
        trackers = chartToEdit.trackers.map(x => ({ id:x.id, colour:x.colour, preset:x.presetName }));
        delete output.trackers;
    }
    if (chartToEdit.queries) {
        queries = chartToEdit.queries.map(x => ({ id:x.id, colour:x.colour, preset:x.presetName }));
        delete output.queries;
    }

    return { ...output, items: [...trackers, ...queries] };
}

function ChartEditor(props) {
    const { classes, showDialog, setShowDialog, uid, chartToEdit, setChartToEdit } = props;

    const [chart, setChart] = useState({ type: '', title: '', items: [] });

    useEffect(() => {
        if (chartToEdit) setChart(getChartToEdit(chartToEdit))
    }, [chartToEdit]);

    let disableAddItemButton = false;
    if (chart.type === 'number') {
        disableAddItemButton = true;
    } else if (chart.type === 'percentage' && chart.items.length >= 2) {
        disableAddItemButton = true;
    } else if (chart.items.length > 0) {
        const lastItem = chart.items[chart.items.length - 1];
        if (!lastItem.preset || !lastItem.colour)
            disableAddItemButton = true;
    }

    const handleDelete = () => {
        firestore.collection('admins').doc(uid).collection('charts').doc(chart.id).delete();
        handleClose();
    }

    const handleChangeChartType = (e, val) => {
        let newItems;
        if (chart.items.length > 0) {
            switch (val) {
                case 'percentage': newItems = chart.items.slice(0, 2);  break;
                case 'number':     newItems = chart.items.slice(0, 1);  break;
                default:           newItems = chart.items;              break;
            }
        } else {
            newItems = [{ id: getRandomId() }];
        }

        setChart({ ...chart, type: val, items: newItems });
    };

    const handleAddItem = () => {
        setChart({ ...chart, items: [...chart.items, { id: getRandomId() }] });
    };

    const handleChangeItem = (index, colour, preset) => {
        const newItems = chart.items;
        newItems[index] = { ...newItems[index], colour, preset };
        setChart({ ...chart, items: newItems });
    };

    const handleDeleteItem = (index) => {
        const newItems = chart.items;
        newItems.splice(index, 1);
        setChart({ ...chart, items: newItems });
    };

    const handleDone = () => {
        const output = Object.assign({ trackers:[], queries:[] }, chart);

        const transformedItems = output.items.map(x => ({...trackers[x.preset], colour:x.colour, id:x.id}));

        const trackerItems = transformedItems.filter(x => x.itemType === 'tracker');
        const queryItems = transformedItems.filter(x => x.itemType === 'query');

        if (trackerItems.length > 0) output.trackers = trackerItems;
        if (queryItems.length > 0) output.queries = queryItems;

        if (!output.layout) output.layout = getDefaultLayout(chart.type);

        delete output.items;

        // update chart
        if (output.id) {
            console.log('updating chart in firestore:', output);
            const chartId = output.id;
            delete output.id;
            firestore.collection('admins').doc(uid).collection('charts').doc(chartId).update(output);
        } else {
            // new chart
            console.log('adding chart to firestore:', output);
            firestore.collection('admins').doc(uid).collection('charts').add(output);
        }

        handleClose();
    };

    const handleClose = () => {
        setShowDialog(false);
        setChartToEdit(null);
        setChart({ type: '', title: '', items: [] });
    }

    return(
    <Dialog
        classes={{ paper: classes.dialogRoot }}
        open={showDialog}
        onClose={handleClose}
    >
        <DialogTitle className={classes.dialogTitle}>
            { chartToEdit ? `Edit ${chartToEdit.title ? chartToEdit.title : 'chart'}` : 'New chart' }
        </DialogTitle>

        { chartToEdit &&
            <IconButton className={classes.deleteButton} onClick={handleDelete}>
                <DeleteIcon />
            </IconButton>
        }

        <DialogContent>
            <Typography variant="caption">Type</Typography>
            <ToggleButtonGroup
                className={classes.chartTypeButtons}
                exclusive
                value={chart.type}
                onChange={handleChangeChartType}
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
                    onClick={handleAddItem}
                    disabled={disableAddItemButton}
                >
                    <AddCircleIcon /> Add Item
                </Button>
                { chart.items.map((x, i) =>
                    <ChartItem
                        key={x.id} index={i}
                        chartType={chart.type}
                        chartItem={x}
                        handleChangeItem={handleChangeItem}
                        handleDeleteItem={handleDeleteItem}
                    />
                )}
            </React.Fragment>}
        </DialogContent>

        <DialogActions>
            <Button
                color="primary"
                onClick={handleClose}
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
