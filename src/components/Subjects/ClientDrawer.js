import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import JobIcon from '@material-ui/icons/BusinessCenterOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import ConversationIcon from '@material-ui/icons/MessageOutlined';
import MailIcon from '@material-ui/icons/SendOutlined';
import BusinessIcon from '@material-ui/icons/BusinessOutlined';
import ContactIcon from '@material-ui/icons/AccountCircleOutlined';

import AdminSelector from '../AdminSelector';

import { cloudFunction, CLOUD_FUNCTIONS } from '../../utilities/CloudFunctions';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import { updateDoc } from '../../utilities/firestore';

const styles = theme => ({
  root: {
    width: 320,
  },

  section: {
    padding: theme.spacing.unit * 2,
  },

  icon: {
    marginRight: theme.spacing.unit,
    color: theme.palette.text.secondary,
  },
  iconAligned: {
    position: 'relative',
    top: 4,
  },

  title: { marginBottom: theme.spacing.unit / 2 },
});

const callableCallback = o => {
  console.log(o);
};

function ClientDrawer(props) {
  const { classes, data, history, setClientForm } = props;

  const goToJobs = () => {
    history.push(`/contentManager/jobs?clientId=${data.id}`);
  };
  const goToConversation = () => {
    history.push(`/conversations?clientId=${data.id}`);
  };
  const sendWelcomeEmail = () => {
    cloudFunction(
      CLOUD_FUNCTIONS.CLIENT_WELCOME_EMAIL,
      callableCallback,
      callableCallback
    );
  };
  const setAssignee = assignee => {
    updateDoc(COLLECTIONS.clients, data.id, { assignee });
  };

  const listItems = [
    {
      label: 'Manage jobs',
      Icon: JobIcon,
      onClick: goToJobs,
    },
    {
      label: 'Go to conversation',
      Icon: ConversationIcon,
      onClick: goToConversation,
    },
    {
      label: 'Send invite email',
      Icon: MailIcon,
      onClick: sendWelcomeEmail,
    },
    {
      label: 'Edit client',
      Icon: EditIcon,
      onClick: () => setClientForm(data),
    },
  ];

  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <Grid container alignItems="flex-start" wrap="nowrap">
          <BusinessIcon
            className={classNames(classes.icon, classes.iconAligned)}
          />
          <Typography variant="h5" className={classes.title}>
            {data.companyName}
          </Typography>
        </Grid>

        <Grid container alignItems="flex-start" wrap="nowrap">
          <ContactIcon className={classes.icon} />
          <Typography variant="body1">{data.contactPerson}</Typography>
        </Grid>
      </div>

      <Divider variant="middle" />

      <div className={classes.section}>
        <Typography variant="subtitle1">Assignee:</Typography>
        <AdminSelector
          showName
          onSelect={setAssignee}
          defaultSelection={data.assignee}
        />
      </div>

      <Divider variant="middle" />

      <List>
        {listItems.map((x, i) => (
          <ListItem key={i} button onClick={x.onClick}>
            <ListItemIcon>
              <x.Icon />
            </ListItemIcon>
            <ListItemText primary={x.label} />
          </ListItem>
        ))}
      </List>

      <Divider variant="middle" />

      <div className={classes.section}>
        <TextField
          multiline
          variant="filled"
          label="note"
          InputProps={{ disableUnderline: true }}
        />
        <Button color="primary">Add</Button>
      </div>
    </div>
  );
}

ClientDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ClientDrawer));
