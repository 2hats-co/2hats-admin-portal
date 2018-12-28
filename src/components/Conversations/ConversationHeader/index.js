import React, {
  useState, //useRef
} from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import AddSubscriberIcon from '@material-ui/icons/GroupAdd';
import LinkIcon from '@material-ui/icons/Link';
import BackIcon from '@material-ui/icons/ArrowBack';
import StarOutlineIcon from '@material-ui/icons/StarBorder';
// import MenuItem from '@material-ui/core/MenuItem';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import Select from '@material-ui/core/Select';
// import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';
import ManageSubscribersDialog from './ManageSubscribersDialog';
import { useWindowSize } from '../../../hooks/useWindowSize';
const styles = theme => ({
  root: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 1.5}px ${
      theme.spacing.unit
    }px ${theme.spacing.unit * 3}px`,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
});

function ConversationHeader(props) {
  const windowSize = useWindowSize();
  //const [tag, setTag] = useState('');
  //const InputLabelRef = useRef(null);

  const { classes, conversation, closeConversation } = props;
  const [showSubscriberDialog, setShowSubscriberDialog] = useState(false);

  return (
    <React.Fragment>
      <Grid item className={classes.root}>
        <Grid container justify="space-between" alignItems="center">
          {windowSize.isMobile && (
            <Grid item>
              <IconButton onClick={closeConversation}>
                <BackIcon />
              </IconButton>
            </Grid>
          )}
          <Grid item>
            <Typography variant="title">{conversation.displayName}</Typography>
          </Grid>
          <Grid item>
            {/* <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel ref={InputLabelRef} htmlFor="outlined-tag">
                Tag
              </InputLabel>
              <Select
                value={tag}
                onChange={e => setTag(e.target.value)}
                input={
                  <OutlinedInput labelWidth={25} name="tag" id="outlined-tag" />
                }
              >
                <MenuItem value="futureNeed">Future Need</MenuItem>
                <MenuItem value="generalCatchup">General Catchup</MenuItem>
                <MenuItem value="partnerships">Partnerships</MenuItem>
              </Select>
            </FormControl> */}
          </Grid>
          <Grid item>
            <Tooltip title="Manage Subscribers">
              <IconButton
                onClick={() => {
                  setShowSubscriberDialog(true);
                }}
              >
                <AddSubscriberIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Open Link in New Tab">
              <IconButton
                onClick={() => {
                  window.open('', '_blank');
                }}
              >
                <LinkIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Star">
              <IconButton>
                <StarOutlineIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>

      <ManageSubscribersDialog
        conversation={conversation}
        showDialog={showSubscriberDialog}
        setShowDialog={setShowSubscriberDialog}
      />
    </React.Fragment>
  );
}

export default withStyles(styles)(ConversationHeader);
