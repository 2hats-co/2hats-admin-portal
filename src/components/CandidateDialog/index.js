import React, {Component} from 'react';
import { withStyles, Dialog } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

import CandidateInfo from './CandidateInfo';
import CandidateCommunication from './CandidateCommunication';
import NestedSelect from './NestedSelect';
import EmailComposer from './EmailComposer';

import Chip from '@material-ui/core/Chip';
const styles = theme => ({
    root: {
        width: "calc(100vw - 40px)",
        maxWidth:1200,
        height: "calc(100vh - 120px)",
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

const testCommItems = [
    // {
    //     type: "file",
    //     author: "",
    //     date: "",
    //     linkName: "Resume",
    //     link: "https://google.com",
    // },
    // {
    //     type: "mail",
    //     author: "Natalie",
    //     outgoing: true,
    //     date: "11:22 AM – 7th August 2018",
    //     title: "2hats Assessment Centre",
    //     description: "This is the body text This is the body text This is the body text This is the body text This is the body text This is the body text This is the body text This is the body text This is the body text This is the body text This is the body text",
    // },
    // {
    //     type: "history",
    //     author: "Perrin",
    //     date: "11:22 AM – 7th August 2018",
    //     linkName: "Resume Feedback",
    //     link: "https://google.com",
    // },
    // {
    //     type: "task",
    //     author: "Perrin",
    //     date: "11:22 AM – 7th August 2018",
    //     title: "2hats Assessment Centre",
    //     description: "This is the body text",
    // },
];

const stringReducer = (accumulator, currentValue) => accumulator + ', '+ currentValue;
function _generateInfoItems(infoData){
    let interests = ''
    let skills = ''
    if(infoData.careerInterests && infoData.careerInterests.length !==0){
        interests = infoData.careerInterests.reduce(stringReducer)
    }
    if(infoData.skills && infoData.skills.length !==0){
        skills = infoData.skills.reduce(stringReducer)
    }
    return [
        {
            title: "Contact",
            content: [infoData.email, infoData.phoneNumber],
        },
        {
            title: "Industry",
            content: [infoData.industry],
        },
        {
            title: "Interests",
            content: [interests],
        },{
            title: "Skills",
            content: [skills],
        },
        {
            title: "Availability",
            content: [`${infoData.availabilityInt} days`],
        },
        {
            title: "Resume",
            content: [(infoData.resume && 
                <Chip
        label="click to open"
        //className={classes.chip}
        component="a"
        href={infoData.resume.downloadURL}
        target="_blank"
        clickable
        variant="outlined"
      />
               )],
        }
    ]
    
}
class CandidateDialog extends Component {
    constructor(props){
        super(props);

        this.state = {
            composerMode: false,
            applicationStatus: 'Interview Completed / Accepted',
        };

        this.changeApplicationStatus = this.changeApplicationStatus.bind(this);
        this.closeComposer = this.closeComposer.bind(this);
    }
    
    changeApplicationStatus(val) {
        this.setState({ applicationStatus: val });
    }

    closeComposer() {
        this.setState({ composerMode: false });
    }

    render(){
        const { classes,infoData} = this.props;
       console.log('data',infoData)
        return(
            <Dialog open={true}  maxWidth={'lg'} onClose={this.props.dismiss}>
            <Grid
                container
                direction="column"
                className={classes.root}>
                <Grid item className={classes.header}>
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <Typography variant="headline">{infoData.firstName} {infoData.lastName}</Typography>
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
                        <IconButton aria-label="Close" onClick={this.props.dismiss}><CloseIcon /></IconButton>
                    </Grid>
                </Grid>

                <Grid item xs style={{ height: "calc(100% - 50px)" }}>
                    <Grid container style={{ height: "100%" }}>
                        <Grid item xs={5} style={{ height: "100%",borderRight: "1px solid rgba(43,48,52,.1)", }}>
                            {
                                this.state.composerMode ?
                                    <EmailComposer
                                        reply={false}
                                        closeComposer={this.closeComposer}
                                    /> :
                                    <CandidateInfo items={_generateInfoItems(infoData)} />
                            }
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
            </Dialog>
        )
    }
}

export default withStyles(styles)(CandidateDialog);
