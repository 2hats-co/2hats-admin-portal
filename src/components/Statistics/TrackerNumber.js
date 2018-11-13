import React, {
    Component
} from 'react';
import withAnalytics from './withAnalytics'


class TrackerNumber extends Component {
    render() {
        const {
            title,
            trackers
        } = this.props
            return ( <div>
                <h2>{title}</h2> {trackers.map(tracker=> < div style={{backgroundColor:tracker.colour,color:'#fff',borderRadius:10,width:'80%',margin:10,paddingLeft:20}}>
                <h3>{tracker.label}</h3>
                <h2>{tracker.sum}</h2>
                </div >)}
                </div>
            )
    }
}

export default withAnalytics(TrackerNumber);