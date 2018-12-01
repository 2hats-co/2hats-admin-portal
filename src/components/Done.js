import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function Done(props) {
    return (<Grid container style={{height:'calc(100vh - 64px)', textAlign:'center'}} justify="center" alignItems="center">
        <div>
            <Typography variant="display1" style={{color:'#000', fontFamily:'"Comic Sans MS", "Comic Sans"'}}>
                🍆🍑 you've done everything 🍑🍆
            </Typography>
            <Typography variant="display1" style={{color:'#000', fontFamily:'"Comic Sans MS", "Comic Sans"', fontSize:200}}>
                🇸🇳
            </Typography>
            <Typography variant="display1" style={{color:'#000', fontFamily:'"Comic Sans MS", "Comic Sans"'}}>
                💯💯😂🔥😂🔥😂🥂🎉 go home 🎉🥂 😂🔥😂🔥😂💯💯
            </Typography>
        </div>
    </Grid>)
}
export default Done
