import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export const CARD_WIDTH = 320;
export const CARD_PADDING = 16;
const MEDIA_HEIGHT = CARD_WIDTH * 0.5625;

const styles = theme => ({
  root: {
    margin: CARD_PADDING / 2,
    width: CARD_WIDTH,

    transition: theme.transitions.create(['box-shadow', 'transform']),
    boxShadow: `0 0 0 1px rgba(0,0,0,.025), 0 10px 20px rgba(0,0,0,.1)`,

    '&:hover': {
      boxShadow: theme.shadows[24],
      transform: 'translateY(-4px)',

      '& $media:not($video), & $banner': { opacity: 0.9 },
    },
    '&:active': {
      transform: 'translateY(0) scale(0.95)',
      boxShadow: `0 10px 30px rgba(0,0,0,.14)`,
      transitionDuration: '.2s',
    },
  },
  withVideo: {},

  cardActionArea: {
    textAlign: 'right',
    height: '100%',
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': { backgroundColor: 'transparent' },
  },
  focusVisible: {
    backgroundColor: theme.palette.action.hover,
  },

  banner: {
    background: theme.palette.divider,
    transition: theme.transitions.create('opacity'),

    textAlign: 'left',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 1.75}px`,

    '& svg': {
      verticalAlign: 'bottom',
      marginRight: theme.spacing.unit,
    },
  },
  bannerText: {
    fontWeight: 500,
    position: 'relative',
    top: 1,
  },
  bannerGreen: {
    backgroundColor: green[100],
    '& *': { color: green[800] },
  },
  bannerRed: {
    backgroundColor: red[100],
    '& *': { color: red[800] },
  },
  bannerOrange: {
    backgroundColor: theme.palette.primary.light,
    '& *': { color: theme.palette.primary.main },
  },

  title: { marginTop: -theme.spacing.unit / 2 },

  media: {
    width: 100,
    height: 100,
    float: 'right',
    borderRadius: theme.shape.borderRadius * 0.75,
    transition: theme.transitions.create('opacity'),

    marginLeft: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  gradient: {
    backgroundImage: `linear-gradient(-15deg, #fa0, ${
      theme.palette.primary.main
    })`,
  },
  video: {
    width: '100%',
    height: 0,
    position: 'relative',
    paddingBottom: '56.25%',
  },
  iframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },

  stretchGrid: {
    height: 'calc(100% - 40px)',
    '$withVideo &': { height: `calc(100% - 40px - ${MEDIA_HEIGHT}px)` },
  },
  cardContent: {
    textAlign: 'left',
    paddingBottom: theme.spacing.unit,
    // '&:last-child': { paddingBottom: theme.spacing.unit },
  },

  secondaryText: { whiteSpace: 'pre-wrap' },

  cardActions: {
    justifyContent: 'flex-end',
    paddingTop: 0,
    paddingRight: 0,
  },
  arrowForwardIcon: {
    'svg&': {
      marginRight: 0,
      marginLeft: theme.spacing.unit / 2,
    },
  },
  primaryButton: {
    '&:hover': { backgroundColor: 'transparent' },
  },
});

function OneCard(props) {
  const {
    classes,
    title,
    secondaryText,
    primaryAction,
    route,
    banner,
    bannerColor,
    image,
    video,
    gradient,
    history,
    onClick,
  } = props;

  let media;
  if (video) {
    media = (
      <div className={classes.video}>
        <iframe
          src={video}
          className={classes.iframe}
          title={title + ' video'}
          frameBorder="none"
          allow="accelerometer; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  } else if (image) {
    media = <CardMedia className={classes.media} image={image} />;
  } else {
    media = (
      <div className={classes.gradient} style={{ backgroundImage: gradient }} />
    );
  }

  return (
    <Card
      classes={{ root: classNames(classes.root, video && classes.withVideo) }}
    >
      <CardActionArea
        id={title.replace(/\W/g, '')}
        component="div"
        onClick={
          onClick
            ? onClick
            : () => {
                history.push(route);
              }
        }
        classes={{ root: classes.cardActionArea }}
        focusVisibleClassName={classes.focusVisible}
        disableRipple
      >
        {video && media}

        {banner && (
          <div
            className={classNames(
              classes.banner,
              bannerColor === 'green' && classes.bannerGreen,
              bannerColor === 'red' && classes.bannerRed,
              bannerColor === 'orange' && classes.bannerOrange
            )}
          >
            <Typography variant="body1" className={classes.bannerText}>
              {banner}
            </Typography>
          </div>
        )}

        <Grid
          container
          direction="column"
          className={classes.stretchGrid}
          wrap="nowrap"
        >
          <Grid item xs>
            <CardContent classes={{ root: classes.cardContent }}>
              {!video && media}
              <Typography gutterBottom variant="h6" className={classes.title}>
                {title}
              </Typography>
              {typeof secondaryText === 'string' ? (
                <Typography component="p" className={classes.secondaryText}>
                  {secondaryText}
                </Typography>
              ) : (
                secondaryText
              )}
            </CardContent>
          </Grid>

          {primaryAction && (
            <Grid item>
              <CardActions className={classes.cardActions}>
                <Button
                  color="primary"
                  id={`button-${title}`}
                  className={classes.primaryButton}
                  disableRipple
                >
                  {primaryAction}
                  <ArrowForwardIcon className={classes.arrowForwardIcon} />
                </Button>
              </CardActions>
            </Grid>
          )}
        </Grid>
      </CardActionArea>
    </Card>
  );
}

OneCard.propTypes = {
  classes: PropTypes.object.isRequired,

  title: PropTypes.string,
  secondaryText: PropTypes.node,
  primaryAction: PropTypes.string,
  route: PropTypes.string,

  banner: PropTypes.node,
  bannerColor: PropTypes.string,

  image: PropTypes.string,
  video: PropTypes.string,
  gradient: PropTypes.string,

  onClick: PropTypes.func,
};

export default withRouter(withStyles(styles)(OneCard));
