import React, {useState, useEffect} from 'react';
import moment from 'moment';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import {CLOUD_FUNCTIONS,callable} from '../../firebase/functions';
const styles = theme => ({
    root: {
        height: '100%',
        padding: theme.spacing.unit * 2,
        textAlign: 'center',

        '& *': { color: 'inherit' },

        '& .query-number-updated': {
            opacity: 0,
            transition: 'opacity .2s',
            marginBottom: -theme.spacing.unit,
        },
        '&:hover .query-number-updated': { opacity: .53 },
    },
    subheading: {
        lineHeight: 1.1,
    },
});

function QueryNumber(props) {
        const { classes, theme, title, query, colour } = props;
        const [result, setResult] = useState(null);
        useEffect(() => {
            if (!result) {
                callable(
                    CLOUD_FUNCTIONS.stats,
                  //  { filters:queries[0].filters, collection:queries[0].collection},
                    { filters:query.filters, collection:"submissions" },
                    o => setResult(o),
                    e => console.log("fail", e)
                  );
            }
        }, [result]);

        if (result) return(
        <Grid container
            className={classes.root}
            justify="center" alignItems="center"
            style={{
                backgroundImage: `linear-gradient(to bottom right, ${colour.replace('rgb','rgba').replace(')',', 1)')} 0%, ${colour.replace('rgb','rgba').replace(')',', .5)')} 100%)`,
                color: theme.palette.getContrastText(colour)
            }}
        >
            <Grid item>
                <Typography variant="display2">{result.data.value}</Typography>
                <Typography variant="subheading" className={classes.subheading}>{title}</Typography>
                <Typography variant="caption" className="query-number-updated">
                    Updated {moment(result.data.updatedAt*1000).fromNow()}
                </Typography>
            </Grid>
        </Grid>
        );

        else return (
        <Grid container justify="center" alignItems="center" style={{ height:'100%' }}>
            <CircularProgress />
        </Grid>
        );

}

export default withStyles(styles, { withTheme: true })(QueryNumber);
