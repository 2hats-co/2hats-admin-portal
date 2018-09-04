import React,{Component} from 'react';
import {withNavigation} from '../components/withNavigation';
import CandidateDialog from '../components/CandidateDialog';

class CandidateDialogContainer extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div style={{padding: 20}}>
                <CandidateDialog
                    name="Perrin Alto Jones"
                />
            </div>
        )
    }
}
export default withNavigation(CandidateDialogContainer);
