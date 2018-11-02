import React from 'react';
import { Grid, Typography, withStyles } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import Star from '@material-ui/icons/Star';

const styles = theme => ({
    descriptionTooltip: {
        background: theme.palette.common.white,
        color: theme.palette.text.primary,
        fontSize: 14,
        boxShadow: theme.shadows[1],
        opacity: 1,
        padding: 16,
    }
})

function FeedbackElement(props) {
    const {classes,id,title,labels,value,handleFeedbackItem,contents} = props

    return (
    <Grid container direction='column'>
        <Grid item>
        <Typography style={{fontWeight: 500}}>{title}</Typography>
        </Grid>
        <Grid item>
            <Grid container direction='row' justify='space-between' alignItems='center'>
                <Grid item>
                    <Grid container direction='row' justify='space-around'>
                   {[1,2,3].map((x, i) => <FormControlLabel key={i} style={{marginRight: 6}}
                            control={<Tooltip title={contents[x]} placement="top" classes={{tooltip: classes.descriptionTooltip}}>
                                            <Checkbox
                                            onChange={()=>{handleFeedbackItem(id,x)}}
                                            icon={<Star style={{fontSize:40, opacity:.34}} />}
                                            checked={x-1<value}
                                            checkedIcon={<Star style={{fontSize:40}} />}
                                            value={x.toString()}
                                            />
                                    </Tooltip>}/>)}
                    </Grid>
                </Grid>
                <Grid item>
                <Typography>{labels[value]}</Typography>
                </Grid>
            </Grid>
        </Grid>
    </Grid>)
}
export default withStyles(styles)(FeedbackElement)
