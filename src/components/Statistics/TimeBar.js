import React,{Component} from 'react'
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
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
        dateRange:'week'
        
      };
      componentDidMount(){
       this.handleRangeChange({target:{textContent:'past week'}})
      }
      handleRangeChange(e){
        const {changeHandler} = this.props
        let text = e.target.textContent.split(' ')
        const rangeType = text[text.length-1]
        this.setState({dateRange:rangeType})
        switch (rangeType) {
            case 'week':
            changeHandler('range',{start:moment().startOf('day').subtract(1, 'weeks').unix(),end:moment().startOf('hour').unix()})
            break;
            case 'month':
            changeHandler('range',{start:moment().startOf('day').subtract(1, 'months').unix(),end:moment().startOf('hour').unix()})
            break;
            default:
            changeHandler('range',{start:moment().startOf('day').subtract(2, 'weeks').unix(),end:moment().startOf('hour').unix()})
                break;
        }

    }
    
      render() {
        const { classes,format,changeHandler } = this.props;
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
        defaultValue={moment().subtract(2, 'weeks').format(DATE_FORMAT)}
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
                  value={format.stepSize}
                  exclusive
                  onChange={(t,v)=>changeHandler('format',v)}
                >
                  <ToggleButton value={{stepSize:1,
        label:'ha ddd'}}>hourly</ToggleButton>
                  <ToggleButton value={{stepSize:24,
        label:'Do MMM'}}>daily</ToggleButton>
                  <ToggleButton value={{stepSize:24*7,
        label:'Do MMM'}}>weekly</ToggleButton>
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
    