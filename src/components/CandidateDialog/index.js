import React,{Component} from 'react';
import { withStyles } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

import CandidateInfo from './CandidateInfo';
import CandidateCommunication from './CandidateCommunication';
import NestedSelect from './NestedSelect';

const styles = theme => ({
    root: {
        width: 'calc(100% - 40px)',
        height: 500,
        position: "relative",

        background: "#FFFFFF",
        boxShadow: "0 6px 10px 1px rgba(87,87,87,0.15)",
        borderRadius: 5,
    },
    header: {
        paddingLeft: 20,
        height: 50,
        boxShadow: "0 6px 10px 1px rgba(87,87,87,0.15)",
        borderRadius: "5px 5px 0 0",
        position: "relative",
        zIndex: 1101,
    },
    fab: {
        position: "absolute",
        bottom: 20,
        right: 20,
    }
});

const testInfo = [
    {
        title: "Contact",
        content: ["p.jones@columbia.edu", "0400 000 000"],
    },
    {
        title: "Industry",
        content: ["Design"],
    },
    {
        title: "Interests",
        content: ["User Interface, User Experience, Graphics/Illustrations"],
    },
    {
        title: "Contact",
        content: ["p.jones@columbia.edu", "0400 000 000"],
    },
    {
        title: "Industry",
        content: ["Design"],
    },
    {
        title: "Interests",
        content: ["User Interface, User Experience, Graphics/Illustrations"],
    },
    {
        title: "Contact",
        content: ["p.jones@columbia.edu", "0400 000 000"],
    },
    {
        title: "Industry",
        content: ["Design"],
    },
    {
        title: "Interests",
        content: ["User Interface, User Experience, Graphics/Illustrations"],
    }
]

const testCommItems = [
    {
        type: "mail",
        author: "Perrin",
        outgoing: false,
        date: "11:22 AM – 7th August 2018",
        title: "2hats Assessment Centre",
        description: "This is the body text This is the body text This is the body text This is the body text This is the body text This is the body text This is the body text This is the body text This is the body text This is the body text This is the body text",
    },
    {
        type: "note",
        author: "Natalie",
        date: "11:22 AM – 7th August 2018",
        description: "This is the body text",
    },
    {
        type: "call",
        author: "Perrin",
        date: "11:22 AM – 7th August 2018",
        description: "This is the body text",
    },
    {
        type: "file",
        author: "Perrin",
        date: "11:22 AM – 7th August 2018",
        linkName: "Resume Feedback",
        link: "https://google.com",
    },
    {
        type: "mail",
        author: "Natalie",
        outgoing: true,
        date: "11:22 AM – 7th August 2018",
        title: "2hats Assessment Centre",
        description: "This is the body text This is the body text This is the body text This is the body text This is the body text This is the body text This is the body text This is the body text This is the body text This is the body text This is the body text",
    },
    {
        type: "history",
        author: "Perrin",
        date: "11:22 AM – 7th August 2018",
        linkName: "Resume Feedback",
        link: "https://google.com",
    },
    {
        type: "task",
        author: "Perrin",
        date: "11:22 AM – 7th August 2018",
        title: "2hats Assessment Centre",
        description: "This is the body text",
    },
];

class CandidateDialog extends Component {
    constructor(props){
        super(props);

        this.state = {
            applicationStatus: 'Interview Completed / Accepted',
        };

        this.changeApplicationStatus = this.changeApplicationStatus.bind(this);
    }
    
    changeApplicationStatus(val) {
        this.setState({ applicationStatus: val });
    }
    
    render(){
        const { classes, name } = this.props;
        return(
            <Grid
                container
                direction="column"
                className={classes.root}
            >
                <Grid item className={classes.header}>
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <Typography variant="headline">{name}</Typography>
                        </Grid>

                        <Grid item xs>
                            <NestedSelect
                                value={this.state.applicationStatus}
                                changeValue={this.changeApplicationStatus}
                            />
                        </Grid>

                        <Grid item xs>
                            <Button color="primary">Generate Feedback</Button>
                            <Button color="primary">Generate Report</Button>
                        </Grid>
                        <IconButton aria-label="Close"><CloseIcon /></IconButton>
                    </Grid>
                </Grid>

                <Grid item xs style={{ height: "calc(100% - 50px)" }}>
                    <Grid container style={{ height: "100%" }}>
                        <Grid item xs={5} style={{ height: "100%" }}>
                            <CandidateInfo items={testInfo} />
                        </Grid>
                        <Grid item xs={7} style={{ height: "100%" }}>
                            <CandidateCommunication items={testCommItems} />
                        </Grid>
                    </Grid>
                </Grid>

                <Button variant="fab" color="primary" aria-label="Add" className={classes.fab}>
                    <AddIcon />
                </Button>
            </Grid>
        )
    }
}

export default withStyles(styles)(CandidateDialog);
