import React, { useEffect, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getTrackerLineData } from '../../utilities/analytics/index';

import { CLOUD_FUNCTIONS, callable } from '../../firebase/functions';
import { idealTextColor } from '../../utilities';

// This function takes a component...
function withAnalytics(WrappedComponent) {
  // ...and returns another component...
  return function WithAnalytics(props) {
    const { queries, trackers, range, format } = props;
    const queriesToLoad = queries ? queries.length : 0;
    const tackersToLoad = trackers ? trackers.length : 0;
    const [isLoading, setIsLoading] = useState(true);
    let loadedData = [];
    const [data, setData] = useState([]);
    const updateData = dataToAdd => {
      loadedData = loadedData.concat(dataToAdd);
      if (loadedData.length === queriesToLoad + tackersToLoad) {
        setData(loadedData);
        setIsLoading(false);
      }
    };
    const loadQueries = queries => {
      if (queries) {
        queries.forEach(query => {
          callable(
            CLOUD_FUNCTIONS.stats,
            { filters: query.filters, collection: query.collection },
            o => {
              updateData([{ ...query, sum: o.data.value, data: [] }]);
            },
            e => console.log('fail', e)
          );
        });
      }
    };

    const loadTrackers = trackers => {
      if (trackers) {
        const trackerPromises = trackers.map(async x => {
          let trackerData = await getTrackerLineData(x, range, format);
          const tracker = Object.assign(
            {
              data: trackerData.labeledData,
              sum: trackerData.sum,
            },
            x
          );
          return tracker;
        });
        Promise.all(trackerPromises).then(function(updatedTrackers) {
          updateData(updatedTrackers);
        });
      }
    };
    useEffect(
      () => {
        loadQueries(queries);
      },
      [queries]
    );
    useEffect(
      () => {
        loadTrackers(trackers);
      },
      [trackers]
    );
    useEffect(
      () => {
        setIsLoading(true);
        loadQueries(queries);
        loadTrackers(trackers);
      },
      [range, format]
    );
    const mainColor =
      (trackers && trackers.length > 0 && trackers[0].colour) ||
      (queries && queries.length > 0 && queries[0].colour);

    if (isLoading)
      return (
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{
            height: '100%',
            backgroundImage: `linear-gradient(to bottom right, ${mainColor
              .replace('rgb', 'rgba')
              .replace(')', ', 1)')} 0%, ${mainColor
              .replace('rgb', 'rgba')
              .replace(')', ', .5)')} 100%)`,
          }}
        >
          <CircularProgress style={{ color: idealTextColor(mainColor) }} />
        </Grid>
      );
    else
      return (
        <WrappedComponent
          trackers={data}
          title={props.title}
          layout={props.layout}
        />
      );
  };
}
export default withAnalytics;
