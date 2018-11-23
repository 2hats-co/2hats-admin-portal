import React, {
    Component
} from 'react';
import withAnalytics from './withAnalytics'


class TrackerPercentage extends Component {
    render() {
        const {
            title,
            trackers
        } = this.props
        console.log(title)
        let percentage = 0
        if(trackers[0].sum<trackers[1].sum){
            percentage = Math.round((trackers[0].sum/trackers[1].sum)*100)
        }else{
            percentage = Math.round((trackers[1].sum/trackers[0].sum)*100)            
        }
            return ( <div>
                < div style={{backgroundColor:trackers[0].colour,color:'#fff',borderRadius:10,width:'80%',margin:10,paddingLeft:20}}>
                <h3>{title}</h3>
                <h2>{percentage}%</h2>
                </div >
                </div>
            )
    }
}

export default withAnalytics(TrackerPercentage);