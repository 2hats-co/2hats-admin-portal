import React,{useState,useEffect} from 'react';

import moment from 'moment'

import {CLOUD_FUNCTIONS,callable} from '../../firebase/functions'



function QueryNumber(props) {
        const {title,query,colour} = props
        
        const [result,setResult] = useState(null)
        useEffect(()=>{
            if(!result){
                callable(
                    CLOUD_FUNCTIONS.stats,
                    { filters:query.filters, collection: "submissions" },
                    o => setResult(o),
                    e => console.log("fail", e)
                  );

            }
        },[result])
        if (result){
            return ( <div>
                < div style={{backgroundColor:colour,color:'#fff',borderRadius:10,width:'80%',margin:10,paddingLeft:20}}>
                <h3>{title}</h3>
                <h2> {result.data.value}</h2>
                <p>updated {moment(result.data.updatedAt*1000).fromNow()}</p>
                </div >
                </div>
            )
        }else{
            return (<p>loadin</p>)
        }
            
}

export default QueryNumber;