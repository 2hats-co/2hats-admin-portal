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

import { ALGOLIA_INDEX, createAlgoliaIndex } from '../../../config/algolia'
import CandidateItem from './CandidateItem'

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
            candidateFilter: 'all',
            candidates: [],
            page: 0,
            totalPages: 0,
            totalHits: 0,
        }
        this.handleCandidateFilter = this.handleCandidateFilter.bind(this)
        this.updateCandidates = this.updateCandidates.bind(this)
    }

    componentDidMount(){
        this.getCandidates(this.state.candidateFilter)
    }

    updateCandidates(response){
        this.setState({
            candidates: response.hits,
            totalPages: response.nbPages,
            totalHits: response.nbHits,
        });
    }

    handleCandidateFilter(event,value){
        if(value){
            this.setState({candidateFilter:value})
        }
        this.getCandidates(value)
    }

    getCandidates(filter){
        let filters = ''
        switch (filter) {
            case 'all': filters = 'stage:resume OR stage:pre-review AND status:accepted OR status:rejected OR status:in-review'
                break;
            case 'accepted': filters = 'stage:resume AND status:accepted'
                break;
            case 'rejected': filters = 'stage:resume AND status:rejected'
                break;
            case 'in-review': filters = 'status:in-review'
                break;
            default:
                break;
        }
        const index = createAlgoliaIndex(ALGOLIA_INDEX.candidates);
        index.search('', {
            "filters":filters,
            "hitsPerPage": 50,
            "page": this.state.page,
            "restrictSearchableAttributes": '',
            "analytics": false,
            "attributesToRetrieve": "*",
        }).then(res => {
            this.updateCandidates(res);
        }).catch(err => {
            console.error("Search stage and status total error: ", err.message);
        });
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
        const {candidateFilter, candidates} = this.state;
        const {classes} = this.props;

        return(
        <Grid container direction="column" style={{height:'100%'}}>
            <Grid item>
                <ToggleButtonGroup
                value={candidateFilter}
                exclusive
                onChange={this.handleCandidateFilter}
                style={{display: 'flex', justifyContent: 'center', boxShadow: 'none'}}
                >
                    <ToggleButton className={classes.toggleButton} value="all">All</ToggleButton>
                    <ToggleButton className={classes.toggleButton} style={{flex:2}} value="in-review">In review</ToggleButton>
                    <ToggleButton className={classes.toggleButton} style={{flex:2}} value="accepted">Accepted</ToggleButton>
                    <ToggleButton className={classes.toggleButton} style={{flex:2}} value="rejected">Rejected</ToggleButton>
                </ToggleButtonGroup>
            </Grid>

            <Grid item>
                <Grid container justify="space-between" className={classes.paginationBar}>
                    <Grid item>
                        <Typography variant="body2" className={classes.subheading}>
                            { this.state.page === 0 ? 1 : 50 * this.state.page }
                            –
                            { 50 * this.state.page + candidates.length }
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
                <List disablePadding>
                    {candidates.map((x, i) =>
                        <CandidateItem
                            onClick={()=>{this.props.setCandidate(x.objectID)}}
                            data={x}
                            key={`${this.state.page}-${i}`}
                        />)
                    }
                </List>
            </Grid>

        </Grid>)
    }
}
export default withStyles(styles)(CandidatesList);
