import React, {
    Component
} from 'react';
import {
    getTrackerSum
} from '../../utilities/analytics/index'


class TrackerNumber extends Component {
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
        if (prevProps.format !== this.props.format || prevProps.range !== this.props.range) {
            this.loadData()
        }
    }
    loadData = async () => {
        const {
            trackers,
            range,
            format
        } = this.props
        const trackerPromises = trackers.map(async (x) => {
            let trackerData = await getTrackerSum(x, range)
            const tracker = Object.assign({
                sum: trackerData
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
            isloading
        } = this.state
        const {
            title
        } = this.props
        console.log('trackers', trackers)
        if (!isloading) {
            return ( <div>
                <h2>{title}</h2> {trackers.map(tracker=> < div style={{backgroundColor:tracker.colour,color:'#fff',borderRadius:10,width:'80%',margin:10,paddingLeft:20}}>
                <h3>{tracker.label}</h3>
                <h2>{tracker.sum}</h2>
                </div >)}
                </div>
            )
        } else {
            return ( <div/> )
        }
    }
}

export default TrackerNumber;