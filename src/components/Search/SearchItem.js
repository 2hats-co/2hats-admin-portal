import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import PersonIcon from '@material-ui/icons/Person';
import SubmissionIcon from '@material-ui/icons/DescriptionOutlined';
import ConversationIcon from '@material-ui/icons/ChatOutlined';
import ResumeIcon from '@material-ui/icons/Attachment';

import { flattenSearchHighlight } from '../../utilities/objects';

const styles = theme => ({
  listItem: {
    alignItems: 'flex-start',
    transition: 'background-color .2s',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  listIcon: {
    margin: 0,
    marginTop: theme.spacing.unit / 4,
    color: theme.palette.primary.main,
  },
  secondaryAction: {
    right: theme.spacing.unit,
    top: 0,
    transform: 'none',
  },

  highlightType: {
    textTransform: 'lowercase',
    marginRight: theme.spacing.unit,
    color: theme.palette.text.secondary,
  },
});

function SearchItem(props) {
  const { classes, hit, handleRoutes } = props;

  const highlighted = flattenSearchHighlight(hit._snippetResult).map(x => (
    <Grid key={x[0]} container alignItems="baseline">
      <Grid item>
        <Typography variant="caption" className={classes.highlightType}>
          {/*x[0].replace(/(.[0-9]+)*.value/g, '')*/}
          {x[0].replace(/\.(.)*/g, '').replace(/([A-Z])/g, ' $1')}
        </Typography>
      </Grid>
      <Grid item xs>
        <Typography
          variant="body2"
          dangerouslySetInnerHTML={{ __html: x[1] }}
        />
      </Grid>
    </Grid>
  ));

  return (
    <ListItem className={classes.listItem}>
      <ListItemIcon classes={{ root: classes.listIcon }}>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="subtitle1">
            {hit.firstName} {hit.lastName}
          </Typography>
        }
        secondary={highlighted}
        disableTypography
      />
      <ListItemSecondaryAction classes={{ root: classes.secondaryAction }}>
        {hit.resume && (
          <Tooltip title="Resume">
            <IconButton
              onClick={() => {
                window.open(hit.resume.downloadURL, '_blank');
              }}
            >
              <ResumeIcon style={{ transform: 'rotate(-45deg)' }} />
            </IconButton>
          </Tooltip>
        )}

        {hit.status !== 'incomplete' && (
          <Tooltip title="Submission">
            <IconButton
              onClick={() => {
                handleRoutes.submission(hit);
              }}
            >
              <SubmissionIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Conversation">
          <IconButton
            onClick={() => {
              handleRoutes.conversation(hit);
            }}
          >
            <ConversationIcon />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default withStyles(styles)(SearchItem);
