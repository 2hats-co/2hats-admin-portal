import React,{useState} from 'react';
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

function ConversationsList(){
    const [selectedConversation,setSelectedConversation] = useState(null)
    const [conversations,conversationsDispatch] = useConversations()

    console.log(conversations)

    // handleCandidateFilter = (event, value) => {
    //     conversationsDispatch({ filter: value });
    // }
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
                {conversations.map((x) =>
                    <Item
                        onClick={()=>{setSelectedConversation(x.id)}}
                        data={x}
                        key={x.id}
                        selected={x.id === selectedConversation}
                        //isUnread={x.isUnread}
                       // isStarred={x.isStarred}
                    />)
                }
            </List>
        </Grid>

    </Grid>);
    }
}
export default withStyles(styles)(ThreadsList);
