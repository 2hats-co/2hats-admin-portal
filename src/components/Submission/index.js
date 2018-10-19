import React, { Component } from 'react';
import moment from 'moment';
import {withStyles} from '@material-ui/core/styles';
import {getLastSubmission} from '../../firebase/firestore';
import { Document,Page } from 'react-pdf';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import FlagIcon from '@material-ui/icons/Flag';
import AcceptIcon from '@material-ui/icons/Done';
import RejectIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
    root: {
        height: '100%',
        overflowY: 'scroll',
        padding: 40,
        background: '#fff',
        boxShadow: '0 5px 40px 0 rgba(0,0,0,0.1)',
        borderRadius: '10px 0 0 0',
    },
    avatar: {
        width: 56,
        height: 56,
        marginRight: 16,
    },
    greyButton: {
        boxShadow: 'none',
        marginRight: 16,
    },
    greenButton: {
        backgroundColor: '#24c875',
        color: '#fff',
        boxShadow: 'none',
        marginRight: 16,
        '&:hover': {
            backgroundColor: '#1B9457',
        },
    },
    redButton: {
        backgroundColor: '#eb5858',
        color: '#fff',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: '#b84444',
        },
    },
    subheading: {
        marginTop: 40,
        marginBottom: 10,
        fontWeight: 700,
    },
    chip: {
        marginRight: 4,
    },
});

class Submission extends Component {
    
    constructor(props){
        super(props);
        this.setSubmission = this.setSubmission.bind(this);
        this.state = {
            isLoading: false,
            submission: false,
        };
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
        const {submission, isLoading} = this.state;
        const {classes} = this.props;

        const pages = [];
        for (let i = 0; i < this.state.numPages; i++) {
            pages.push(<Page pageNumber={i + 1} key={i} />);
        }

        if(submission){
            console.log(submission);
            const timestamp = moment.unix(submission.createdAt.seconds)
                .format('LLLL');

            let interests = '';
            if (submission.submissionContent.careerInterests.value) {
                for (let i = 0; i < submission.submissionContent.careerInterests.value.length; i++) {
                    interests += submission.submissionContent.careerInterests.value[i];
                    if (i < submission.submissionContent.careerInterests.value.length - 1) interests += ', ';
                }
            }

            return(
                <Grid container direction="column" wrap="nowrap" className={classes.root}>

                    <Grid item>
                        <Grid container justify="space-between">
                            <Grid item>
                                <Grid container>
                                    <Grid item>
                                        <Avatar className={classes.avatar}><PersonIcon /></Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="headline">{submission.displayName}</Typography>
                                        <Typography variant="body2">{interests}</Typography>
                                        <Typography variant="body2">Submitted on {timestamp}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Button variant="fab" className={classes.greyButton} aria-label="reject">
                                    <FlagIcon />
                                </Button>
                                <Button variant="fab" className={classes.greenButton} aria-label="accept">
                                    <AcceptIcon />
                                </Button>
                                <Button variant="fab" className={classes.redButton} aria-label="reject">
                                    <RejectIcon />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Typography className={classes.subheading} variant="subheading">Bio:</Typography>
                        <Typography variant="body1">{submission.submissionContent.bio}</Typography>
                    </Grid>

                    <Grid item>
                        <Typography className={classes.subheading} variant="subheading">Skills:</Typography>
                        {submission.submissionContent.skills.map(x =>
                            <Chip color="primary" label={x} key={x} className={classes.chip} />
                        )}
                    </Grid>

                    <Grid item>
                        <Typography className={classes.subheading} variant="subheading">Resume:</Typography>
                        <Document 
                            onLoadSuccess={this.onDocumentLoadSuccess}
                            file={submission.submissionContent.resumeFile.downloadURL}
                        >
                            { pages }
                        </Document>
                    </Grid>
                </Grid>
            );
        }else if(isLoading){
            return(
                <Grid container alignItems="center" justify="center"
                    style={{height: '100%'}}
                >
                    <CircularProgress size={75} />
                </Grid>
            );
        }else{
            return(
                <Grid container direction="column" alignItems="center" justify="center"
                    style={{height: '100%', color: '#808080'}}
                >
                    <PersonIcon style={{width: 64, height: 64, opacity: 0.87}} />
                    No candidate selected
                </Grid>
            );
        }
       
    }
}
export default withStyles(styles)(Submission);
