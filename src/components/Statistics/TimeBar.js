import React,{Component} from 'react'
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import TextField from '@material-ui/core/TextField';
import moment from 'moment'
const styles = theme => ({
  toggleContainer: {
    height: 56,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: `${theme.spacing.unit}px 0`,
    background: theme.palette.background.default
  },textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },

});
const DATE_FORMAT = 'YYYY-MM-DD'
class TimeBar extends Component {
    constructor(){
        super()
        this.handleRangeChange = this.handleRangeChange.bind(this)
    }
    state = {
        dateRange:''
        
      };
    
      handleRangeChange(e){
          const {changeHandler} = this.props
          let text = e.target.textContent.split(' ')
        const rangeType = text[text.length-1]
        this.setState({dateRange:rangeType})
        switch (rangeType) {
            case 'week':
            changeHandler('from',moment().subtract(1, 'weeks').format(DATE_FORMAT))
            changeHandler('to',moment().format(DATE_FORMAT))
                break;
            case 'month':
            changeHandler('from',moment().subtract(1, 'months').format(DATE_FORMAT))
            changeHandler('to',moment().format(DATE_FORMAT))
                break;
            default:
            changeHandler('from',moment().subtract(3, 'months').format(DATE_FORMAT))
            changeHandler('to',moment().format(DATE_FORMAT))
                break;
        }

    }
    
      render() {
        const { classes,timeStep,changeHandler } = this.props;
        const {dateRange} =this.state
        
        return (
          <Grid container spacing={16}>
            <Grid item>
            <div className={classes.toggleContainer}>
                <ToggleButtonGroup
                  value={dateRange}
                  exclusive
                onChange={this.handleRangeChange}
                >
                  <ToggleButton value="week">Past week</ToggleButton>
                  <ToggleButton value="month">past month</ToggleButton>
                  <ToggleButton value="custom">custom</ToggleButton>
                </ToggleButtonGroup>
              </div>
           {dateRange === 'custom'&& <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="from"
        type="date"
        defaultValue={moment().subtract(3, 'months').format(DATE_FORMAT)}
        onChange={(e)=>{changeHandler('from',e.target.value)}}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}/>
       <TextField
        id="date"
        label="to"
        type="date"
        defaultValue={moment().format(DATE_FORMAT)}
        onChange={(e)=>{changeHandler('to',e.target.value)}}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}/>
           </form>}</Grid>
            <Grid item xs={12} sm={6}>
              <div className={classes.toggleContainer}>
                <ToggleButtonGroup
                  value={timeStep}
                  exclusive
                  onChange={(t)=>changeHandler('timeStep',t.target.textContent)}
                >
                  <ToggleButton value="hourly">hourly</ToggleButton>
                  <ToggleButton value="daily">daily</ToggleButton>
                  <ToggleButton value="weekly" disabled>weekly</ToggleButton>
                </ToggleButtonGroup>
              </div>
            </Grid>
          </Grid>
        );
      }
    }
    
    TimeBar.propTypes = {
      classes: PropTypes.object.isRequired
    };
    
    export default withStyles(styles)(TimeBar);
    