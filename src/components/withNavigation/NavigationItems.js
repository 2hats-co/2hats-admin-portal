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
      route:ROUTES.candidates
  },{
    label:'Tasks',
    route:ROUTES.tasks
},{
    label:'Calendar',
    route:ROUTES.calendar
},{
    label:'Statistics',
    route:ROUTES.stats
},{
    label:'Templates',
    route:ROUTES.Templates
}]
function NavigationItems(props){
    const {classes,goTo} = props

    return(
       <Grid container className={classes.root}  direction='row' justify='space-between'>
           {navigationRoutes.map((x)=><Grid key={x.route} item onClick={()=>{
                goTo(x.route)
               }}>{x.label}</Grid>
           )}
       </Grid>
    )
}
export default withStyles(styles)(NavigationItems)