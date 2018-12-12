import React,{Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';

import MailIcon from '@material-ui/icons/Mail';
import ReadIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';

import List from '@material-ui/core/List';

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Item from './Item'
// import { CONSTANTS } from '@firebase/util';

const styles = theme => ({
    tabs: {
        boxShadow: `0 -1px 0 ${theme.palette.divider} inset`,
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
                filteredThreads = threads.filter(x => x.isStarred);
                break;

            default:
                filteredThreads = threads;
                break;
        }

        return( <Grid container direction="column" style={{height: 'calc(100vh - 64px)'}}>
        <Grid item>
            <Tabs
                className={classes.tabs}
                value={candidateFilter}
                onChange={this.handleCandidateFilter}
                indicatorColor="primary"
                textColor="primary"
                fullWidth
            >
                <Tab value="all" label="All" />
                <Tab value="unread" label={<MailIcon />} />
                <Tab value="read" label={<ReadIcon />} />
                <Tab value="starred" label={<StarIcon />} />
            </Tabs>
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
                        isStarred={x.isStarred}
                        handleStarThread={this.props.handleStarThread}
                    />)
                }
            </List>
        </Grid>

    </Grid>);
    }
}
export default withStyles(styles)(ThreadsList);
