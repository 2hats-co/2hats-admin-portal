import React, { useEffect, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getTrackerLineData } from '../../utilities/analytics/index'

import { CLOUD_FUNCTIONS, callable } from '../../firebase/functions';
import { idealTextColor } from '../../utilities';

// This function takes a component...
function withAnalytics(WrappedComponent) {
    // ...and returns another component...
    return function WithAnalytics(props){
        const { queries, trackers, range, format, title } = props
        const queriesToLoad =( queries ? queries.length : 0)
        const tackersToLoad = ( trackers ? trackers.length : 0)
        const [isLoading,setIsLoading] = useState(true)
        let loadedData = []
        const [data,setData] = useState([])
        const updateData = (dataToAdd) =>{
            loadedData = loadedData.concat(dataToAdd)
            if(loadedData.length === (queriesToLoad+tackersToLoad)){
                // console.log('finished',loadedData)
                setData(loadedData)
                setIsLoading(false)
            }
            // console.log('data',data)
        }
        useEffect(() => {
            if (queries) {
                queries.forEach(query=>
                    {callable(
                            CLOUD_FUNCTIONS.stats,
                             { filters:query.filters, collection:query.collection },
                            o => {
                                updateData([{...query, sum:o.data.value,data:[]}])
                                },
                            e => console.log("fail", e)
                          );
                    }
                    )
            }
        }, [queries]);
        useEffect(()=>{
            if(trackers){
                const trackerPromises = trackers.map(async (x) => {
                    let trackerData = await getTrackerLineData(x, range, format)
                    const tracker = Object.assign({
                        data: trackerData.labeledData,
                        sum: trackerData.sum
                    }, x)
                    return (tracker)
                })
                Promise.all(trackerPromises).then(function (updatedTrackers) {
                    updateData(updatedTrackers)
            
                })
            }
        },[trackers]);

        const mainColor = trackers && trackers.length > 0 && trackers[0].colour || queries && queries.length > 0 && queries[0].colour;

        if (isLoading) return (
            <Grid container justify="center" alignItems="center" style={{
                height: '100%',
                backgroundColor: mainColor,
            }}>
                <CircularProgress style={{ color: idealTextColor(mainColor) }} />
            </Grid>
        );
        else return <WrappedComponent trackers={data} title={props.title}/>;
    }
};
export default withAnalytics;
