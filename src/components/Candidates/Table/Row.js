import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import EmailIcon from '@material-ui/icons/MailOutline'
import PhoneIcon from '@material-ui/icons/Phone'
import moment from 'moment'
import TableRow from '@material-ui/core/TableRow';
import ClipBoardIcon from '../../ClipBoardIcon'
function _bolding(s){
    return <div dangerouslySetInnerHTML={{ __html:s.replace('<em>','<b>').replace('</em>','</b>')}} />
  }

function _getTimePassed(timestamp){
    return moment.unix(timestamp)
    .fromNow()
    .replace('months','M')
    .replace('minutes','m')
    .replace('ago','')
    .replace('days','d')
    .replace('hours','h')
    .replace('a hour', '1 h')
    .replace('a day', '1 d')
    .replace('a day', '1 d')
    .replace('a minute', '1 m')
  }
function _getInterests(interests){
    let interestsString = ''
    if(interests){
        if(interests.length === 0){
       
        }else if(interests.length === 1){
            interestsString = interests[0].value
        }else{
            interests.forEach(x=>{
                if(interestsString === ''){
                    interestsString = interests[0].value
                }else{
                    interestsString += ', ' + x.value
                }
            })
        }
    }
    return _bolding(interestsString)
}
function CandidateRow(props){
    const {candidateData,changeHandler} = props
    const {_highlightResult} = candidateData
    const {firstName,lastName,stage,status,careerInterests,staff,industry,note,score} = _highlightResult
    const name = _bolding(`${firstName.value} ${lastName.value}`) 
    const email = (candidateData.email&&{value:candidateData.email,isHighlighted:(_highlightResult.email.matchedWords&&_highlightResult.email.matchedWords.length !==0)})
    const phoneNumber = (candidateData.phoneNumber&&{value:candidateData.phoneNumber,isHighlighted:(_highlightResult.phoneNumber.matchedWords&&_highlightResult.phoneNumber.matchedWords.length !==0)})
    
    return(<TableRow hover onClick={() =>{changeHandler('selectedCandidate',candidateData)}}>
       <TableCell padding={'none'}>
            {_getTimePassed(candidateData.createdAt)}
        </TableCell>
        <TableCell padding={'none'} style={{maxWidth:170,overflow:'hidden',textOverflow:'ellipsis'}}> 
            {name}
        </TableCell>
        <TableCell padding={'none'} style={{maxWidth:100}}>        
            {email &&<ClipBoardIcon value={email.value} isHighlighted={email.isHighlighted}>
                        <EmailIcon/>
                    </ClipBoardIcon>}
            {phoneNumber &&<ClipBoardIcon value={phoneNumber.value} isHighlighted={phoneNumber.isHighlighted}>
                    <PhoneIcon/>
                 </ClipBoardIcon>
            }
        </TableCell>
        <TableCell padding={'none'}>{_bolding(stage.value)}</TableCell>
        <TableCell padding={'none'}>{_bolding(status.value)}</TableCell>
        <TableCell padding={'none'}>{staff&&_bolding(staff.value)}</TableCell>
        <TableCell padding={'none'}>{_getInterests(careerInterests)}</TableCell>
        <TableCell padding={'none'}>{note&&_bolding(note.value)}</TableCell>
        <TableCell padding={'none'}>{industry&&_bolding(industry.value)}</TableCell>
        <TableCell padding={'none'}>{score&&_bolding(score.value)}</TableCell>
    </TableRow>
    )
}
export default CandidateRow