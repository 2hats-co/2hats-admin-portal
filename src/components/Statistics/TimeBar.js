import React,{Component} from 'react'
import PropTypes from "prop-types";
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from "@material-ui/core/Grid";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import TextField from '@material-ui/core/TextField';

import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';

import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import { DatePicker } from 'material-ui-pickers';
import moment from 'moment';

const styles = theme => ({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 'auto',
    height: 64,
    paddingTop: (64 - 32) / 2,
    paddingBottom: (64 - 32) / 2,
  },
  toggleContainer: {
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 0,
    background: '#fff',
    padding: '0 16px',

    '&:first-of-type': { borderRight: `1px solid ${theme.palette.divider}` },
  },
  form: {
    marginLeft: 20,
  },
  datePicker: {
    '& + &': { marginLeft: theme.spacing.unit },
  },
  toggleButtonLabel: {
    textTransform: 'capitalize',
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
        const { classes, format, changeHandler, fromDate, toDate } = this.props;
        const {dateRange} =this.state
        
        return (
          <Grid container className={classes.root}>
            <Grid item>
              <div className={classes.toggleContainer}>
                <ToggleButtonGroup
                  value={dateRange}
                  exclusive
                  onChange={this.handleRangeChange}
                >
                  <ToggleButton classes={{label:classes.toggleButtonLabel}} value="week">Past week</ToggleButton>
                  <ToggleButton classes={{label:classes.toggleButtonLabel}} value="month">past month</ToggleButton>
                  <ToggleButton classes={{label:classes.toggleButtonLabel}} value="custom">custom</ToggleButton>
                </ToggleButtonGroup>
                {dateRange === 'custom' && <form className={classes.form} noValidate>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                      <DatePicker
                          label="From"
                          value={fromDate}
                          onChange={dt => { changeHandler('from', dt.format(DATE_FORMAT)) }}
                          format="DD/MM/YYYY"
                          leftArrowIcon={<LeftIcon />}
                          rightArrowIcon={<RightIcon />}
                          showTodayButton
                          className={classes.datePicker}
                      />
                  </MuiPickersUtilsProvider>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                      <DatePicker
                          label="To"
                          value={toDate}
                          onChange={dt => { changeHandler('to', dt.format(DATE_FORMAT)) }}
                          format="DD/MM/YYYY"
                          leftArrowIcon={<LeftIcon />}
                          rightArrowIcon={<RightIcon />}
                          showTodayButton
                          className={classes.datePicker}
                      />
                  </MuiPickersUtilsProvider>
                </form>}
              </div>
           </Grid>
            <Grid item>
              <div className={classes.toggleContainer}>
                <ToggleButtonGroup
                  value={format.stepSize}
                  exclusive
                  onChange={(t,v)=>changeHandler('format',v)}
                >
                  <ToggleButton classes={{label:classes.toggleButtonLabel}} value={{stepSize:1,
        label:'ha ddd'}} selected={format.stepSize === 1}>hourly</ToggleButton>
                  <ToggleButton classes={{label:classes.toggleButtonLabel}} value={{stepSize:24,
        label:'Do MMM'}} selected={format.stepSize === 24}>daily</ToggleButton>
                  <ToggleButton classes={{label:classes.toggleButtonLabel}} value={{stepSize:24*7,
        label:'Do MMM'}} selected={format.stepSize === 24*7}>weekly</ToggleButton>
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
