import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  root: {
    margin: theme.spacing(1),
  },

  fullHeight: {
    height: `calc(100% - ${theme.spacing(2)}px)`,
    display: 'flex',
    flexDirection: 'column',

    '& $content': { flex: 1 },
  },

  content: {
    padding: `${theme.spacing(1)}px ${theme.spacing(1.5)}px 0`,
  },

  cardHeader: {
    marginBottom: theme.spacing(1),
  },

  actions: {
    justifyContent: 'flex-end',
  },
  actionButton: {
    marginRight: theme.spacing(1) * -0.5,
  },
});

const StatCard = ({
  classes,
  title,
  description,
  stat,
  date,
  fullHeight,
  ButtonProps,
}) => {
  return (
    <Card className={clsx(classes.root, fullHeight && classes.fullHeight)}>
      <CardContent className={classes.content}>
        <div className={classes.cardHeader}>
          <Typography variant="overline" color="textSecondary">
            {title}
          </Typography>
          {description && (
            <Typography variant="body2" color="textSecondary">
              {description}
            </Typography>
          )}
        </div>

        <Typography variant="h4">{stat}</Typography>
        <Typography variant="body2" color="textSecondary">
          from {date.toLocaleDateString()}
        </Typography>
      </CardContent>

      {ButtonProps && (
        <CardActions className={classes.actions}>
          {ButtonProps.disabled ? (
            <Tooltip title="Coming Soon">
              <span>
                <Button
                  color="primary"
                  className={classes.actionButton}
                  {...ButtonProps}
                />
              </span>
            </Tooltip>
          ) : (
            <Button
              color="primary"
              className={classes.actionButton}
              {...ButtonProps}
            />
          )}
        </CardActions>
      )}
    </Card>
  );
};

StatCard.propTypes = {
  title: PropTypes.node.isRequired,
  description: PropTypes.node,
  stat: PropTypes.node.isRequired,
  date: PropTypes.instanceOf(Date),
  fullHeight: PropTypes.bool,
  ButtonProps: PropTypes.object,
};

export default withStyles(styles)(StatCard);
