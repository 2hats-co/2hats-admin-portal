import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    paddingLeft: theme.spacing.unit * 3,
    height: 64,
  },
  showBorder: {
    // boxShadow: `0 -1px 0 ${theme.palette.divider} inset`,
    boxShadow: theme.shadows[1],
    zIndex: 49,
    position: 'relative',
  },
  title: {
    lineHeight: '64px',
    fontWeight: 600,
    marginRight: theme.spacing.unit * 2,
    userSelect: 'none',
  },
  routeButton: {
    paddingTop: 0,
    paddingBottom: 0,
    height: 64,
  },
  routeHeaderText: {
    textTransform: 'capitalize',
    fontSize: 20,
    fontWeight: 500,
  },
  tabWrapper: {
    height: 64,
  },
});

function LocationIndicator(props) {
  const {
    classes,
    theme,
    location,
    subRoutes,
    title,
    history,
    showBorder,
    altBg,
  } = props;

  const navItems =
    subRoutes && location && history
      ? subRoutes.map((x, i) => (
          <Tab
            key={i}
            classes={{
              root: classes.routeButton,
              label: classes.routeHeaderText,
            }}
            value={x.value ? x.value : x}
            label={x.label ? x.label : x.split('/')[1]}
          />
        ))
      : null;

  return (
    <Grid
      container
      alignItems="center"
      className={
        showBorder ? classNames(classes.root, classes.showBorder) : classes.root
      }
      style={altBg ? { backgroundColor: theme.palette.background.default } : {}}
    >
      <Typography variant="h6" className={classes.title}>
        {title}
      </Typography>
      {navItems && navItems.length > 0 && (
        <Tabs
          value={location.pathname}
          onChange={(e, val) => {
            history.push(val);
          }}
          indicatorColor="primary"
          textColor="primary"
        >
          {navItems}
        </Tabs>
      )}
    </Grid>
  );
}

export default withRouter(
  withStyles(styles, { withTheme: true })(LocationIndicator)
);
