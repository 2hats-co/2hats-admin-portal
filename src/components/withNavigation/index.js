import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import logo from '../../assets/logo/DarkText.png'
import NavigationItems from './NavigationItems'
import withAuthentication from '../../utilities/Session/withAuthentication'
export const withNavigation = (WrappedComponent) => {
    class WithNavigation extends Component {
        constructor(props) {
            super(props);
            this.goTo = this.goTo.bind(this)
         }
         goTo(route){
            this.props.history.push(route)
          }
    render(){
        return(
            <Grid container direction="column" style={{height:'100vh'}}
                wrap="nowrap"
            >
                <Grid item>
                    <Grid container direction='row' justify='space-between'
                        alignItems='center' style={{height:70}}
                    >
                        <Grid item>
                            <img alt='2hats logo' src={logo} style={{width:100,padding:15}}/>
                        </Grid>
                        <Grid item style={{paddingRight: 40}}>
                            <NavigationItems goTo={this.goTo}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs>
                    <WrappedComponent {...this.props} />
                </Grid>
            </Grid>
        )
    }}
    return withAuthentication(withRouter(WithNavigation))
}
