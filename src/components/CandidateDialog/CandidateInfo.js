import React from 'react';
import { withStyles } from '@material-ui/core';

import InfoItem from './InfoItem';

const styles = theme => ({
    root: {
        padding: "10px 20px",
        height: "100%",
        overflowY: "scroll",
        boxSizing: "border-box",
    },
});

function CandidateInfo(props) {
    const { items, classes } = props;

    const infoItems = items.map(item => (
        <InfoItem title={item.title} contentArray={item.content} />
    ));

    return(
        <div className={classes.root}>
            { infoItems }
        </div>
    );
}
export default withStyles(styles)(CandidateInfo);
