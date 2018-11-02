import React, { Component } from 'react';

import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import { Document, Page } from 'react-pdf';
import EduExpCard from './EduExpCard';

const styles = theme => ({
    subheading: {
        marginTop: 40,
        marginBottom: 10,
        fontWeight: 700,
    },
    chip: {
        marginRight: 4,
        marginBottom: 4,
    },
    pdfDocument: {
        width: 'calc(100vw - 500px - 300px)',
    },
    pdfPage: {
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        marginBottom: 8,
    },
});

class submissionDetails extends Component {
    constructor(props) {
        super(props);

        this.state = { numPages: 0 };
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }

    render() {
        const { submission, classes } = this.props;
        const { numPages } = this.state;

        const pages = [];
        for (let i = 0; i < numPages; i++) {
            pages.push(<Page pageNumber={i + 1} key={i} width={window.innerWidth - 500 - 64 - 300}
            className={classes.pdfPage} />);
        }

        return (<React.Fragment>
            <Typography className={classes.subheading} variant="subheading">Bio:</Typography>
            <Typography variant="body1">{submission.submissionContent.bio}</Typography>

            <Typography className={classes.subheading} variant="subheading">Available Days:</Typography>
            <Typography variant="body1">{submission.submissionContent.availableDays}</Typography>


            <Typography className={classes.subheading} variant="subheading">Skills:</Typography>
            {submission.submissionContent.skills.map(x =>
                <Chip color="primary" label={x} key={x} className={classes.chip} />
            )}

            <Typography className={classes.subheading} variant="subheading">{submission.submissionContent.process === 'upload' ?'Resume':'Profile'}:</Typography>
            {submission.submissionContent.process === 'upload' &&<Document 
                onLoadSuccess={this.onDocumentLoadSuccess}
                file={submission.submissionContent.resumeFile.downloadURL}
                className={classes.pdfDocument}
            >
                { pages }
            </Document>}
            {submission.submissionContent.process === 'build' && 
            <div>
            <Typography className={classes.subheading} variant="subheading">Education:</Typography>
            {submission.submissionContent.education.map((x, i) => <EduExpCard key={i} title={x.degree} label={x.major} description={x.description} startDate={x.startDate} endDate={x.endDate}/>)}
            <Typography className={classes.subheading} variant="subheading">Experience:</Typography>
            {submission.submissionContent.experience.map((x, i) => <EduExpCard key={i} title={`${x.title} - ${x.type}`} label={x.organisation} description={x.description} startDate={x.startDate} endDate={x.endDate}/>)}
            </div>
            }
        </React.Fragment>);
    }
}

export default withStyles(styles)(submissionDetails);
