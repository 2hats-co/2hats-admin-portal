import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import PaddedIcon from '../PaddedIcon';
import GoIcon from '@material-ui/icons/ArrowForward';
import MoreIcon from '@material-ui/icons/ExpandMore';

import OneCard from './OneCard';
import { DRAWER_WIDTH } from '../withNavigation';
import { CARD_WIDTH, CARD_PADDING } from './OneCard';
import useMore from '../../hooks/useMore';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import * as mappings from '../../constants/oneCardMappings';

export const getNumCards = (width, isMobile) => {
  const navWidth = isMobile ? 0 : DRAWER_WIDTH;
  const cols = Math.floor(
    (width - navWidth - CARD_PADDING) / (CARD_WIDTH + CARD_PADDING)
  );
  if (cols > 3) return 3;
  if (cols < 1) return 1;
  return cols;
};
export const getCardsWidth = n => 320 * n + 16 * n;

const styles = theme => ({
  root: {
    boxSizing: 'border-box',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing.unit * 5,
    maxWidth: '100vw',
    userSelect: 'none',
  },
  inline: {
    display: 'inline-block',
    // margin: 0,
  },

  paddedIcon: {
    marginRight: theme.spacing.unit * 1.5,
    verticalAlign: 'bottom',
  },
  title: {
    cursor: 'default',
    padding: theme.spacing.unit,
    fontWeight: 500,

    [theme.breakpoints.down('xs')]: { marginLeft: theme.spacing.unit * 2 },
  },
  titleWithIcon: {
    lineHeight: '48px',
    marginLeft: '0 !important',
  },
  goButton: {
    marginLeft: -theme.spacing.unit / 2,
    verticalAlign: 'sub',
  },

  moreButton: {
    margin: theme.spacing.unit,
    '& svg': {
      marginLeft: theme.spacing.unit / 4,
    },
  },

  noneLeftWrapper: {
    marginBottom: theme.spacing.unit * 2,
  },
  noneLeftIcon: {
    fontSize: 35,
    color: theme.palette.text.disabled,
    marginLeft: theme.spacing.unit,
  },
  noneLeftMsg: {
    color: theme.palette.text.disabled,
    marginLeft: theme.spacing.unit * 2,
    fontWeight: 700,
    lineHeight: 1.4,
    maxWidth: 260,
  },
});

function Cards(props) {
  const {
    classes,
    history,

    cols,
    title,
    icon,
    route,

    NoneLeftIcon,
    noneLeftMsg,

    useCollectionInit,
    mapping,
    mappingOverrides,
    filterIds,
    yourBackup,

    inline,
    hideMore,
  } = props;

  const [rows, setRows] = useState(1);
  const [usedYourBackup, setUsedYourBackup] = useState(false);

  const [cards, getMore, setFilterIds, cardsState, cardsDispatch] = useMore(
    useCollectionInit,
    cols,
    filterIds
  );
  useEffect(
    () => {
      setFilterIds(filterIds);
    },
    [filterIds]
  );

  if (
    !cardsState.loading &&
    cards.length === 0 &&
    yourBackup &&
    !usedYourBackup
  ) {
    cardsDispatch({
      path: `${COLLECTIONS.users}/${yourBackup}/${useCollectionInit.path}`,
    });
    setFilterIds([]);
    setUsedYourBackup(true);
  }

  const cardsHeader = (
    <Typography
      variant="h5"
      className={classNames(classes.title, icon && classes.titleWithIcon)}
    >
      {icon && <PaddedIcon className={classes.paddedIcon}>{icon}</PaddedIcon>}
      {usedYourBackup && cards.length > 0 && 'Your '}
      {title}
      {route && (
        <IconButton
          color="primary"
          className={classes.goButton}
          onClick={() => {
            history.push(route);
          }}
        >
          <GoIcon />
        </IconButton>
      )}
    </Typography>
  );

  if (!cardsState.loading && cards.length === 0 && noneLeftMsg)
    return (
      <div
        className={classNames(classes.root, inline && classes.inline)}
        style={{ width: getCardsWidth(cols) }}
      >
        {cardsHeader}

        <Grid container alignItems="center" className={classes.noneLeftWrapper}>
          {NoneLeftIcon && <NoneLeftIcon className={classes.noneLeftIcon} />}
          <Typography variant="subtitle1" className={classes.noneLeftMsg}>
            {noneLeftMsg}
          </Typography>
        </Grid>
      </div>
    );

  if (cards.length > 0)
    return (
      <div
        className={classNames(classes.root, inline && classes.inline)}
        style={{ width: getCardsWidth(cols) }}
      >
        {cardsHeader}

        <Grid container>
          {cards &&
            cards.map((x, i) => (
              <OneCard
                key={i}
                {...mappings[mapping]({ ...x, ...mappingOverrides })}
              />
            ))}
        </Grid>

        {!hideMore && cards.length >= cols * rows && (
          <Button
            color="primary"
            variant="outlined"
            className={classes.moreButton}
            disabled={cards.length < cols * rows}
            onClick={() => {
              setRows(rows + 1);
              getMore(cols);
            }}
          >
            More
            <MoreIcon className={classes.moreIcon} />
          </Button>
        )}
      </div>
    );

  return null;
}

Cards.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

  cols: PropTypes.number.isRequired,
  title: PropTypes.node.isRequired,
  icon: PropTypes.node,
  route: PropTypes.string,

  NoneLeftIcon: PropTypes.func,
  noneLeftMsg: PropTypes.node,

  useCollectionInit: PropTypes.object.isRequired,
  mapping: PropTypes.string.isRequired,
  mappingOverrides: PropTypes.object,
  filterIds: PropTypes.array,
  yourBackup: PropTypes.string,

  inline: PropTypes.bool,
  hideMore: PropTypes.bool,
};

export default withRouter(withStyles(styles)(Cards));
