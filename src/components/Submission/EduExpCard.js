import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    root:{
        marginTop: theme.spacing.unit,
        '& + &': {
            marginTop: theme.spacing.unit * 2,
            paddingTop: theme.spacing.unit * 2,
            borderTop: `1px solid ${theme.palette.divider}`,
        },
    },
});

function EduExpCard(props) {
    const { classes, title, key, label, description, startDate, endDate } = props;

    return (
        <div key={key} className={classes.root}>
            <Typography variant="body2" style={{fontWeight:700}}>{title}</Typography>

            <Grid container direction="row" alignItems="center" justify="space-between">
                <Grid item xs={7}>
                    <Typography variant="body2">{label ? label : '—'}</Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography variant="body1" style={{textAlign:'right'}}>
                        {startDate} – {endDate}
                    </Typography>
                </Grid>
            </Grid>

            <Typography variant="body1" style={{whiteSpace:'pre-wrap'}}>{description}</Typography>
        </div>
    );
}

export default withStyles(styles)(EduExpCard);
