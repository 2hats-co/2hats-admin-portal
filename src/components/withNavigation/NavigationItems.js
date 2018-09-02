import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'

import {ROUTES} from '../../constants/routes'

const styles = theme => ({
    root: {
        width:480
    }
  });
  
  const navigationRoutes = [{
      label:'Candidates',
      routes:ROUTES.candidates
  },{
    label:'Tasks',
    routes:ROUTES.tasks
},{
    label:'Calendar',
    routes:ROUTES.calendar
},{
    label:'Statistics',
    routes:ROUTES.stats
},{
    label:'Templates',
    routes:ROUTES.Templates
}]
function NavigationItems(props){
    const {classes,goTo} = props

    return(
       <Grid container className={classes.root}  direction='row' justify='space-between'>
           {navigationRoutes.map((x)=><Grid item onClick={()=>{
                goTo(x.routes)
               }}>{x.label}</Grid>
           )}
       </Grid>
    )
}
export default withStyles(styles)(NavigationItems)