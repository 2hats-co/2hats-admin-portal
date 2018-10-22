import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import logo from '../../assets/logo/WhiteIcon.svg';
import NavigationItems from './NavigationItems';
import withAuthentication from '../../utilities/Session/withAuthentication';

const styles = theme => ({
    leftNav: {
        backgroundColor: theme.palette.primary.main,
        width: 64,
        height: '100vh',
    },
    logo: {
        width: 40,
        margin: '15px auto',
        display: 'block',
    },
    routeHeader: {
        //backgroundColor: theme.palette.primary.main,
        width: 360,
        height: 64,
    },
    routeHeaderText: {
        marginLeft:40,
        lineHeight: '64px',
        color: '#111',
    },
})

export const withNavigation = (WrappedComponent) => {
    class WithNavigation extends Component {
        constructor(props) {
            super(props);
            this.goTo = this.goTo.bind(this);
        }
        componentDidUpdate(prevProps){
            if(prevProps.history !== this.props.history){
                const path = this.props.history.location.pathname
                console.log(path)
            }
          
        }
        goTo(route){
            this.props.history.push(route);
        }
        render(){
            const { classes } = this.props;

            return(
                <Grid container wrap="nowrap">
                    <Grid item className={classes.leftNav}>
                        <img alt="2hats logo" src={logo} className={classes.logo} />
                        <NavigationItems goTo={this.goTo} currentLocation={this.props.location.pathname} />
                    </Grid>
                    <Grid item xs>
                        <Grid container direction="column">
                            <Grid item style={{height: 64}}>
                                <Grid container wrap="nowrap">
                                    <Grid item className={classes.routeHeader}>
                                    <Typography variant="title" className={classes.routeHeaderText}>Mail</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs>
                                <WrappedComponent {...this.props} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            );
        }
    }
    return withAuthentication(withRouter(withStyles(styles)(WithNavigation)));
}
