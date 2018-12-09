import React,{Component} from 'react'
import PropTypes from "prop-types";
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from "@material-ui/core/Grid";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import TextField from '@material-ui/core/TextField';
import moment from 'moment'
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
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 0,
    background: '#fff',
    padding: '0 16px',
  },
  form: {
    marginLeft: 20,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150,
  },
  textFieldInput: {
    '& input': {
      fontSize: 14,
    }
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
        const { classes,format,changeHandler } = this.props;
        const {dateRange} =this.state
        
        return (
          <Grid container className={classes.root}>
            <Grid item>
              <div className={classes.toggleContainer} style={{borderRight:'1px solid #ddd'}}>
                <ToggleButtonGroup
                  value={dateRange}
                  exclusive
                  onChange={this.handleRangeChange}
                  style={{boxShadow: 'none'}}
                >
                  <ToggleButton classes={{label:classes.toggleButtonLabel}} value="week">Past week</ToggleButton>
                  <ToggleButton classes={{label:classes.toggleButtonLabel}} value="month">past month</ToggleButton>
                  <ToggleButton classes={{label:classes.toggleButtonLabel}} value="custom">custom</ToggleButton>
                </ToggleButtonGroup>
                {dateRange === 'custom' && <form className={classes.form} noValidate>
                  <TextField
                    id="date"
                    label="from"
                    type="date"
                    defaultValue={moment().subtract(2, 'weeks').format(DATE_FORMAT)}
                    onChange={(e)=>{changeHandler('from',e.target.value)}}
                    className={classes.textField}
                    classes={{root: classes.textFieldInput}}
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
                    classes={{root: classes.textFieldInput}}
                    InputLabelProps={{
                      shrink: true,
                    }}/>
                </form>}
              </div>
           </Grid>
            <Grid item>
              <div className={classes.toggleContainer}>
                <ToggleButtonGroup
                  value={format.stepSize}
                  exclusive
                  onChange={(t,v)=>changeHandler('format',v)}
                  style={{boxShadow: 'none'}}
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
