import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import TextField  from '@material-ui/core/TextField';
import { useSearch } from '../../hooks/useSearch';

const styles = theme => ({
    paginationBar: {
        padding: '6px 24px',
        borderBottom: '1px solid rgba(0,0,0,.1)',
        position: 'relative',
        '&::after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            background: 'linear-gradient(to bottom, rgba(0,0,0,.05), rgba(0,0,0,0))',
            bottom: -21,
            left: 0,
            width: '100%',
            height: 20,
        },
    },
    paginationButtons: {
        width: 24,
        height: 24,
    },
    subheading: {
        display: 'inline',
        verticalAlign: 'middle',
        color: 'rgba(0,0,0,.53)',
        fontWeight: 400,
    },
});


function Search(props){
    const {history} = props
    const handleRoute = (hit) => {
        const {stage,status,objectID} = hit
        console.log(stage,status,objectID)
        if(status !=='pre-review' || status !=='incomplete' || status !=='complete'){
            history.push(`/submissions?uid=${objectID}`)
        }
    }
    const [searchState,searchDispatch] = useSearch()
    const {results} = searchState
    console.log('results',results)
        return(
        <Grid container direction="column" style={{height:'100%'}}>
           <TextField
            onChange={e => { searchDispatch({search:e.target.value})}}
           />
           <ul>
           {results.hits && results.hits.map(hit=> <li onClick={()=>{handleRoute(hit)}}>{hit.firstName}</li>)}
           </ul>
        </Grid>)
    
}
export default withRouter(withStyles(styles)(Search));
