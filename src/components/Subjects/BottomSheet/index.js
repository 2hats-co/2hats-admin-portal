import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';

import ExpandIcon from '@material-ui/icons/ExpandLess';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutline';

import SuperAvatar from '../../SuperAvatar';
import MultiEmail from './MultiEmail';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import JobShortlist from './JobShortlist';
const SHEET_WIDTH = 640;
const SHEET_HEIGHT = 500;
const HEADER_HEIGHT = 48;

const styles = theme => ({
  root: {
    position: 'absolute',
    left: `calc(50% - ${SHEET_WIDTH / 2}px)`,
    bottom: -SHEET_HEIGHT + HEADER_HEIGHT,
    width: SHEET_WIDTH,

    zIndex: theme.zIndex.appBar,

    boxShadow: theme.shadows[12],
    borderRadius: `${theme.shape.borderRadius}px ${
      theme.shape.borderRadius
    }px 0 0`,

    transition: theme.transitions.create('transform', { duration: 200 }),
  },
  hidden: { transform: `translateY(${HEADER_HEIGHT}px)` },
  expanded: { transform: `translateY(-${SHEET_HEIGHT - HEADER_HEIGHT}px)` },
  anim: { transform: `translateY(-72px)` },

  header: {
    height: HEADER_HEIGHT,

    backgroundColor: theme.palette.text.primary,
    color: theme.palette.background.paper,
    borderRadius: `${theme.shape.borderRadius}px ${
      theme.shape.borderRadius
    }px 0 0`,

    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit,

    cursor: 'pointer',
  },

  expandButton: { transition: theme.transitions.create('transform') },
  expandButtonExpanded: { transform: 'rotate(180deg)' },

  paper: {
    width: SHEET_WIDTH,
    height: SHEET_HEIGHT - HEADER_HEIGHT,
    overflowY: 'auto',
  },

  chipWrapper: { padding: theme.spacing.unit * 2 },
  chip: { margin: theme.spacing.unit / 2 },
  chipAvatar: {
    backgroundColor: theme.palette.divider,
    color: theme.palette.text.primary,
  },
  chipDeleteIcon: {
    color:
      theme.palette.type === 'dark'
        ? theme.palette.primary.darkText
        : theme.palette.primary.main,
    '&:hover': {
      color:
        theme.palette.type === 'dark'
          ? theme.palette.primary.darkText
          : theme.palette.primary.main,
    },
  },

  actions: {
    //   padding: theme.spacing.unit * 3,
    // paddingTop: theme.spacing.unit * 2.5,
  },
});

const BottomSheet = props => {
  const { classes, selected, setCandidateDrawer, removeFromSelected } = props;

  const rootRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [tab, setTab] = useState(0);
  const [snackbar, setSnackbar] = useState({
    show: false,
    message: '',
    variant: 'normal',
  });

  // animations
  useEffect(
    () => {
      if (expanded || !rootRef || !rootRef.current || selected.length === 0)
        return;

      if (rootRef.current.classList.contains(classes.anim)) return;

      rootRef.current.classList.add(classes.anim);
      setTimeout(() => {
        rootRef.current.classList.remove(classes.anim);
      }, 200);
    },
    [selected]
  );

  return (
    <>
      <div
        key={selected.length}
        className={classNames(
          classes.root,
          selected.length === 0 && classes.hidden,
          expanded && classes.expanded
        )}
        ref={rootRef}
      >
        <Grid
          container
          wrap="nowrap"
          alignItems="center"
          className={classes.header}
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          <Grid item xs>
            <Typography variant="subtitle1" color="inherit">
              {selected.length} selected
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              color="inherit"
              className={classNames(
                classes.expandButton,
                expanded && classes.expandButtonExpanded
              )}
            >
              <ExpandIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Paper elevation={0} classes={{ root: classes.paper }} square>
          <div className={classes.chipWrapper}>
            {selected.map((x, i) => (
              <Chip
                key={x.objectID}
                avatar={<SuperAvatar data={x} />}
                label={`${x.firstName} ${x.lastName}`}
                onClick={() => {
                  setCandidateDrawer(x);
                }}
                onDelete={() => {
                  removeFromSelected(x, true);
                }}
                deleteIcon={<RemoveIcon />}
                classes={{
                  root: classes.chip,
                  avatar: classes.chipAvatar,
                  deleteIcon: classes.chipDeleteIcon,
                }}
              />
            ))}
          </div>

          <Divider variant="middle" />

          <div className={classes.actions}>
            <AppBar position="static">
              <Tabs
                value={tab}
                onChange={(e, v) => {
                  setTab(v);
                }}
              >
                <Tab label="Group Email" />
                <Tab label="ShortList" />
              </Tabs>
            </AppBar>
            {tab === 0 && (
              <MultiEmail setSnackbar={setSnackbar} selected={selected} />
            )}
            {tab === 1 && (
              <JobShortlist setSnackbar={setSnackbar} selected={selected} />
            )}
          </div>
        </Paper>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbar.show}
        autoHideDuration={snackbar.variant === 'normal' ? null : 3000}
        onClose={() => {
          setSnackbar(false);
        }}
      >
        <SnackbarContent
          className={classNames(
            classes.snackbar,
            classes['snackbar-' + snackbar.variant]
          )}
          message={snackbar.message}
        />
      </Snackbar>
    </>
  );
};

export default withStyles(styles)(BottomSheet);
