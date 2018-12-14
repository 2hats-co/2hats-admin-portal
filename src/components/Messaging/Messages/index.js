import React,{Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Slide from '@material-ui/core/Slide';

import Message from './Message'

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 2,
    },
    messageContainer: {
        width: '100%',
    },
});

const isSameType = (a, b) => (
    a.isIncoming === b.isIncoming ||
    a.type === b.type ||
    a.sentBy === b.sentBy
);

class Messages extends Component{
    componentDidUpdate(prevProps) {
        if (!prevProps.data) {
            this.messagesEnd.scrollIntoView();
        } else {
            this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        }
    }

    render () {
        const {classes, messages} = this.props;

        return(<Slide in direction="down">
        <div className={classes.root}>
            { messages.map((data, i) => (
                <Message key={data.id} data={data}
                    firstOfType={i > 0 ? isSameType(messages[i-1], data) : true}
                    lastOfType={i < messages.length - 1 ? isSameType(messages[i+1], data) : true}
                />
            ))}
            <div style={{ float:"left", clear: "both" }}
                ref={(el) => { this.messagesEnd = el; }}>
            </div>
        </div>
        </Slide>)
    }
}
export default withStyles(styles)(Messages);
