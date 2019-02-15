import React, { useState } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';

import FileIcon from '@material-ui/icons/AttachmentOutlined';

import { globalReplace } from '../../../utilities';
import { STYLES } from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  root: {
    boxShadow: 'none',
    marginTop: theme.spacing.unit * 3,
    borderRadius: 0,
    '& + &': {
      borderTop: `1px solid ${theme.palette.divider}`,
      paddingTop: theme.spacing.unit * 3,
    },
  },

  answerInputWrapper: { marginTop: theme.spacing.unit },

  ...STYLES.RENDERED_HTML(theme),

  iframe: {
    width: '100%',
    border: 'none',
    height: 960,
    maxHeight: 'calc(100vh - 100px)',
  },
});

const Question = props => {
  const {
    classes,
    questionNum,
    questionText,
    submissionType,
    answer,
    user,
  } = props;

  const [showPDF, setShowPDF] = useState(false);

  let answerInput = null;
  switch (submissionType) {
    case 'pdf':
      answerInput = (
        <>
          <iframe
            title="Submission Resume"
            src={answer.url}
            className={classes.iframe}
            onLoad={() => {
              setShowPDF(true);
            }}
            style={{ display: showPDF ? 'block' : 'none' }}
          />
          {!showPDF && <LinearProgress />}
        </>
      );
      break;

    case 'zip':
      answerInput = (
        <Chip
          component="a"
          href={answer.url}
          target="_blank"
          rel="noopener noreferrer"
          label={answer.name}
          icon={<FileIcon className={classes.fileIcon} />}
          clickable
        />
      );
      break;

    case 'richText':
      answerInput = (
        <>
          <Typography variant="h6">Answer</Typography>
          <div
            className={classes.renderedHtmlOriginal}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        </>
      );
      break;

    case 'mailchimp':
      answerInput = (
        <>
          <Typography variant="h6">Answer</Typography>
          <div
            className={classes.renderedHtmlOriginal}
            dangerouslySetInnerHTML={{ __html: answer.body }}
          />
        </>
      );
      break;

    default:
      answerInput = null;
  }

  return (
    <Paper classes={{ root: classes.root }}>
      <Typography variant="h6">
        {questionNum > 0 ? `Question ${questionNum}` : 'Submission'}
      </Typography>
      <div
        className={classes.renderedHtmlOriginal}
        dangerouslySetInnerHTML={{
          __html: globalReplace(questionText, '{{firstName}}', user.firstName),
        }}
      />
      <div className={classes.answerInputWrapper}>{answerInput}</div>
    </Paper>
  );
};

Question.propTypes = {
  classes: PropTypes.object.isRequired,
  questionNum: PropTypes.number.isRequired,
  questionText: PropTypes.string,
  submissionType: PropTypes.string.isRequired,
  answer: PropTypes.any,
  user: PropTypes.object,
};

export default withStyles(styles)(Question);
