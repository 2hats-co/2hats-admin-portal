import moment from 'moment'
import * as _ from 'lodash'
import { firestore } from '../../store';

const secondsInHour = 3600
const firstMonth = 2324
const getTrackerDocs = (tracker,range)=>{
  //TODO:read only relavent month docs
  return new Promise(function (fulfilled, rejected) {
    const trackerCollection = firestore.collection("eventTrackers")
    const trackerRef = trackerCollection.doc(tracker.type).collection(tracker.name);
    let docsData =[]
    let query = trackerRef.get()
    .then(snapshot => {
    snapshot.forEach((doc,index) => {
      let data = doc.data()
      docsData.push(data)
      if(docsData.length === snapshot.docs.length){
        fulfilled(docsData)
      }
     });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  }); 
})
}

const hourFiller = (hourlyData,range) =>{
 
  const totalHoursRange =  (range.end - range.start)/secondsInHour
  const filledHours = []
  for (let index = 0; index < totalHoursRange+1; index++) {
    const currentHour = range.start+index*secondsInHour
    let hourData = hourlyData.filter(x=> parseInt(x.timeStamp) === currentHour)
    if(hourData[0]){
      filledHours.push({value:hourData[0].value,timeStamp:parseInt(hourData[0].timeStamp)})
    }else{
      filledHours.push({value:0,timeStamp:currentHour})
    }
  }
  return filledHours
}
const hourlyDataExtractor = (data) =>{
  let hourlyData = []
  data.forEach(month=>{
    const hourly = month.hourly
    _.forEach(hourly,(value,timeStamp)=>{

      hourlyData.push({value,timeStamp})
    })
  })
  return hourlyData
}

const DataSplitter = (trimmedData,hoursStep) => {
  const splitData = []
  while (trimmedData.length) {
    splitData.push(trimmedData.splice(0, hoursStep));
  }
  
    return splitData
} 

const dataTrimmer = (hourlyData,startTimeStamp,endTimeStamp) =>{
  return hourlyData.filter(x=> x.timeStamp >= startTimeStamp && x.timeStamp <= endTimeStamp)
}
const hourlyReducer = (accumulator, currentValue) => accumulator + currentValue;
const dataCombiner = (splitHourlydata) =>{
  const timeStamp = splitHourlydata[0].timeStamp
  const values = splitHourlydata.map(x=>x.value)
  const value = values.reduce(hourlyReducer)
 return {timeStamp,value}
}

const timeStampLabeler = (data,labelFormat)=>{
  return data.map(x=>({
    label:moment(x.timeStamp*1000).format(labelFormat),
    value:x.value
  }))
}


export const getTrackerLineData = async(tracker,range,format) =>{
  const data = await getTrackerDocs(tracker,range)//gets monthly data from firestore
  const hourlyData = hourlyDataExtractor(data) //combines firestore  data into single hourly Array
  const normalisedHourlyData = hourFiller(hourlyData,range) // add in inactive hours,to make consistant data 
  const trimmedData = dataTrimmer(normalisedHourlyData,range.start,range.end)// cuts the array to only the requested time range
  const splitData = DataSplitter(trimmedData,format.stepSize)//split the hourly data into equal portions,eg. stepSize 24, for splitting data into days
  const combinedData = splitData.map(x=>dataCombiner(x))//Sum the values of each group of points
  const labeledData = timeStampLabeler(combinedData,format.label)//replaces the unix timestamp with readable fromate
  return labeledData
}

export const getTrackerSum = async(tracker,range) =>{
  const data = await getTrackerDocs(tracker,range)//gets monthly data from firestore
  const hourlyData = hourlyDataExtractor(data) //combines firestore hourly data into single hourly Array
  const trimmedData = dataTrimmer(hourlyData,range.start,range.end)// cuts the array to only the requested time range
  const combinedData = dataCombiner(trimmedData)//Sum the values of all points
  return combinedData.value
}
