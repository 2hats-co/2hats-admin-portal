import React, { useEffect,useState } from 'react';
import { withNavigation } from '../components/withNavigation';
import TimeBar from '../components/Statistics/TimeBar';
import  useCharts from "../hooks/useCharts";

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';

import ChartEditor from '../components/Statistics/ChartEditor';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import TrackerLineChart from '../components/Statistics/TrackerLineChart'
import TrackerBarChart from '../components/Statistics/TrackerBarChart'
import TrackerDonutChart from '../components/Statistics/TrackerDonutChart'
import TrackerNumber from '../components/Statistics/TrackerNumber'
import QueryNumber from '../components/Statistics/QueryNumber'
import TrackerPercentage from '../components/Statistics/TrackerPercentage'

import GridLayout from 'react-grid-layout';
import { WidthProvider } from 'react-grid-layout';
import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';

import SaveIcon from '@material-ui/icons/Save';
import LocationIndicator from '../components/LocationIndicator';
import moment from 'moment'
import { momentLocales } from '../constants/momentLocales';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100vh',
  },
  grid: {
    width: '100%',
    height: 'calc(100vh - 64px)',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  saveButton: {
    position: 'absolute',
    top: 64 + 16,
    right: 8 * 2,
    zIndex: 99,
  },
  layout: {
    '& .react-grid-placeholder': {
      backgroundColor: `${theme.palette.primary.main} !important`,
      borderRadius: theme.shape.borderRadius,
    },
  },
  card: {
    background: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    // border: `1px solid ${theme.palette.divider}`,
    // padding: theme.spacing.unit,
    overflow: 'hidden',
    transition: 'border-radius .2s',

    '& .edit-chart-button': {
      opacity: 0,
      transition: 'opacity .2s',
      position: 'absolute',
      top: 0,
      right: 0,
      zIndex: 98,
      color: 'inherit',
    },
    '&:hover .edit-chart-button': { opacity: .67 },

    '& .react-resizable-handle': {
      opacity: 0,
      '&::after': { borderColor: 'inherit !important' },
    },
    '&:hover .react-resizable-handle': { opacity: .67 },

    '&:hover': { borderBottomRightRadius: 0 },
  },
  addButton: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    zIndex: 99,
  },
});

const ResponsiveGridLayout = WidthProvider(GridLayout);
function StatisticsContainer(props) {
  moment.updateLocale('en', momentLocales);
  /*
    constructor(props) {
      super(props);
      this.state = { 
        from: moment().subtract(2, 'weeks'),
        to: moment(),
        range: {
          start: 1540897200,
          end: 1541714400,
        },
        format: {
          stepSize: 24,
          label: 'Do MMM',
        },
        layout: [],
        showDialog: true,
     }
     moment.updateLocale('en', momentLocales);
    }
    
    componentDidUpdate(prevProps){
      const {chartsConfig} = this.props
      if(!prevProps.chartsConfig && chartsConfig !== prevProps.chartsConfig){
        const layout = chartsConfig.map((chart,i)=>({i:chart.id,x:chart.layout.x||i,
          y:chart.layout.y||0,
          w:chart.layout.w,
          h:chart.layout.h||7}))
        this.setState({layout})
      }
    }

    componentDidMount(){
      const {chartsConfig} = this.props
      if(chartsConfig){
        const layout = chartsConfig.map((chart,i)=>({i:chart.id,x:chart.layout.x||i,
          y:chart.layout.y||0,
          w:chart.layout.w,
          h:chart.layout.h||7}))
        this.setState({layout})
      }
    }
    onLayoutChange=(layout)=> {
      this.setState({layout})
    }
    
    handleSaveLayout=()=>{
      const {layout} = this.state
      const charts = layout.map((chart)=>{
      const chartId = chart.i
       const config = {x:chart.x,y:chart.y,w:chart.w,h:chart.h}
        return ({chartId,config})
      })
      charts.forEach((chart)=>{
       this.props.updateChart(chart.chartId,{layout:chart.config}) 
      })
    }

    setShowDialog = (val) => {
      this.setState({ showDialog: val });
    }
    */
   const handleChange =(name, value)=> {
    console.log(name, value)
    //this.setState({[name]:value })
  }
    
      
      const { classes, theme, uid } = props;
      const charts = useCharts(uid)
      const [layout,setLayout] = useState([])
      const [showDialog, setShowDialog] = useState(false)
      const [range,setRange] = useState({
         start: moment().startOf('day').subtract(2, 'weeks').unix(),
        end: moment().startOf('hour').unix(),
      })
      const [format,setFormat] = useState(
        {
          stepSize: 24,
          label: 'DD/MM',
        })

      const [chartToEdit, setChartToEdit] = useState(null);
      
      useEffect(()=>{
        console.log('charts',charts)
       if(charts){
         const layout = charts.map((chart)=>({i:chart.id,x:chart.layout.x,
          y:chart.layout.y,
          w:chart.layout.w,
          h:chart.layout.h}))
          console.log('layout',layout)
        setLayout(layout)
        }
      },[charts])
       
  
      if(charts){
        return (
        <div className={classes.root}>

          <ChartEditor
            uid={uid}
            showDialog={showDialog}
            setShowDialog={setShowDialog}
            chartToEdit={chartToEdit}
            setChartToEdit={setChartToEdit}
          />

          <Fab
            className={classes.addButton}
            color="primary"
              onClick={() => { setShowDialog(true) }}
          >
              <AddIcon/>
          </Fab>

          <Slide in direction="down"><React.Fragment>
            <LocationIndicator title="Statistics" showBorder />
            <TimeBar format={format} changeHandler={handleChange}
             range={range} 
             setFormat ={setFormat}
             setRange={setRange} />
             
          </React.Fragment></Slide>

          <Grid container className={classes.grid}>
            <ResponsiveGridLayout style={{width:'100%'}} className={classes.layout} 
            //  onLayoutChange={(layout) =>this.onLayoutChange(layout)}
              layout={layout}
              cols={12} rowHeight={120} width={1200}
            >
              {charts.map(chart => {
                let chartElement;
                switch (chart.type) {
                  case 'line':
                    chartElement = (<TrackerLineChart title={chart.title} key={chart.id} trackers={chart.trackers} range={range} format={format}/>)
                    break;
                  case 'bar':
                    chartElement = (<TrackerBarChart title={chart.title} key={chart.id} trackers={chart.trackers} range={range} format={format}/>)
                    break; 
                  case 'donut':
                    chartElement = (<TrackerDonutChart title={chart.title} key={chart.id} trackers={chart.trackers} queries={chart.queries} range={range} format={format}/>)
                    break;
                  case 'number':
                    chartElement = (<TrackerNumber title={chart.title} key={chart.id} trackers={chart.trackers}  queries={chart.queries} range={range} format={format}/>)
                    break;
                  case 'percentage':
                    chartElement = (<TrackerPercentage title={chart.title} key={chart.id} trackers={chart.trackers} queries={chart.queries} range={range} format={format}/>)
                    break;
                  case 'queryNumber':
                    chartElement = (<QueryNumber title={chart.title} query={chart.query} colour={chart.colour}/>)
                    break;
                  default:
                    chartElement = (<TrackerLineChart title={chart.title} key={chart.id} trackers={chart.trackers} range={range} format={format}/>)
                    break;
                }
                return(
                  <Grid item
                    key={chart.id}
                    className={classes.card}
                    style={chart.type === 'number' || chart.type === 'percentage' || chart.type === 'queryNumber' ?
                      { color: theme.palette.getContrastText(chart.trackers && chart.trackers.length > 0 && chart.trackers[0].colour || chart.queries && chart.queries.length > 0 && chart.queries[0].colour || chart.colour) }
                    : null}
                  >
                    <IconButton aria-label="Configure" //className={classes.button}
                      onClick={() => { setChartToEdit(chart); setShowDialog(true) }}
                      className="edit-chart-button"
                    >
                      <EditIcon />
                    </IconButton>
                    {chartElement}
                  </Grid>
                )
              })}
            </ResponsiveGridLayout>
          </Grid>
        </div>)
        } else {
          return(
            <Grid container className={classes.root} justify="center" alignItems="center">
              <CircularProgress size={64} />
            </Grid>
          )
        }
}


export default withNavigation(withStyles(styles, { withTheme:true })(StatisticsContainer));
