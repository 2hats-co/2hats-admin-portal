// import React, { Component } from 'react';

// import { withStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';

// import ReactEcharts from 'echarts-for-react';

// const styles = theme => ({
//     root: {
//         boxShadow: '0 6px 10px 1px rgba(87,87,87,0.15)',
//         borderRadius: 5,
//         margin: 20,
//         padding: 20,
//     },
//     bar: {
//         borderRadius: 5,
//         backgroundColor: '#E2E0E0',
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#FFF',
//         margin: '12px 0',
//         textAlign: 'right',
//         position: 'relative',
//         lineHeight: '30px',
//         paddingRight: 10,
//         boxSizing: 'border-box',
//     },
//     barValue: {
//         borderRadius: 5,
//         backgroundImage: 'linear-gradient(to right, rgb(255,200,0) 0%, rgb(241,90,41) 100%)',
//         position: 'absolute',
//         paddingRight: 10,
//     },
// });

// class StatsCard extends Component {
//     constructor(props){
//         super(props)
        
//         this.state = {
//             //
//         };
//     }

//     render(){
//         const { classes, heading, analyticsButtons, chart, bar, chartOptions, value, goal ,chartHeight} = this.props;
//         return(
//             <div className={classes.root}>
//                 <Typography variant="headline" style={{textTransform:'uppercase'}}>{heading}</Typography>
//                 <Grid container>
//                     <Grid item xs>
//                         { chart ?
//                             <ReactEcharts theme="light" style={{height:chartHeight||300}} option={{
//                                 title: { show: false },
//                                 color: ['#BB61CD','#36A4F4','#FC875E','#C33238'],
                              
//                                 ...chartOptions
//                             }} />
//                             : null
//                         }
//                         { bar ?
//                             <div className={classes.bar}>
//                                 <div
//                                     className={classes.barValue}
//                                     style={{width:`${value / goal * 100}%`}}
//                                 >{ value.toLocaleString('en') }</div>
//                                 { goal.toLocaleString('en') } goal
//                             </div>
//                             : null
//                         }
//                     </Grid>
                  
//                 </Grid>
//                 <Grid container spacing={8}>
//                 {analyticsButtons}
//                 </Grid>
//             </div>
//         );
//     }
// }

// export default withStyles(styles)(StatsCard);
