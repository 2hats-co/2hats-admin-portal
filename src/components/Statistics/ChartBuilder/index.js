import React,{Component} from 'react';
import { COLLECTIONS} from "../../../constants/firestore";
import { compose } from "redux";
import { withHandlers } from "recompose";
import { withFirestore } from "../../../utilities/withFirestore";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TrackerField from './TrackerField';
import ChartTypePicker from './ChartTypePicker';
import { FormControl,Select,MenuItem,InputLabel,Input} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import AddCirlceIcon from '@material-ui/icons/AddCircleOutline'
import IconButton from '@material-ui/core/IconButton'
const styles = theme => ({
  root: {
   
  },
  formControl:{
      //minWidth :80
  },
  formContent: {
    minHeight:400
  },
  addButton:{
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    zIndex: 99,
  }
});
function getRandomColor() {
  var length = 6;
  var chars = '0123456789ABCDEF';
  var hex = '#';
  while(length--) hex += chars[(Math.random() * 16) | 0];
  return hex;
}
function getRandomId(){
  return Math.random().toString(36).substring(7)
}
class ChartBuilder extends Component {
    state = {
        open: false,
        chartWidth:6,
        trackers:[]
      };
      
      componentDidUpdate(prevProps, prevState) {
        const {chart} = this.props
        if(chart&& chart!==prevProps.chart){
          this.setState({
            open:true,
            chartId:chart.id,
            chartWidth:chart.width,
            chartType:chart.type,
            trackers:chart.trackers,
            title:chart.title
          })
        }
      }
      handleClickOpen = () => {
        this.setState({ open: true,
          chartId:null,
          chartWidth:6,
          chartType:null,
          trackers:[],
          title:null});
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };
      handleUpdate = () => {
        const {title,trackers,chartWidth,chartType,chartId} = this.state
        this.props.updateChart(chartId,{title,trackers,width:chartWidth,type:chartType})
        this.handleClose()
      };
      handleAdd = () => {
        const {title,trackers,chartWidth,chartType} = this.state
        this.props.addChart({title,trackers,width:chartWidth,type:chartType})
        this.handleClose()
      };
      handleChartTypePicker = (e,v) =>{

        this.setState({chartType:v})
      }
      addTracker = () =>{
        let trackers = this.state.trackers.splice(0)
          trackers.push({id:`${trackers.length}${getRandomId()}`,colour:getRandomColor()})
          this.setState({trackers})
      }
      removeTracker =(id) =>{
        let trackers = this.state.trackers.filter(tracker=> tracker.id !== id)
          this.setState({trackers})
      }
      updateTracker = (updatedtracker) =>{
        let trackers = this.state.trackers.filter(tracker=> tracker.id !== updatedtracker.id)
        trackers.push(updatedtracker)
        let sortedTracker = trackers.sort((a, b) => a.id.localeCompare(b.id));
        this.setState({trackers:sortedTracker})
      }
      handleChartDelete = ()=>{
        this.props.deleteChart(this.state.chartId)
        this.handleClose()
      }
      handleChange = event => {
          this.setState({[event.target.name]:event.target.value})
      }
      disablePrimaryAction = ()=>{
        const {title,chartWidth,trackers,chartType} =this.state
        if(title&&chartWidth&&chartType&&trackers.length !==0){
          let disabled = false
          trackers.forEach(x=>{
            if(!x.colour||!x.label||!x.name||!x.type){
            disabled = true
          }})
          return disabled
        }else{
          return true
        }
      }
     
      render() {
        const {chart,classes} = this.props
        const {chartType,trackers,chartWidth,title,chartId} = this.state
        
        return (
          <div>
            <Button variant="fab" className={classes.addButton} onClick={this.handleClickOpen} color='primary'>
              <AddIcon/>
            </Button>
            <Dialog className={classes.root}
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <Grid container><DialogTitle id="form-dialog-title">{chart?`Edit ${chart.title}`:'Create new chart'}</DialogTitle>
        {chartId&&<Button onClick={this.handleChartDelete}>DELETE</Button>}</Grid>
              <DialogContent className={classes.formContent}>
                <DialogContentText>
                  To create a new chart enter the title, set the width ,type of chart, then add the trackers
                </DialogContentText>
                <Grid container alignItems='flex-end'>
                <Grid item sm={5}>
                <ChartTypePicker type={chartType} changeHandler={this.handleChartTypePicker}/>
                </Grid>

                <Grid item sm={5}>
                  <TextField
                  onChange={this.handleChange}
                  autoFocus
                  margin="dense"
                  id="title"
                  value={title}
                  name="title"
                  label="Chart Title"
                  type="text"
                /></Grid>
                
               

                <Grid item sm={2}>
                <FormControl //className={classes.formControl}
                >
              <InputLabel htmlFor="tracker-type-selector">width</InputLabel>
              <Select
                value={chartWidth}
                 onChange={this.handleChange}
                input={<Input name="chartWidth" id="chartWidth" />}
              >
                <MenuItem value="">
                  <em>set width</em>
                </MenuItem> {[3,6,9,12].map(x=><MenuItem value={x}>{x}</MenuItem>)}
              </Select>
            </FormControl>
                </Grid>

                </Grid>
                
                {trackers.map(tracker=><TrackerField key={tracker.id} tracker={tracker} handleDelete={this.removeTracker} handleUpdate={this.updateTracker}/>)}
             
                <IconButton aria-label="Configure" //className={classes.button}
              onClick={this.addTracker}
                >
          <AddCirlceIcon fontSize="large" />
        </IconButton>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={chartId? this.handleUpdate:this.handleAdd} disabled={this.disablePrimaryAction()} color="primary">
                {chartId?`Update`:'Add'}
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
      }
}
const enhance = compose(
    // add redux store (from react context) as a prop
    withFirestore,
    // Handler functions as props
    withHandlers({
        updateChart: props => (chartId,chart) =>
      props.firestore.update(
        { collection: COLLECTIONS.admins, doc: props.uid ,subcollections:[{collection:COLLECTIONS.charts,doc:chartId}]},
        {   
          ...chart
        }
      ),
      deleteChart: props => (chartId) =>
      props.firestore.delete({ collection: COLLECTIONS.admins, doc: props.uid ,subcollections:[{collection:COLLECTIONS.charts,doc:chartId}]}),
      addChart: props => (chart) =>
      props.firestore.add(
        { collection: COLLECTIONS.admins, doc: props.uid ,subcollections:[{collection:COLLECTIONS.charts}]},
        {   
            ...chart
        }
      ),
    }),
  );
  export default enhance(
      compose(  
        withStyles(styles)(ChartBuilder)
      )
  );
