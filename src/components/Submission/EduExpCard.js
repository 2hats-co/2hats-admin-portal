import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";


import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
  root:{
  width:'100%'
  },
  card:{  
    width:'calc(100%0)',
    paddingTop: 35,
    paddingBottom: 30, 
    marginBottom:20,
    [theme.breakpoints.up('xs')]: {
      paddingLeft:30,
      paddingRight:30,
    },
    [theme.breakpoints.up('sm')]: {
    paddingLeft:40,
    paddingRight:40,
    },[theme.breakpoints.up('md')]: {
      paddingLeft:50,
      paddingRight:50,
      },
    
  },
});
function EduExpCard(props) {
  const {classes, title, key, label, description, startDate, endDate} = props;
  return (
    <div key ={key} className={classes.root}>
    <Card elevation={2} className={classes.card}>
      <Grid container 
      direction="column" 
      alignItems="flex-start" 
      spacing={16}>
      <Grid container 
      direction="row" 
      alignItems="center" 
      justify="space-between"
      style={{minHeight:48}}>
          <Grid item xs={8} sm={9}>
          <Typography variant='subheading' style={{paddingTop:5}}>{title}</Typography>
          </Grid>
        </Grid>
        <Grid container direction="row" alignItems="center" justify="space-between">
            <Grid item xs={7} sm={8}>
              <Typography variant="body1" style={{fontWeight:700}}>{label}</Typography>
            </Grid>
            <Grid item xs={5} sm={4}>
              <Typography variant="body1" 
              style={{textAlign:'right'}}>
                {startDate} - {endDate}
              </Typography>
            </Grid>
        </Grid>
        <Grid item xs={12} style={{paddingLeft:0,paddingRight:0}}>
        <Typography variant="body1" style={{whiteSpace:'pre-wrap'}}>{description}</Typography>
        </Grid>
      </Grid>
    </Card>
    </div>
  );
}

EduExpCard.propTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.string,
  default: PropTypes.string,
  placeholder: PropTypes.string,
  numberOfLines: PropTypes.number,
  characterLimit: PropTypes.number,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EduExpCard);
