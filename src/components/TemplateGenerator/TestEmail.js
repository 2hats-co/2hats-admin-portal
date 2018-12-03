import React,{useEffect} from 'react'

import {resumeAccepted} from '../../constants/emails/templates'
import {useUserInfo} from '../../hooks/useUserInfo'
import TemplateGenerator from './index'
function TestEmail(props) {
    return(<TemplateGenerator
    template = {resumeAccepted}
    close ={()=>{console.log('sent Test')}}
    recipientUID = 'UswyWob8CGPUwFsLoSqwGbkLLqt1'
     smartLink ='s'   
    />)
}
export default TestEmail