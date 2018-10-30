import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
function FeedbackElement(props) {
    const {id,title,labels,value,handleFeedbackItem} = props
    return (
    <Grid container direction='column'>
        <Grid item>
        <Typography>{title}</Typography>
        </Grid>
        <Grid item>
            <Grid container direction='row' justify='space-between' alignItems='center'>
                <Grid item>
                    <Grid container direction='row' justify='space-around'>
                   {[1,2,3].map(x=><FormControlLabel
                            control={
                                <Checkbox onChange={()=>{handleFeedbackItem(id,x)}} icon={<StarBorder />} checked={x-1<value} checkedIcon={<Star />} value={x} />
                            }/>)}
                    </Grid>
                </Grid>
                <Grid item>
                <Typography>{labels[value]}</Typography>
                </Grid>
            </Grid>
        </Grid>
    </Grid>)
}
export default FeedbackElement