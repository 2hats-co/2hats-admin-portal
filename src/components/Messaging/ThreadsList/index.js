import React,{Component} from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import ReadIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Item from './Item'
import { CONSTANTS } from '@firebase/util';

const styles = theme => ({
    paginationBar: {
        padding: '6px 24px',
        borderBottom: '1px solid rgba(0,0,0,.15)',
        position: 'relative',
        '&::after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            background: 'linear-gradient(to bottom, rgba(0,0,0,.1), rgba(0,0,0,0))',
            bottom: -16,
            left: 0,
            width: '100%',
            height: 15,
        },
    },
    paginationButtons: {
        width: 24,
        height: 24,
    },
    subheading: {
        display: 'inline',
        verticalAlign: 'middle',
        color: 'rgba(0,0,0,.53)',
        fontWeight: 400,
    },
});

class ThreadsList extends Component{

    constructor(props){
        super(props)
        this.state = { 
            selectedThread: '',
            candidateFilter: 'all',
        }
      
    }
    handleItemClick = (id) =>{
        if(id !== this.state.selectedThread){
            this.setState({selectedThread:id})
            this.props.handleThreadSelector(id)
        }
       
    }
    handleCandidateFilter = (event, value) => {
        this.setState({ candidateFilter: value });
    }
    componentDidMount(){
       
    }
    render(){
        const {threads,classes} = this.props;
        const {selectedThread, candidateFilter} = this.state;

        let filteredThreads;
        switch (candidateFilter) {
            case 'unread':
                filteredThreads = threads.filter(x => x.isUnread);
                break;

            case 'read':
                filteredThreads = threads.filter(x => !x.isUnread);
                break;

            case 'starred':

            default:
                filteredThreads = threads;
                break;
        }

        return( <Grid container direction="column" style={{height: 'calc(100vh - 64px)'}}>
        <Grid item>
            <ToggleButtonGroup
              value={candidateFilter}
              exclusive
              onChange={this.handleCandidateFilter}
              style={{display: 'flex', justifyContent: 'center', boxShadow: 'none'}}
            >
                <ToggleButton value="all">All</ToggleButton>
                <ToggleButton value="unread"><MailIcon /></ToggleButton>
                <ToggleButton value="read"><ReadIcon /></ToggleButton>
                <ToggleButton value="starred"><StarIcon /></ToggleButton>
            </ToggleButtonGroup>
        </Grid>

        <Grid item>
            <Grid container justify="space-between" className={classes.paginationBar}>
                <Grid item>
                    <Typography variant="body2" className={classes.subheading}>
                        { 50 }
                        –
                        { 50 }
                        &nbsp;/&nbsp;
                        { this.state.totalHits }
                    </Typography>
                </Grid>
                <Grid item style={{marginRight: -6}}>
                    <IconButton
                        className={classes.paginationButtons}
                     //   onClick={() => { this.pagination(-1) }}
                        disabled={this.state.page === 0}
                    >
                        <ChevronLeftIcon />
                    </IconButton>
                    <Typography variant="body2" className={classes.subheading}>
                       
                    </Typography>
                    <IconButton
                        className={classes.paginationButtons}
                       // onClick={() => { this.pagination(1) }}
                        //disabled={this.state.page === this.state.totalPages - 1}
                    >
                        <ChevronRightIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>

        <Grid item xs style={{overflowY: 'scroll'}}>
            <List disablePadding>
                {filteredThreads.map((x) =>
                    <Item
                        onClick={()=>{this.handleItemClick(x.id)}}
                        data={x}
                        key={x.id}
                        selected={x.id === selectedThread}
                        isUnread={x.isUnread}
                    />)
                }
            </List>
        </Grid>

    </Grid>)
    }
}
export default withStyles(styles)(ThreadsList);
