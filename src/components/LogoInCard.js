import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import logo from '../assets/logo/WhiteIcon.svg';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slide from '@material-ui/core/Slide';

const styles = theme => ({
  root: {
    backgroundColor: '#fff', //
    display: 'table',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  middle: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },
  logo: {
    paddingTop: 40,
    marginBottom: 30,
    marginLeft: 75,
    width: 200,
    height: 69,
  },
  centeredLogo: {
    marginTop: 50,
    marginBottom: 30,
    marginLeft: 115,
    width: 117,
    height: 42,
  },
  miniLogo: {
    marginTop: 50,
    marginBottom: 30,
    marginLeft: 55,
    width: 117,
    height: 42,
  },
  paper: {
    cornerRadius: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    overflowY: 'visible',
    overflowX: 'hidden',
    position: 'relative',
    backgroundColor: theme.palette.primary.main,
  },
  loading: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
});

function LogoInCard(props) {
  const { classes, width, height, isLoading, logoClass } = props;
  return (
    <div className={classes.root}>
      <div className={classes.middle}>
        <Slide in direction="up">
          <Paper
            className={classes.paper}
            style={{ width: width, height: height }}
            elevation={15}
          >
            <LinearProgress
              className={classes.loading}
              style={isLoading ? {} : { display: 'none' }}
            />
            <img
              className={classes[logoClass] || classes.centeredLogo}
              alt="dark2hatsLogo"
              src={logo}
            />

            {props.children}
          </Paper>
        </Slide>
      </div>
    </div>
  );
}
LogoInCard.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};
LogoInCard.defaultProps = {
  width: 350,
  height: 500,
};

export default withStyles(styles, { withTheme: true })(LogoInCard);
