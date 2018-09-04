import React,{Component} from 'react';
import { withStyles } from '@material-ui/core';

import InfoItem from './InfoItem';

const styles = theme => ({
    root: {
        padding: "10px 20px",
        borderRight: "1px solid rgba(43,48,52,.1)",
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
