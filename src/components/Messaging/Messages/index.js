import React,{Component} from 'react';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Message from './Message'

const styles = theme => ({
   root:{
     //  height:'calc(100vh - 120px)',
       maxWidth:'100%'
       
   }
});

class Messages extends Component{      
      componentDidUpdate(prevProps) {
          if(!prevProps.data){
            this.messagesEnd.scrollIntoView();
          }else{
            this.messagesEnd.scrollIntoView({ behavior: "smooth" });
          }
      }
    render(){
        const {classes, messages} = this.props;
        return(
            <Grid container
            className={classes.root}
            direction="row"
            justify="flex-end"
            alignItems="center">
            { messages.map((data) => (
                <Grid item align={data.isIncoming? 'left':'right'} style={{width:'100%'}}>
                <Message data={data} key={data.id} />
                </Grid>
                )
            )
             }
               <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
        </div>
        </Grid>
        )
    }
}
export default withStyles(styles)(Messages);
