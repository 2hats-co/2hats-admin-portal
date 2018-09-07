import React,{Component} from 'react';
import { withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import CommunicationItem from './CommunicationItem';

const styles = theme => ({
    root: {
        position: "relative",
        height: "100%",
        overflowY: "hidden",
    },
    cardContainer: {
        padding: 20,
        height: "calc(100% - 48px)",
        marginTop: 48,
        boxSizing: "border-box",
        overflowY: "scroll",
    },
    tab: {
        minWidth: "auto",
    }
});

class CandidateCommunication extends Component {
    constructor(props){
        super(props);

        this.state = { selectedTab: "all", };
    }

    handleChange = (event, value) => {
        this.setState({ selectedTab: value });
    };
    
    render(){
        const { items, classes } = this.props;

        const filteredItems = this.state.selectedTab !== "all" ?
            items.filter(item => item.type === this.state.selectedTab) :
            items;

        const cards = filteredItems.map((item, index) => (
            <CommunicationItem
                key={index}
                icon={item.type}
                outgoing={item.outgoing}
                author={item.author}
                date={item.date}
                title={item.title}
                description={item.description}
                body={item.body}
                linkName={item.linkName}
                link={item.link}
            />
        ));

        return(
            <div className={classes.root}>
                <AppBar position="absolute" color="#fff">
                    <Tabs
                        value={this.state.selectedTab}
                        onChange={this.handleChange}
                        fullWidth
                    >
                        <Tab className={classes.tab} value="all" label="All" />
                        <Tab className={classes.tab} value="mail" label="Emails" />
                        <Tab className={classes.tab} value="call" label="Calls" />
                        <Tab className={classes.tab} value="note" label="Notes" />
                        <Tab className={classes.tab} value="file" label="Files" />
                        <Tab className={classes.tab} value="history" label="History" />
                        <Tab className={classes.tab} value="task" label="Tasks" />
                    </Tabs>
                </AppBar>

                <div className={classes.cardContainer}>
                    {cards}
                </div>
            </div>
        )
    }
}
export default withStyles(styles)(CandidateCommunication);
