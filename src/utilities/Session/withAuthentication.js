import React, {useEffect, useState} from 'react';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { auth } from '../../store';
import AuthenticationContainer from "../../containers/AuthenticationContainer";

const withAuthentication = (Component) => {
    // const [currentUser] = useAuthedUser()
    function WithAuthentication(props){
        const [loading,setLoading] = useState(true);
        const [authedUser,setAuthedUser] = useState(null);

        useEffect(() => {
            if (!authedUser && loading) {
                auth.onAuthStateChanged(authUser => {
                    if (authUser) {
                        setAuthedUser(authUser);
                        setLoading(false);
                    } else {
                        setAuthedUser(null);
                        setLoading(false);
                    }
                });
            }
        }, [auth]);

        if (authedUser) return (
            <Component {...props} //currentUser={currentUser} 
                uid={authedUser.uid}
                displayName={authedUser.displayName}
            />
        );
        else if (!authedUser && !loading) return <AuthenticationContainer/>;
        // else return(
        // <Grid container justify="center" alignItems="center" style={{ height:'100vh', backgroundColor:'#fff' }}>
        //     <CircularProgress size={64} />
        // </Grid>
        // );
        else return (
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', backgroundImage:`url('./thatsallfolks.jpg')`, backgroundSize:'cover', backgroundPosition:'center'}}>
                <div style={{position:'relative'}}>
                    <img src="./loading.gif" style={{borderRadius:'50%', width:'33vw', height:'33vw', marginLeft:'10px', marginTop:'-4px'}} />
                    <img src="./thatsallfolks-text.svg" style={{position:'absolute', top:'calc(50% - 6vw)', left:'-7vw', width:'48vw'}} />
                </div>
            </div>
        );
    }

    return WithAuthentication
}

export default withAuthentication;
