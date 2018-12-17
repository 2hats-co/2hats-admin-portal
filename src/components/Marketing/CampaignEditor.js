import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';

import AddIcon from '@material-ui/icons/Add';

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
});

function CampaignEditor(props) {
    const { classes, action } = props;

    const [campaignData, setCampaignData] = useState({
        query: '',
        ignoreList: [],
        requiredList: [],
        message: '',
    });

    const [ignoreTerm, setIgnoreTerm] = useState('');
    const [requiredTerm, setRequiredTerm] = useState('');

    const handleDeleteFromList = (list, i) => {
        const newList = campaignData[list];
        newList.splice(i, 1);
        setCampaignData({ ...campaignData, [list]: newList });
    };

    const handleAddToList = (list, item, setItemState) => {
        if (item.length > 0) {
            const newList = campaignData[list];
            newList.push(item);
            setCampaignData({ ...campaignData, [list]: newList });
            setItemState('');
        }
    };

    return (
    <Paper className={classes.root}>
        <Grid container direction="column" spacing={8}>
            <Grid item><Typography variant="title">{action} Campaign</Typography></Grid>

            <Grid item>
                <TextField
                    autoFocus fullWidth
                    label="Search query"
                    value={campaignData.setCampaignData}
                    onChange={(e) => { setCampaignData({ ...campaignData, query: e.target.value }) }}
                />
            </Grid>

            <Grid item>
                <Grid container alignItems="flex-end">
                    <Grid item xs>
                        <TextField fullWidth label="Ignored terms"
                            value={ignoreTerm}
                            onChange={(e) => { setIgnoreTerm(e.target.value) }}
                            onKeyPress={(e) => { if (e.key === 'Enter') handleAddToList('ignoreList', ignoreTerm, setIgnoreTerm) }}
                        />
                    </Grid>
                    <Grid item>
                        <IconButton
                            className={classes.addButton}
                            onClick={() => { handleAddToList('ignoreList', ignoreTerm, setIgnoreTerm) }}
                        >
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </Grid>
                </Grid>

                { campaignData.ignoreList.map((x, i) =>
                    <Chip key={i} label={x} className={classes.chip} variant="outlined"
                        onDelete={() => { handleDeleteFromList('ignoreList', i) }}
                    />
                )}
            </Grid>

            <Grid item>
                <Grid container alignItems="flex-end">
                    <Grid item xs>
                        <TextField fullWidth label="Required terms"
                            value={requiredTerm}
                            onChange={(e) => { setRequiredTerm(e.target.value) }}
                            onKeyPress={(e) => { if (e.key === 'Enter') handleAddToList('requiredList', requiredTerm, setRequiredTerm) }}
                        />
                    </Grid>
                    <Grid item>
                        <IconButton
                            className={classes.addButton}
                            onClick={() => { handleAddToList('requiredList', requiredTerm, setRequiredTerm) }}
                        >
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </Grid>
                </Grid>

                { campaignData.requiredList.map((x, i) =>
                    <Chip key={i} label={x} className={classes.chip} variant="outlined"
                        onDelete={() => { handleDeleteFromList('requiredList', i) }}
                    />
                )}
            </Grid>

            <Grid item>
                <TextField className={classes.messageBox}
                    variant="outlined" multiline fullWidth rows={3}
                    label="Message"
                    value={campaignData.message}
                    onChange={(e) => { setCampaignData({ ...campaignData, message: e.target.value }) }}
                />
            </Grid>

            <Grid item>
                <Button
                    variant="contained" color="primary" className={classes.done}
                >
                    Done
                </Button>
            </Grid>

        </Grid>
    </Paper>
    );
}

export default withStyles(styles)(CampaignEditor);
