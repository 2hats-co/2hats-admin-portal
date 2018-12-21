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

import {firestore} from '../store'

import LocationIndicator from '../components/LocationIndicator';
import moment from 'moment'
import { momentLocales } from '../constants/momentLocales';
import { COLLECTIONS } from '../constants/firestore';

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
      zIndex: 12,
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
      const { classes, theme, uid } = props;
      const charts = useCharts(uid)
      const [layout,setLayout] = useState([])
      const [layoutShouldUpdate,setLayoutShouldUpdate] = useState(false)
      const [layoutLastUpdate,setLayoutLastUpdate] = useState(new Date().getTime())
      
      const [showDialog, setShowDialog] = useState(false)
      const [chartToEdit, setChartToEdit] = useState(null);
      const [range,setRange] = useState({
         start: moment().startOf('day').subtract(2, 'weeks').unix(),
        end: moment().startOf('hour').unix(),
      })
      const [format,setFormat] = useState(
        {
          stepSize: 24,
          label: 'DD/MM',
        })

      const handleSaveLayout=()=>{
        const now = new Date().getTime()
        const millsSinceLastUpdate = now - layoutLastUpdate
        console.log(millsSinceLastUpdate)
        if(layoutShouldUpdate && millsSinceLastUpdate > 2000){
          setLayoutLastUpdate(now)
          console.log('updating')
          layout.forEach((chartLayout)=>{
            let newLayout = {...chartLayout}
            delete newLayout.i
           firestore.collection(COLLECTIONS.admins).doc(uid).collection(COLLECTIONS.charts).doc(chartLayout.i).update({layout:newLayout}) 
          })
        }
        
      }
      useEffect(()=>{
        handleSaveLayout()
       // console.log('moved',layout)
      },[layout])

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
            <TimeBar format={format}
             range={range} 
             setFormat ={setFormat}
             setRange={setRange} />
             
          </React.Fragment></Slide>

          <Grid container className={classes.grid}>
            <ResponsiveGridLayout style={{width:'100%'}} className={classes.layout} 
            onLayoutChange={(layouts) =>{
              const newLayouts = layouts.map(layout=>({i:layout.i,x:layout.x,y:layout.y,w:layout.w,h:layout.h}))
              setLayout(newLayouts)
              setLayoutShouldUpdate(true)
            }
               // this.onLayoutChange(layout)
              }
              layout={layout}
              cols={12} rowHeight={100} width={1200}
            >
              {charts.map(chart => {
                let chartElement;
                switch (chart.type) {
                  case 'line':
                    chartElement = (<TrackerLineChart title={chart.title} key={chart.id} trackers={chart.trackers} range={range} format={format} layout={chart.layout} />)
                    break;
                  case 'bar':
                    chartElement = (<TrackerBarChart title={chart.title} key={chart.id} trackers={chart.trackers} range={range} format={format} layout={chart.layout} />)
                    break; 
                  case 'donut':
                    chartElement = (<TrackerDonutChart title={chart.title} key={chart.id} trackers={chart.trackers} queries={chart.queries} range={range} format={format} layout={chart.layout} />)
                    break;
                  case 'number':
                    chartElement = (<TrackerNumber title={chart.title} key={chart.id} trackers={chart.trackers}  queries={chart.queries} range={range} format={format} layout={chart.layout} />)
                    break;
                  case 'percentage':
                    chartElement = (<TrackerPercentage title={chart.title} key={chart.id} trackers={chart.trackers} queries={chart.queries} range={range} format={format} layout={chart.layout} />)
                    break;
                  case 'queryNumber':
                    chartElement = (<QueryNumber title={chart.title} query={chart.query} colour={chart.colour} layout={chart.layout} />)
                    break;
                  default:
                    chartElement = (<TrackerLineChart title={chart.title} key={chart.id} trackers={chart.trackers} range={range} format={format} layout={chart.layout} />)
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
