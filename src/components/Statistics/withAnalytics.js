import React, {
    Component
} from 'react';
import {
    getTrackerLineData
} from '../../utilities/analytics/index'

// This function takes a component...
function withAnalytics(WrappedComponent) {
    // ...and returns another component...
    return class extends React.Component {
        state = {
            isloading: true
        }
        updateTrackers = (trackers) => {
            this.setState({
                trackers,
                isloading: false
            })
        }
        componentDidMount() {
            this.loadData()
        }
        componentDidUpdate(prevProps, prevState) {
            const rerenderProps = ['range', 'trackers','format']
            rerenderProps.forEach(prop => {
                if (prevProps[prop] !== this.props[prop]) {
                    this.loadData()
                    return;
                }
            })
        }
        loadData = async () => {
            const {
                trackers,
                range,
                format
            } = this.props
            const trackerPromises = trackers.map(async (x) => {
            
                let trackerData = await getTrackerLineData(x, range, format)
                const tracker = Object.assign({
                    data: trackerData.labeledData,
                    sum: trackerData.sum
                }, x)
                return (tracker)
            })
            const trackUpdater = this.updateTrackers
            Promise.all(trackerPromises).then(function (updatedTrackers) {
                trackUpdater(updatedTrackers)
            })
        }
        render() {
            const {
                trackers,
                isloading,
            } = this.state
            if (!isloading) {
                return <WrappedComponent trackers = {
                    trackers
                }
                title={this.props.title}
                />;
            } else {
                return ( <div/> )
            }

        }

    }
};
export default withAnalytics
