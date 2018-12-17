import React,{useEffect,useState} from 'react';
import { auth } from '../../store';
import AuthenticationContainer from "../../containers/AuthenticationContainer";
const withAuthentication = (Component) => {
 // const [currentUser] = useAuthedUser()
  function WithAuthentication(props){
    const [loading,setLoading] = useState(true)
    const [authedUser,setAuthedUser] = useState(null)

    useEffect(()=>{
      if(!authedUser && loading){
        auth.onAuthStateChanged(authUser => {
          if(authUser){
            setAuthedUser(authUser);setLoading(false)
          }else{
            setAuthedUser(null);setLoading(false)
          }
        });
      }
    },[auth])
      if(authedUser)return (<Component {...props} //currentUser={currentUser} 
        uid={authedUser.uid} displayName={authedUser.displayName} />);
      else if(!authedUser && !loading)return(<AuthenticationContainer/>)
      else return(<p>loadin</p>)
  }

  return WithAuthentication
}

export default withAuthentication;
