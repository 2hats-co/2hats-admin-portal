import React,{Component} from 'react';
import { COLLECTIONS} from "../../../constants/firestore";
import { compose } from "redux";
import { withHandlers } from "recompose";
import { withFirestore } from "../../../utilities/withFirestore";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TrackerField from './TrackerField';
import ChartTypePicker from './ChartTypePicker';
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import AddCirlceIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
const styles = theme => ({
  root: {

  },
  chartConfig: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 2,
    borderBottom: '1px solid #ddd',
    '& > div:not(:last-of-type)': {
      marginRight: 18,
    },
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
    right: theme.spacing.unit * 8,
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
        const {title,trackers,chartType,chartId} = this.state
        this.props.updateChart(chartId,{title,trackers,type:chartType})
        this.handleClose()
      };
      handleAdd = () => {
        const {title,trackers,chartWidth,chartType} = this.state
        this.props.addChart({title,trackers,layout:{x:0,y:0,w:chartWidth,h:4},type:chartType})
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
        const {chartType,trackers,title,chartId} = this.state
        
        return (
          <div>
            <Fab className={classes.addButton} onClick={this.handleClickOpen}>
              <AddIcon/>
            </Fab>
            <Dialog className={classes.root}
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <Grid container alignItems="center">
                <Grid item xs>
                  <DialogTitle id="form-dialog-title">
                    {chart?`Edit ${chart.title}`:'New chart'}
                  </DialogTitle>
                </Grid>
                {chartId &&
                  <IconButton onClick={this.handleChartDelete} style={{marginRight:8}}>
                    <DeleteIcon />
                  </IconButton>
                }
              </Grid>
              <DialogContent className={classes.formContent}>
                <DialogContentText>
                  Choose a chart type, set the title and width, then add trackers
                </DialogContentText>
                <Grid container alignItems="center" className={classes.chartConfig}>
                  <Grid item xs={7}>
                    <Typography variant="caption">Chart Type</Typography>
                      <ChartTypePicker
                        type={chartType}
                        changeHandler={this.handleChartTypePicker}
                      />
                  </Grid>
                  <Grid item xs={4}>
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

                </Grid>

                <Button aria-label="Add Tracker"
                  onClick={this.addTracker}
                  color="primary"
                  style={{padding: '8px 12px'}}
                >
                  <AddCirlceIcon style={{marginRight:8}} />
                  Add Tracker
                </Button>
                
                { trackers.map( tracker =>
                  <TrackerField
                    key={tracker.id}
                    tracker={tracker}
                    handleDelete={this.removeTracker}
                    handleUpdate={this.updateTracker}/>
                  )
                }
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
