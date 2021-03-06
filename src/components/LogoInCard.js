import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import logo from '../assets/logo/WhiteIcon.svg';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slide from '@material-ui/core/Slide';

const styles = theme => ({
  root: {
    backgroundColor: '#f5f5f5', //
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
    borderRadius: theme.shape.roundBorderRadius,
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
  // setBackground('#FA5E4E','https://firebasestorage.googleapis.com/v0/b/hatstest-860eb.appspot.com/o/public%2FColour.svg?alt=media&token=8b190721-9a9f-4b51-9285-9b26ea825c94',isMobile)
  // setBackground('#FA5E4E', Background, isMobile)
  return (
    <div className={classes.root}>
      <div className={classes.middle}>
        <Slide in direction="up">
          <Paper
            className={classes.paper}
            style={{ width: width, height: height }}
            elevation={24}
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
