import React from 'react';
import {makeEmail, personaliseElements} from '../../utilities/email/templateGenerator'
import renderHTML from 'react-render-html';
function RenderEmail(props) {
    const {personalisables,theme,template} = props
    const personalisedElements = personaliseElements(template,personalisables)
        const email = makeEmail(theme,personalisedElements)
        return(renderHTML(email))
}
export default RenderEmail