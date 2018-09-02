import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import logo from '../../assets/logo/DarkText.png'
import NavigationItems from './NavigationItems'
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
            <div>
                <Grid container direction='row' justify='space-between' alignItems='center'>
                <Grid item><img alt='2hats logo' src={logo} style={{width:100,padding:15}}/>
                </Grid>
                <Grid item>
                 <NavigationItems goTo={this.goTo}/>
                </Grid>
                </Grid>
                 <WrappedComponent
                {...this.props}
                 />
                </div>
        )
    }}
    return withRouter(WithNavigation)
}
