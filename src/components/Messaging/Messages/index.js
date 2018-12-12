import React,{Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Message from './Message'

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 2,
    },
    messageContainer: {
        width: '100%',
    },
});

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

        return(
        <div className={classes.root}>
            { messages.map((data, i) => (
                <Message key={data.id} data={data}
                    firstOfType={i > 0 ? messages[i-1].isIncoming !== data.isIncoming : true}
                    lastOfType={i < messages.length - 1 ? messages[i+1].isIncoming !== data.isIncoming : true}
                />
            ))}
            <div style={{ float:"left", clear: "both" }}
                ref={(el) => { this.messagesEnd = el; }}>
            </div>
        </div>
        )
    }
}
export default withStyles(styles)(Messages);
