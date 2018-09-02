import React,{Component} from 'react'
import TextField from '@material-ui/core/TextField'
import { Grid } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
    root: {
        width:480
    }
    
});
class SearchBar extends Component {
    constructor(props){
        super(props)
    }
    render(){
        const {classes} = this.props
        return(
            <Grid container direction='row' alignItems='center' justify='flex-start'>
                <Grid item >
                     <SearchIcon/>
                </Grid>
                <Grid item>
                    <TextField/>
                </Grid>

            </Grid>
        )
    }
}
export default withStyles(styles)(SearchBar)