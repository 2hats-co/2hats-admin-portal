
import React from 'react';
import {THEME1} from '../../constants/emails/themes'
import {rejectedWithFeedback,outsideDemographic,outsideIndusty} from '../../constants/emails/templates'
import RenderEmail from './RenderEmail'
function TemplateGenerator(props){
        const personalisables = [{firstName:'shams',
        smartLink:'dfglsglksglkslk',
        senderTitle:'Talent Coordinator',
        senderName:'Julia Kenny'}] 
        const email =  (<RenderEmail personalisables={personalisables} theme={THEME1} template={outsideIndusty}/>)
        return (email);  
}
 
export default TemplateGenerator;