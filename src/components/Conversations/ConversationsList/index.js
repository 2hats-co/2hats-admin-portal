import React,{useState,useEffect} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

import MailIcon from '@material-ui/icons/Mail';
import ReadIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';

import List from '@material-ui/core/List';

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Item from './Item'
import {useConversations} from '../../../hooks/useConversations'
import InfiniteScroll from 'react-infinite-scroller';

const styles = theme => ({
    tabs: {
        boxShadow: `0 -1px 0 ${theme.palette.divider} inset`,
    },
});

function ConversationsList(props){
    const [filter,setFilter] = useState('all')
    const [conversationsState,conversationsDispatch] = useConversations()
    //TODO :abstract into useConversations
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {
        setHasMore(true);
    }, [conversationsState.conversations]);
    const loadMore = (num) => {
        if (hasMore) {
            setHasMore(false);
            conversationsDispatch({type: 'more'});
        }
    };

    if (conversationsState.loading) return (
        <Grid container style={{ height:'100%' }} justify="center" alignItems="center">
          <CircularProgress size={64} />
        </Grid>
      );




    // handleCandidateFilter = (event, value) => {
    //     conversationsDispatch({ filter: value });
    // }
    const {classes,setSelectedConversation,selectedConversation} = props
    
        return( <Grid container direction="column" style={{height: 'calc(100vh - 64px)'}}>
        <Grid item>
            <Tabs
                className={classes.tabs}
               value={filter}
                onChange={(e,v)=>{setFilter(v)}}
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

            <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={hasMore}
                loader={<LinearProgress key="listLoader" className={classes.listLoader} />}
                useWindow={false}
                threshold={1}
            >
                <List disablePadding>
                    {conversationsState.conversations &&conversationsState.conversations.map((x) =>
                        <Item
                            onClick={()=>{setSelectedConversation(x)}}
                            data={x}
                            key={x.id}
                            selected={x.id === selectedConversation.id}
                            //isUnread={x.isUnread}
                        // isStarred={x.isStarred}
                        />)
                    }
                </List>
            </InfiniteScroll>

        </Grid>

    </Grid>);
    }

export default withStyles(styles)(ConversationsList);
