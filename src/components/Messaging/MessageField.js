import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({

    replyButton: {
        marginBottom:10
    },
 
});
class MessageField extends Component {
    constructor(props) {
        super(props);
        this.state = { messageContent:'' }
    }
    handleChange = e =>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleSend =()=> {
        this.props.handleSendMessage(this.state.messageContent)
        this.setState({messageContent:''})
    }
    render() { 
        const {messageContent} = this.state
        const {classes} = this.props 
        return (  
            <Grid container 
            justify='space-around'
            alignItems='flex-end'>
            <Grid item xs={10}>
            <TextField
         value={messageContent}
         onChange={this.handleChange}
         id="outlined-textarea"
         label="message"
         name="messageContent"
         placeholder="type a message..."
         multiline
         fullWidth={true}
         margin="normal"
         variant="outlined"/>

       </Grid>
          <Button disabled={messageContent.length ===0} 
                    variant="extendedFab" 
                    color="primary" 
                    aria-label="Reply" 
                    onClick={this.handleSend}
                    className={classes.replyButton}> 
            <SendIcon /> Send </Button>
        </Grid>


        );
    }
}

export default withStyles(styles)(MessageField);
