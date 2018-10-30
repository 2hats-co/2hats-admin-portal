import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount() {
      //  this.props.addNote('FTRsKDrHqyQciTj0m5qWEBXBmBd2',{body:'admin portal test'})
    }
    componentDidUpdate(prevProps, prevState) {
        // if (prevProps.uid !== this.props.uid) {
        //     this.props.loadNotes(this.props.uid)
        // }
    }
    render() { 
        return (<div/>);
    }
}
 
const enhance = compose(
    // add redux store (from react context) as a prop
    withFirestore,
    // Handler functions as props
    withHandlers({
    addNote: props =>(candidateUID,note)=>{
        props.store.firestore.add({ collection: COLLECTIONS.candidates, doc:candidateUID,subcollections:[{ collection: 'notes'}],}, note)
    },
      loadNotes: props => candidateUID =>
        props.firestore.setListener({collection:COLLECTIONS.candidates,
            doc:candidateUID,
            subcollections: [{ collection: 'notes' }],
           orderBy:[['createdAt', 'desc']]}),
    }),
    connect(({ firestore }) => ({
        notes: firestore.ordered.notes,
    }))
  );
export default enhance(
    compose(  
        withStyles(styles)(Notes)
    )
);