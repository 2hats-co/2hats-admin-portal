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

import SubmissionIcon from '@material-ui/icons/AssignmentOutlined';
import ConversationIcon from '@material-ui/icons/ChatOutlined';
import ResumeIcon from '@material-ui/icons/AttachmentOutlined';
import GoIcon from '@material-ui/icons/ArrowForward';

import ConversationTypeIcon from '../Conversations/ConversationTypeIcon';
import { flattenSearchHighlight } from '../../utilities/objects';
import { ROUTES } from '../../constants/routes';
// import groupBy from 'ramda/es/groupBy';
// import map from 'ramda/es/map';

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
    marginTop: theme.spacing(0.25),
    // color: theme.palette.primary.main,
  },
  secondaryAction: {
    right: theme.spacing(1),
    top: 0,
    transform: 'none',
  },

  highlightType: {
    textTransform: 'lowercase',
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
});
// const byField = groupBy(function(snippet) {
//   return snippet.field;
// });
// const removeField = x => x.map(i => i.value);

const getSubmissionRoute = ({ objectID }) =>
  `${ROUTES.submissions2}?uid=${objectID}`;
const getConversationRoute = ({ conversationId, objectID }) =>
  conversationId
    ? `${ROUTES.conversations}?id=${conversationId}`
    : `${ROUTES.conversations}?uid=${objectID}`;
const getSubjectRoute = hit => {
  const { type, objectID } = hit;

  switch (type) {
    case 'client':
      return `${ROUTES.clients}?id=${objectID}`;

    case 'candidate':
      return `${ROUTES.candidates}?id=${objectID}`;

    default:
      break;
  }
};

function SearchItem(props) {
  const { classes, hit } = props;

  const highlighted = flattenSearchHighlight(hit._snippetResult).map(x => {
    return (
      <Grid key={x[0]} container alignItems="baseline">
        <Grid item>
          <Typography variant="caption" className={classes.highlightType}>
            {/*x[0].replace(/(.[0-9]+)*.value/g, '')*/}
            {x[0].split('.')[0]}
            {
              //x[0].replace(/\.(.)*/g, '').replace(/([A-Z])/g, ' $1')
            }
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography
            variant="body2"
            dangerouslySetInnerHTML={{ __html: x[1] }}
          />
        </Grid>
      </Grid>
    );
  });
  // const snippetKeyValuesPairs = flattenSearchHighlight(hit._snippetResult).map(
  //   x => {
  //     const field = x[0].split('.')[0];
  //     const value = x[1];
  //     return { field, value };
  //   }
  // );

  // console.log(
  //   'snippetGroups',
  //   map(removeField, byField(snippetKeyValuesPairs))
  // );
  return (
    <ListItem
      className={classes.listItem}
      button
      href={getSubjectRoute(hit)}
      component="a"
    >
      <ListItemIcon classes={{ root: classes.listIcon }}>
        <ConversationTypeIcon type={hit.type} />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="subtitle1">
            {hit.displayName || `${hit.firstName} ${hit.lastName}`}
          </Typography>
        }
        secondary={highlighted}
        disableTypography
      />
      <ListItemSecondaryAction classes={{ root: classes.secondaryAction }}>
        {hit.resume && (
          <Tooltip title="Resume">
            <IconButton
              href={hit.resume.downloadURL || hit.resume.url}
              component="a"
            >
              <ResumeIcon style={{ transform: 'rotate(-45deg)' }} />
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title="Submissions">
          <IconButton href={getSubmissionRoute(hit)} component="a">
            <SubmissionIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Conversation">
          <IconButton href={getConversationRoute(hit)} component="a">
            <ConversationIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="View user">
          <IconButton href={getSubjectRoute(hit)} component="a">
            <GoIcon />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default withStyles(styles)(SearchItem);
