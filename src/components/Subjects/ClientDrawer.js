import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import JobIcon from '@material-ui/icons/BusinessCenterOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import ConversationIcon from '@material-ui/icons/MessageOutlined';
import { cloudFunction, CLOUD_FUNCTIONS } from '../../utilities/CloudFunctions';
import MailIcon from '@material-ui/icons/Mail';
import AdminSelector from '../AdminSelector';
const styles = {
  list: {
    width: 400,
  },
  fullList: {
    width: 'auto',
  },
};
const callableCallback = o => {
  console.log(o);
};
function ClientDrawer(props) {
  const { classes, data, setDrawer, history } = props;
  const goToJobs = () => {
    history.push(`/contentManager/jobs?clientId=${data.id}`);
  };
  const goToConversation = () => {
    history.push(`/conversations?clientId=${data.id}`);
  };
  const sendWelcomeEmail = () => {
    cloudFunction(
      CLOUD_FUNCTIONS.CLIENT_INVITE_EMAIL,
      callableCallback,
      callableCallback
    );
  };
  const sideList = (
    <div className={classes.list}>
      <Typography>{data.companyName}</Typography>
      <Typography>{data.contactPerson}</Typography>
      <Divider />
      <Typography>assignee:</Typography>
      <AdminSelector />
      <Divider />
      <List>
        <ListItem button onClick={goToJobs}>
          <ListItemIcon>
            <JobIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Jobs" />
        </ListItem>
        <ListItem button onClick={goToConversation}>
          <ListItemIcon>
            <ConversationIcon />
          </ListItemIcon>
          <ListItemText primary="Go to conversation" />
        </ListItem>
        <ListItem button onClick={sendWelcomeEmail}>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Send invite Email" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary="Edit client" />
        </ListItem>
      </List>
      <Divider />
      <TextField label="note" />
      <Button>Add</Button>
    </div>
  );

  return (
    <div>
      <Drawer
        anchor="right"
        open={true}
        onClose={() => {
          setDrawer(null);
        }}
      >
        <div
          tabIndex={0}
          role="button"
          // onClick={this.toggleDrawer('right', false)}
          //   onKeyDown={this.toggleDrawer('right', false)}
        >
          {sideList}
        </div>
      </Drawer>
    </div>
  );
}

ClientDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ClientDrawer));
