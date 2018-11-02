import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function ConfirmationDailog(props){

    const {title,body,request,cancel,customText} = props.data
 
        return (
            <div>
         
              <Dialog
                open={true}
                onClose={cancel.action}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                  { customText ? body :
                    <DialogContentText id="alert-dialog-description">
                    {body}
                    </DialogContentText>
                  }
                </DialogContent>
                <DialogActions>
                  <Button onClick={cancel.action} color="primary">
                  {cancel.label}
                  </Button>
                  <Button onClick={request.action} color="primary" autoFocus>
                    {request.label}
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          );
    
}
export default ConfirmationDailog
