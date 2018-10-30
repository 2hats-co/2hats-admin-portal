import React,{Component} from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import SubmissionItem from './SubmissionItem'


//redux 
import { compose } from "redux";
import { connect } from "react-redux";
const nbCandidates = 20
const styles = theme => ({
    toggleButton: {
        flex: 1,
        borderRadius: '4px !important',
    },
    paginationBar: {
        padding: '6px 24px',
        borderBottom: '1px solid rgba(0,0,0,.1)',
    },
    paginationButtons: {
        width: 24,
        height: 24,
    },
    subheading: {
        display: 'inline',
        verticalAlign: 'middle',
    },
});

class CandidatesList extends Component{

    constructor(props){
        super(props)
        this.state = {
            submissionsFilter: 'rejected',
            candidates: [],
            page: 0,
            totalPages: 0,
            totalHits: 0,
        }
      this.handleSubmissionFilter = this.handleSubmissionFilter.bind(this)
    }

    componentDidMount(){
      
    }

    updateCandidates(){
    
    }
    componentDidUpdate(PrevProps){
        console.log('sublist',this.props)
    }

    handleSubmissionFilter(event,value){
        if(value){
            this.setState({submissionsFilter:value})
        }

    }

    

    pagination(val) {
        const newPage = this.state.page + val;
        if (newPage >= 0 && newPage < this.state.totalPages) {
            this.setState({ page: newPage }, () => {
                this.getCandidates(this.state.candidateFilter);
            });
        }
    }

    render(){
        const {submissionsFilter, candidates} = this.state;
        const {classes, selectedCandidate} = this.props;

        return(
        <Grid container direction="column" style={{height:'100%'}}>
            <Grid item>
                <ToggleButtonGroup
                value={submissionsFilter}
                exclusive
                onChange={this.handleSubmissionFilter}
                style={{display: 'flex', justifyContent: 'center', boxShadow: 'none'}}
                >
                    <ToggleButton className={classes.toggleButton} value="all">All</ToggleButton>
                    <ToggleButton className={classes.toggleButton} style={{flex:2}} value="pending">Pending</ToggleButton>
                    <ToggleButton className={classes.toggleButton} style={{flex:2}} value="accepted">Accepted</ToggleButton>
                    <ToggleButton className={classes.toggleButton} style={{flex:2}} value="rejected">Rejected</ToggleButton>
                </ToggleButtonGroup>
            </Grid>

            <Grid item>
                <Grid container justify="space-between" className={classes.paginationBar}>
                    <Grid item>
                        <Typography variant="body2" className={classes.subheading}>
                            { this.state.page === 0 ? 1 : nbCandidates * this.state.page }
                            –
                            { nbCandidates * this.state.page + candidates.length }
                            &nbsp;/&nbsp;
                            { this.state.totalHits }
                        </Typography>
                    </Grid>
                    <Grid item style={{marginRight: -6}}>
                        <IconButton
                            className={classes.paginationButtons}
                            onClick={() => { this.pagination(-1) }}
                            disabled={this.state.page === 0}
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                        <Typography variant="body2" className={classes.subheading}>
                            {this.state.page + 1} / {this.state.totalPages}
                        </Typography>
                        <IconButton
                            className={classes.paginationButtons}
                            onClick={() => { this.pagination(1) }}
                            disabled={this.state.page === this.state.totalPages - 1}
                        >
                            <ChevronRightIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs style={{overflowY: 'scroll'}}>
                { <List disablePadding>
                    {this.props.all && this.props[this.state.submissionsFilter].map((x, i) => {
                    
                        return(
                            <SubmissionItem
                            onClick={()=>{this.props.setSubmission(x.id)}}
                            data={{key:x.id,name:x.displayName,status:x.submissionStatus,createdAt:x.createdAt.seconds,operator:x.operator}}
                            key={`${this.state.page}-${i}`}
                            selected={x.UID === selectedCandidate}
                        />
                        )
                    }
                       )
                    }
                </List> } 
            </Grid>

        </Grid>)
    }
}

const enhance = compose(
    connect(({ firestore }) => ({
      all: firestore.ordered.submissions,
      accepted: firestore.ordered.acceptedSubmissions,
      pending: firestore.ordered.pendingSubmissions,
      rejected: firestore.ordered.rejectedSubmissions,
    }))
  );

  export default enhance(
      compose(  
        withStyles(styles)(CandidatesList)
      )
  );
  

