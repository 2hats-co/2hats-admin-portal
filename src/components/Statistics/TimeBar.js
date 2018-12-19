import React,{useState,useEffect} from 'react'
import PropTypes from "prop-types";
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from "@material-ui/core/Grid";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";


import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';

import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import { DatePicker } from 'material-ui-pickers';
import moment from 'moment';
import NativeSelect from '@material-ui/core/NativeSelect';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {useWindowSize} from '../../hooks/useWindowSize'

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

    '& + &': { borderLeft: `1px solid ${theme.palette.divider}` },
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
function TimeBar(props) {
  const { classes, format, changeHandler} = props;
  const windowSize = useWindowSize();
  const [range,setRange] = useState({type:'custom'})
  const [stepSize,setStepSize] = useState(24)
  const [start,setStart] = useState(moment().startOf('day').subtract(2, 'weeks'))
  const [end,setEnd] = useState(moment().startOf('hour'))

  useEffect(()=>{
    changeHandler('range',{start:start.unix(),end:end.unix()})
  },[start,end])
  
  useEffect(()=>{
    console.log('stepSize',stepSize)
    switch (stepSize) {
      case '1':console.log('format',{stepSize:1,label:'ha ddd'})
      changeHandler('format',{stepSize:1,label:'ha ddd'})
        break;
      case '24':changeHandler('format',{stepSize:24,
          label:'Do MM'})
          break;
      case '168':changeHandler('format',{stepSize:24*7,
            label:'Do MM'})
            break;
    
      default:console.log('defualt',stepSize)
        break;
    }
  
  },[stepSize])
  
  useEffect(()=>{
    switch (range.type) {
              case 'week':
              changeHandler('range',{start:moment().startOf('day').subtract(1, 'weeks').unix(),end:moment().startOf('hour').unix()})
              break;
              case 'month':
              changeHandler('range',{start:moment().startOf('day').subtract(1, 'months').unix(),end:moment().startOf('hour').unix()})
              break;
              case 'quarter':
              changeHandler('range',{start:moment().startOf('day').subtract(3, 'months').unix(),end:moment().startOf('hour').unix()})
              break;
              default:
              changeHandler('range',{start:start.unix(),end:end.unix()})
                  break;
          }

  },[range])    
        return (
          <Grid container className={classes.root}>
            <Grid item className={classes.toggleContainer}>
            {windowSize.isMobile ?  <NativeSelect
            value={range.type} onChange={(e)=>{
              setRange({type:e.target.value})}}
            input={<OutlinedInput name="Range" id="range-native-label-placeholder" />}
          >
            <option value="week">Past week</option>
            <option value="month">past month</option>
            <option value="quarter">past quarter</option>
          </NativeSelect>: <React.Fragment> <ToggleButtonGroup
                  value={range.type}
                  exclusive
                  onChange={(e,v)=>{setRange({type:v})}}
                >
                  <ToggleButton classes={{label:classes.toggleButtonLabel}} value="week">Past week</ToggleButton>
                  <ToggleButton classes={{label:classes.toggleButtonLabel}} value="month">past month</ToggleButton>
                  <ToggleButton classes={{label:classes.toggleButtonLabel}} value="quarter">past quarter</ToggleButton>
                  <ToggleButton classes={{label:classes.toggleButtonLabel}} value="custom">custom</ToggleButton>
                </ToggleButtonGroup>
                
                {range.type === 'custom' && <form className={classes.form} noValidate>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                      <DatePicker
                          label="From"
                          value={start}
                          onChange={dt => { setStart(dt)  }}
                          leftArrowIcon={<LeftIcon />}
                          rightArrowIcon={<RightIcon />}
                          showTodayButton
                          className={classes.datePicker}
                      />
                  </MuiPickersUtilsProvider>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                      <DatePicker
                          label="To"
                          value={end}
                          onChange={dt => { setEnd(dt) }}
                          leftArrowIcon={<LeftIcon />}
                          rightArrowIcon={<RightIcon />}
                          showTodayButton
                          className={classes.datePicker}
                      />
                  </MuiPickersUtilsProvider>
                </form>}</React.Fragment> }
           </Grid>
            <Grid item className={classes.toggleContainer}>
            {windowSize.isMobile ?  <NativeSelect
            value={stepSize} 
            onChange={(e,v)=>
              setStepSize(e.target.value)
            }
            input={<OutlinedInput name="format" id="format-label-placeholder" />}
          >
            <option value={1}>hourly</option>
            <option value={24}>daily</option>
            <option value={24*7}>weekly</option>
          </NativeSelect>:
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
                </ToggleButtonGroup>}
            </Grid>
          </Grid>
        );
      }
TimeBar.propTypes = {
  classes: PropTypes.object.isRequired
};
    
export default withStyles(styles)(TimeBar);
