import React, { Component } from 'react';
import {getLastSubmission} from '../../firebase/firestore';
import { Document,Page } from 'react-pdf';
import Button from '@material-ui/core/Button';
import AcceptIcon from '@material-ui/icons/Done';
import RejectIcon from '@material-ui/icons/Close';

class Submission extends Component {
    
    constructor(props){
        super(props)
       this.setSubmission = this.setSubmission.bind(this)
       this.state = {isLoading:false,submission:false}
    }
    componentDidUpdate(prevProps){
        if(prevProps.UID !== this.props.UID){
            this.setState({isLoading:true,submission:false})
            getLastSubmission(this.props.UID,this.setSubmission)
        }
    }
    setSubmission(doc){
        console.log(doc)
        this.setState({isLoading:false,submission:doc})
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }    
    render(){
        const {submission,isLoading} = this.state 
        if(submission){
            return(<div>
           
                <h2>{submission.displayName}</h2>
                <Button variant="fab" color="primary" aria-label="accept">
                      <AcceptIcon />
                </Button>
                space
                <Button variant="fab" color="secondary" aria-label="reject">
                      <RejectIcon />
                </Button>
 
                <h3>Bio:</h3>
                <p>{submission.submissionContent.bio}</p>
                <h3>Skills:</h3>
                <ul>{submission.submissionContent.skills.map(x=> <li>{x}</li>)}</ul>
                <Document 
                onLoadSuccess={this.onDocumentLoadSuccess}
                file={submission.submissionContent.resumeFile.downloadURL}>
                <Page pageNumber={1} />
                <Page pageNumber={2} />
                <Page pageNumber={3} />

                </Document>
            </div>)
        }else if(isLoading){
            return(<div>loading</div>)
        }else{
            return(<div>select candidate</div>)
        }
       
    }
}
export default Submission