import React,{Component} from 'react'

function CandidateItem(props){

  //console.log(props.data.submittedAt._seconds)
return(<div onClick={props.onClick} key={props.data.objectID}>
        {props.data.firstName}  {props.data.lastName} {props.data.status}
    </div>)
}
export default CandidateItem